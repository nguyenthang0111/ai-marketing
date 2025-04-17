import axios from 'axios'
import router from '@/router'
import { message } from 'ant-design-vue'

const IP = 'localhost'
const PORT = '8081'
export const API_URL = `http://${IP}:${PORT}/api`

const axiosInstance = axios.create({
  baseURL: API_URL
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ai-marketing-token')
    config.headers.Authorization = `Bearer ${token}`
    
    return config
  },
  (error) => {
    message.error('Request error')
    return Promise.reject(error)}
)

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      message.success(response.data.message)
    }
    return Promise.resolve(response)
  },
  (error) => {
    switch (error.response.data.statusCode) {
      case 401:
        localStorage.removeItem('ai-marketing-token')
        router.push({ name: 'Login' })
        break
      case 403:
        router.push({ name: 'Error', query: { status_code: 403 } })
        break
      case 404:
        router.push({ name: 'Error', query: { status_code: 404 } })
        break
      case 500:
        router.push({ name: 'Error', query: { status_code: 500 } })
        break
    }
    message.error(error.response.data.message)

    return Promise.reject(error)
  }
)

export default axiosInstance
