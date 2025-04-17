import axiosInstance from '@/utils/http'

export const createBrand = (projectId, data) => {
  return axiosInstance.post(`project/${projectId}/brand`, {
    ...data
  })
}

export const getAllBrand = (projectId) => {
  return axiosInstance.get(`/project/${projectId}/brand`)
}

export const deleteBrand = (brandId) => {
  return axiosInstance.delete(`/brand/${brandId}`)
}

export const updateBrand = (brandId, data) => {
  return axiosInstance.patch(`/brand/${brandId}`, {
    ...data
  })
}