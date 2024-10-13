import { createStore } from "vuex"

export default createStore({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem("jwtToken", token)
    },
    clearToken(state) {
      state.token = ""
      localStorage.removeItem("jwtToken")
    },
  },
  actions: {
    saveToken({ commit }, token) {
      localStorage.setItem("authToken", token)
      commit("setToken", token)
    },
    logout({ commit }) {
      commit("clearToken")
      this.$router.push({ name: "Login" })
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
})
