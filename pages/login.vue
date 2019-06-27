<template>
  <div class="background">
    <div class="login">
      <h2>Admin登录</h2>
      <br>
      <div>
        <el-input placeholder="请输入内容" v-model="username" clearable></el-input>
        <el-input placeholder="请输入密码" v-model="passworld" show-password></el-input>
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.background {
  width: 100%;
  height: 100%;
  background-color: beige;
  z-index: -5;
  &::before {
    content: '';
    display: block;
    height: 50%;
    background-color: #607d8b;
  }
  &::after {
    content: '';
    display: block;
    height: 50%;
    background-color: #455a64;
  }
  .login {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 7px #455a64;
    .el-input {
      margin-bottom: 20px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      username: '',
      passworld: '',
      loading: false
    }
  },
  head() {
    return {
      title: '登录',
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
  methods: {
    login() {
      if (this.username == '' || this.passworld == '') {
        this.msg('账号或密码是空的', 'error')
      } else {
        this.$axios({
          method: 'get',
          url: '/cryptPwd',
          params: {
            uname: this.username,
            pwd: this.passworld
          }
        })
          .then(response => {
            //   this.ArticleData = response.data.data
            if (response.data.state == 200) {
              let data = response.data.data
              console.log(data)
              this.$store.commit('handleToken', data)
              localStorage.setItem('Token', data.token)

              this.$router.push('/admin')
            } else {
              this.errored = true
            }
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => {
            this.loading = false
            this.errored
              ? this.msg('登录失败', 'error')
              : this.msg('登录成功', 'success')
          })
      }
    },
    msg(msg, type) {
      this.$message({ message: msg, type: type })
    }
  }
}
</script>
