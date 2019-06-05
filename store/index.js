import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    counter: 0,
    active:'2-2'
  },
  mutations: {
    // increment (state,val) {
    //   state.counter++
    //   state.value=val
    // }
    
    handelActive(state,num){
        state.active=num
    }
  }
})

export default store