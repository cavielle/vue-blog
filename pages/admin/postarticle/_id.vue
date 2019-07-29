<template>
  <div class="post" v-loading="loading">
    <el-form :label-position="labelPosition" label-width="90px" :model="formLabelAlign">
      <el-button-group class="el-button-group">
        <el-button
          v-if="update"
          type="primary"
          icon="el-icon-s-promotion"
          @click="handleArticle('post')"
        >post</el-button>
        <el-button
          v-else
          type="primary"
          icon="el-icon-s-promotion"
          @click="handleArticle('put')"
        >update</el-button>
        <el-button type="primary" icon="el-icon-s-operation"></el-button>
        <!-- <el-button type="primary" icon="el-icon-delete"></el-button> -->
      </el-button-group>
      <el-form-item label="标题封面：">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8888/upload"
          name="smfile"
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="postimg" :src="postimg" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="显示">
        <el-switch
          v-model="formLabelAlign.show"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="formLabelAlign.title"></el-input>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input type="textarea" v-model="formLabelAlign.summary"></el-input>
      </el-form-item>

      <el-form-item label="标签">
        <el-tag
          :key="tag"
          v-for="tag in formLabelAlign.tag"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-form-item>
    </el-form>
    <!-- <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>-->
    <!-- <van-uploader :after-read="changepic">
      <van-button icon="photo" type="primary">上传图片</van-button>
    </van-uploader>
    <van-uploader :after-read="changepic"/>
    <form action enctype="multipart/form-data">
      <input id="file" class="filepath" @change="changepic(this)" accept="image/*" type="file">
      <br>
      <img src id="show" width="200">
    </form>-->

    <div class="mavonEditor">
      <no-ssr>
        <mavon-editor v-model="handbook" />
      </no-ssr>
    </div>
  </div>
</template>
<style lang="scss">
$postwidth: calc((100% / 2) - 80px);
.post {
  padding: 25px;
  height: 100%;
  overflow-y: scroll;
  .el-form-item {
    width: 50%;
  }
  .el-button-group {
    position: relative;
    left: calc(100% - 176px);
    padding-bottom: 20px;
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
input,
textarea {
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
    Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
    sans-serif;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 700px;
  height: 100%;
  max-height: 220px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100%;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  max-width: 700px;
  height: 100%;
  //   max-height: 220px;
  display: block;
}
</style>

<script>
export default {
  data() {
    return {
      loading: false,
      errored: false,
      labelPosition: 'left',
      dialogVisible: false,
      id: this.$route.params.id,
      formLabelAlign: {
        imageurl: '',
        // imageurl: 'https://images7.alphacoders.com/805/thumb-1920-805786.png',
        show: 1,
        title: '',
        summary: '',
        tag: []
      },
      postimg: '',
      inputVisible: false, //input显示
      inputValue: '', //标签input内容
      handbook: '### start\n'
    }
  },
  created() {
    console.log(this.id)
  },
  mounted() {
    if (!this.update) {
      this.$axios({
        method: 'get',
        url: '/getArticle',
        params: {
          id: this.id
        }
      })
        .then(response => {
          let data = response.data.data[0]
          data ? '' : this.$router.push('/404') //如果没有取到数据就证明没有这个页面
          this.handbook = data.ArticleContent
          this.postimg = data.ArticleImgUrl
          this.formLabelAlign.show = data.ArticleShow
          this.formLabelAlign.title = data.ArticleTitle
          this.formLabelAlign.summary = data.ArticleSummary
          this.formLabelAlign.tag = data.ArticleTag.split(',')
          console.log(data)
        })
        .catch(error => {
          console.log(error)

          this.errored = true
        })
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.postimg = URL.createObjectURL(file.raw)
      this.formLabelAlign.imageurl = res.data.url
      console.log(res, file)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG或者PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
    },
    handleClose(tag) {
      //删除标签
      this.formLabelAlign.tag.splice(this.formLabelAlign.tag.indexOf(tag), 1)
    },

    showInput() {
      //显示输入标签
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      //回车确认
      let inputValue = this.inputValue
      if (inputValue) {
        this.formLabelAlign.tag.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    uuid() {
      // 生成uuid
      var s = []
      var hexDigits = '0123456789abcdef'
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-'

      var uuid = s.join('')
      return uuid
    },
    handleArticle(status) {
      //发送文章
      this.loading = true
      let id = this.statusID(status)
      this.$axios({
        method: status,
        url: this.statusUrl(status),
        params: {
          id: id,
          imgurl: `${this.formLabelAlign.imageurl}`,
          show: `${this.formLabelAlign.show}`,
          title: `${this.formLabelAlign.title}`,
          summary: `${this.formLabelAlign.summary}`,
          content: `${this.handbook}`,
          tag: `${this.formLabelAlign.tag.join()}`
        },
        headers: { Authorization: this.getToken }
      })
        // .post(
        //   `/postArticle?imgurl='${
        //     this.formLabelAlign.imageurl
        //   }'&show='${this.formLabelAlign.show}'&title='${
        //     this.formLabelAlign.title
        //   }'&summary='${this.formLabelAlign.summary}'&content='${
        //     this.handbook
        //   }'&tag='${this.formLabelAlign.tag.join()}'`
        // //   http://localhost:8080/api/postArticle?imgurl='www'&show='0'&title='title'&summary='summary'&content='content'&tag='postmanTag'
        // )
        .then(response => {
          //   this.ArticleData = response.data.data
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => {
          this.loading = false
          this.errored
            ? this.msg('发送失败', 'error')
            : this.msg('发送成功', 'success')
          this.update ? this.$router.push('/admin/checkarticle') : ''
        })
    },
    msg(msg, type) {
      this.$message({ message: msg, type: type })
    }
  },
  computed: {
    update() {
      console.log(this.id == 'post')
      return this.id == 'post'
    },
    statusUrl() {
      return function(status) {
        if (status == 'post') {
          return '/postArticle'
        } else if (status == 'put') {
          return 'updateArticle'
        }
      }
    },
    statusID() {
      return function(status) {
        if (status === 'post') {
          return this.uuid()
        } else if (status == 'put') {
          return this.id
        }
      }
    },
    getToken() {
      return window.localStorage.getItem('Token')
    }
  }
}
</script>