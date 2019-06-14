<template>
  <el-container style="height: 100%;" v-if="login">
    <!-- <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['2', '3']" :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>用户管理
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>文章管理
          </template>
          <el-menu-item-group>
            <template slot="title">文章类</template>
            <el-menu-item index="2-1">发布文章</el-menu-item>
            <el-menu-item index="2-2">管理文章</el-menu-item>
            <el-menu-item index="2-3">添加标签</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>其他
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">网站信息</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-2">Banner更换</el-menu-item>
            <el-menu-item index="3-3">修改资料</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>-->

    <el-menu
      :default-active="this.$store.state.active"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <!-- <el-image src="https://avatar.gitee.com/uploads/84/4923684_x-ivan.png" fit="cover"></el-image>
      <span>Iavn</span>-->
      <el-menu-item class="admin" index="0" disabled>
        <el-image src="https://avatar.gitee.com/uploads/84/4923684_x-ivan.png" fit="cover"></el-image>

        <span slot="title">Ivan'blog Admin</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">文章管理</span>
        </template>
        <el-menu-item-group>
          <span slot="title">文章类</span>
          <nuxt-link :to="{name:'admin-checkarticle'}">
            <el-menu-item index="2-1">
              <!-- <nuxt-link :to="{name:'article-id',params:{id:131231,title:'【ivan Blog】'}}">管理文章</nuxt-link> -->
              管理文章
            </el-menu-item>
          </nuxt-link>
          <nuxt-link :to="{name:'admin-postarticle'}">
            <el-menu-item index="2-2">发布文章</el-menu-item>
          </nuxt-link>
          <el-menu-item index="2-3">添加标签</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <!-- <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>-->
        <span class="el-fold" @click="isCollapse=!isCollapse">
          <i :class="[isCollapse?'el-icon-s-unfold':'el-icon-s-fold']"></i>
        </span>
        <el-image
          src="https://avatar.gitee.com/uploads/84/4923684_x-ivan.png"
          fit="cover"
          class="el-images"
        ></el-image>
        <!-- <img src="~static/image/x.jpg" style="width: 50px; height: 50px;border-radius: 57px; position: relative;top: 5px;right:.5rem;"> -->
        <span>Iavn</span>
      </el-header>
      <!-- 路由切换 -->
      <!-- <router-view/> -->
      <nuxt-child/>
    </el-container>
  </el-container>
</template>

<style lang="scss">
$MainColor: #455a64;
$SubColor: #607d8b;
.el-header {
  background-color: $SubColor;
  color: white;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-tag {
  margin: 0.1rem 0.1rem 0.1rem 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-images {
  width: 30px;
  height: 30px;
  position: relative;
  top: 15px;
  right: 0.5rem;
  & > img {
    border-radius: 30px;
  }
}
.el-fold {
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  cursor: pointer;
  padding: 5px;
  & > i {
    font-size: 1rem;
  }
}
.is-disabled:nth-child(1) {
  opacity: 1;
  background-color: $MainColor !important;
  cursor: context-menu;
}
.admin {
  height: 60px;
  color: white;
  .el-image {
    width: 24px;
    height: 24px;
    margin-right: 5px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      login: false,
      isCollapse: false //导航栏收缩

      // active: this.$store.state.active //导航栏选中状态
    }
  },
  head() {
    return {
      title: '后台',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '123',
          requireAuth: true
        }
      ]
    }
  },
  beforeCreate() {
    this.$axios({
      methods: 'get',
      url: '/token',
      // header: { token: this.getToken },
      headers: { Authorization: this.getToken }
    })
      //是否为合法token，如果不是就跳login页面
      .then(response => {
        //
        if (response.data.state == 200) {
          this.login = true
        } else {
          //   this.$router.push('/login')
        }
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => (this.loading = false))
  },
  created() {
    this.$axios({
      methods: 'get',
      url: '/token',
      // header: { token: this.getToken },
      headers: { Authorization: this.getToken }
    })
      //是否为合法token，如果不是就跳login页面
      .then(response => {
        //
        if (response.data.state == 200) {
          this.login = true
        } else {
            this.$router.push('/login')
        }
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => (this.loading = false))
    //默认目录
    console.log(this.$router)
    this.$route.path == '/admin'
      ? this.$router.push({
          path: '/admin/checkarticle'
        })
      : ''

    // 刷新判断地址选中目录
    var path = this.$route.path.split('/')
    switch (path.map(item => item)[path.length - 1]) {
      case 'checkarticle':
        this.$store.commit('handelActive', '2-1')
        break
      case 'postarticle':
        this.$store.commit('handelActive', '2-2')

      default:
        break
    }
  },
  computed: {
    handle() {
      return function() {
        return this.$store.state.active
      }
    },
    getToken() {
      return window.localStorage.getItem('Token')
    }
  }
}
</script>