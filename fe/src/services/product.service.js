import axiosInstance from '@/utils/http'

export const createProduct = (projectId, data) => {
  return axiosInstance.post(`/project/${projectId}/product`, {
    ...data
  })
}

export const getAllProduct = (projectId) => {
  return axiosInstance.get(`/project/${projectId}/product`)
}

export const deleteProduct = (productId) => {
  return axiosInstance.delete(`/product/${productId}`)
}

export const updateProduct = (productId, data) => {
  return axiosInstance.patch(`/product/${productId}`, {
    ...data
  })
}
