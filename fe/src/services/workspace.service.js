import axiosInstance from "@/utils/http";

export const getAllWorkspaceOfUser = () => {
  return axiosInstance.get('/workspace')
}

export const getWorkspaceById = () => {
  return axiosInstance.get(`/workspace/${localStorage.workspaceId}`)
}