import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    token: JSON.stringify(localStorage.getItem('token')),
    user: JSON.parse(localStorage.getItem('user'))
  },
  mutations: {
    setToken(state, data) {
      state.token = data
    },
    setUser(state, data) {
      state.user = data
    }
  },
  actions: {}
})
export default store
