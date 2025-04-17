import axiosInstance from "@/utils/http";

export const getProfile = () => {
  return axiosInstance.get('/user/me')
}

export const updateUser = (data, userId) => {
  return axiosInstance.patch(`/user/${userId}`, data)
}

export const changePassword = (data) => {
  return axiosInstance.patch('/user/change-password', data)
}

export const getUserByEmail = (email) => {
  return axiosInstance.get(`/user/${email}`)
}