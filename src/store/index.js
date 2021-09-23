import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  supportCircular: true
})

export default createStore({
  plugins: [vuexLocal.plugin],
  state: {
    pubKey: null,
    user: null
  },
  mutations: {
    setPubKey(state, data) {
      state.pubKey = data
    },
    setUser(state, data) {
      state.user = data
    }
  },
  actions: {
  },
  modules: {
  }
})
