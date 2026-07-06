import axios from 'axios'

const api = axios.create({
  baseURL: 'https://proyecto-chat-distribuidas.onrender.com/api'
})

export default api