import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import './assets/tailwind.css'

const store = createStore({
  state() {
    return {
      loggedIn: false,
      token: undefined,
      role: undefined
    }
  },
  mutations: {
    login(state, payload) {
      state.token = payload.token
      state.role = payload.role
      state.loggedIn = true
    },
    logout(state) {
      state.loggedIn = false
      state.token = undefined
      state.role = undefined
    }
  },
  plugins: [createPersistedState()]
})

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
app.use(store)

app.mount('#app')
