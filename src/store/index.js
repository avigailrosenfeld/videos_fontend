import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import SERVER_URL from '../../config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  mutations: {
    nothing(state) {state.status = 'none'},
    auth_request(state) {
        state.status = 'loading'
      },
      auth_success(state, payload) {
        state.status = 'success'
        state.token = payload.token
        state.user = payload.user
      },
      auth_error(state) {
        state.status = 'error'
      },
      logout(state) {
        state.status = ''
        state.token = ''
      },

  },
  actions: {
    login({commit}, user) {
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({ url: `${SERVER_URL}/login`, data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.access_token
            const user = resp.data.user
    
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', { token: token, user: user })
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
        })
      },
      register({commit}, user) {
        return new Promise((resolve, reject) => {
          commit('nothing');
          axios({ url: `${SERVER_URL}/register`, data: user, method: 'POST' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
      },
      logout({commit}) {
        return new Promise((resolve, reject) => {
            const headers =  {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
              }
            axios({ url: `${SERVER_URL}/logout`, method: 'POST', headers: headers })
          .then(resp => {
            commit('logout')
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
          
        })
      }

  },
  modules: {

  }
})