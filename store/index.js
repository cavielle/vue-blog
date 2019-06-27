import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  //初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录
  state: {
    counter: 0,
    active: '2-1',
    token: '',
    username: ''
  },
  mutations: {
    // increment (state,val) {
    //   state.counter++
    //   state.value=val
    // }

    handelActive(state, num) {
      state.active = num
    },
    handleToken(state, data) {
      state.token = data.token
      state.username = data.name
    }

  }
})

export default store