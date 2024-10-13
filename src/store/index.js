import { createStore } from "vuex"

const store = createStore({
  state: {
    token: localStorage.getItem("jwtToken") || "",
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
      commit("setToken", token)
    },
    logout({ commit }) {
      commit("clearToken")
    },
  },
})

export default store
