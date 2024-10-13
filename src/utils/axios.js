import axios from "axios"
import store from "@/store"

const api = axios.create({
  baseURL: "http://143.198.144.154:5000/api/",
})

// Add the Bearer Token
api.interceptors.request.use(
  (config) => {
    const token = store.state.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
