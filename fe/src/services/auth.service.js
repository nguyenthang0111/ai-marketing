import axiosInstance from '@/utils/http'
import { fetchUserData } from '@/router/middleware'

export const register = async (data) => {
  const res = await axiosInstance.post(`/user/create`, data)
  return res
}

export const login = async (data) => {
    const res = await axiosInstance.post(`/auth/login`, data)
    localStorage.setItem('ai-marketing-token', res.data.accessToken)
    await fetchUserData()
    return res
}

export const forgetPassword = async(data) => {
  return await axiosInstance.post('/user/forget-password', data)
}

export const resetPassword = async(data) => {
  return await axiosInstance.post('/user/reset-password', data)
}
