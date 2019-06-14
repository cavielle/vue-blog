<template>
  <div class="body">
    <el-main v-loading="loading" class="main">
      <el-button @click="post">Add</el-button>
      {{this.getToken}}
      <el-table
        ref="singleTable"
        highlight-current-row
        :data="ArticleData.filter(data => !search || (data.ArticleTitle.toLowerCase().includes(search.toLowerCase()) || data.ArticleContent.toLowerCase().includes(search.toLowerCase())))"
        height="calc(100% - 60px)"
        @current-change="handleCurrentChange"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="ArticleTitle" label="标题" width="120"></el-table-column>
        <el-table-column prop="ArticleUpdate" label="更新时间" width="140" class-name="times">
          <template slot-scope="scope">{{getLocaleTime(scope.row.ArticleUpdate)}}</template>
        </el-table-column>
        <el-table-column prop="ArticleTag" label="标签" width="140">
          <template slot-scope="scope">
            <!-- handleTag(scope.row.tag) -->
            <el-tag v-for="item in handleTags(scope.row.ArticleTag)" :key="item">{{ item }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="ArticleSummary" label="摘要"></el-table-column>

        <el-table-column prop="ArticleShow" label="显示" width="50">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.ArticleShow"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="updataShow(scope.$index, scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">Edit</el-button>
            <el-button size="mini" type="danger" @click="MessageBox()">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<style lang="scss" scope>
.times .cell {
  white-space: pre-line !important;
}

.el-tag {
  margin: 0.1rem 0.2rem 0.1rem 0;
  white-space: pre-line !important;
  margin-left: 0 !important;
}
.body {
  background: red;
  height: 100%;
}
.main {
  padding: 20px 20px 0;
  height: 100%;
}
</style>
<script>
export default {
  data() {
    return {
      ArticleData: [],
      currentRow: null, //选中的list
      search: '', //搜索框
      loading: true, //loading加载
      errored: false //数据错误
    }
  },
  created() {
    // setTimeout(() => {
    //   this.loading=true;
    // }, 1500)
  },
  mounted() {
    this.$axios({
      methods: 'get',
      url: '/getArticleInfo',
      // header: { token: this.getToken },
      headers: {'Authorization': this.getToken}
    })
      .then(response => {
        this.ArticleData = response.data.data
        console.log(response.data.data)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => (this.loading = false))
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$store.commit('handelActive', '2-2')
      this.$router.push(`/admin/postarticle/${row.ArticleID}`)
      // console.log(converter.makeHtml(row.ArticleContent))
    },
    MessageBox() {
      const h = this.$createElement
      this.$msgbox({
        title: '删除',
        message: h('p', null, [
          h('span', null, '内容可以是 '),
          h('i', { style: 'color: teal' }, '暂无此功能')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            setTimeout(() => {
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            }, 3000)
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        })
      })
    },
    updataShow(index, row) {
      //修改文章显示

      this.loading = true
      this.$axios({
        method: 'put',
        url: '/updateShow',
        params: {
          id: `${row.ArticleID}`,
          show: `${row.ArticleShow}`
        },
      headers: {'Authorization': this.getToken}
      })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => (this.loading = false))
      console.log(row.ArticleID, row.ArticleShow)
    },
    post() {
      this.$store.commit('handelActive', '2-2')
      this.$router.push(`/admin/postarticle/post`)
    }
  },
  computed: {
    handleTags() {
      return function(tag) {
        var itemArr = tag.split(',')
        // console.log(typeof tag, tag, '123')
        return itemArr
      }
    },
    getLocaleTime() {
      return function(time) {
        return new Date(time)
          .toLocaleString()
          .split(' ')
          .join('\n')
      }
    },
    switchs() {
      return function(val) {
        return '0' ? true : false
      }
    },
    getToken(){
      return window.localStorage.getItem('Token')
    }
  }
}
</script>
