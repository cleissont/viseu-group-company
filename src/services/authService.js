import axios from "axios"

const API_URL = "http://143.198.144.154:5000/api/"

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}Auth/authenticate`, {
      username,
      password,
      conId: 0,
    })
    return response.data
  } catch (error) {
    console.error("Erro na autenticação:", error)
    throw error
  }
}
