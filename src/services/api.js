import axios from "axios"
import store from "@/store"

const api = axios.create({
  baseURL: "http://143.198.144.154:5000/api/",
})

api.interceptors.request.use((config) => {
  const token = store.state.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
