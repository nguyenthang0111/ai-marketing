import axiosInstance from '@/utils/http'
import { useWorkspaceStore } from '@/stores/workspace.store'

const workspaceStore = useWorkspaceStore()

export const createProject = (data) => {
  return axiosInstance.post(`/workspace/${workspaceStore.workspaceId}/project`, {
    ...data,
  })
}

export const getAllProjectOfWorkspace = () => {
  return axiosInstance.get(`/workspace/${workspaceStore.workspaceId}/project`)
}

export const getOneProject = (projectId) => {
  return axiosInstance.get(`/project/${projectId}`)
}

export const deleteProject = (projectId) => {
  return axiosInstance.delete(`/project/${projectId}`)
}

export const updateProject = (projectId, data) => {
  return axiosInstance.patch(`/project/${projectId}`, {
    ...data,
  })
}

export const getAllWorkspaceMember = () => {
    return axiosInstance.get(`/workspace/${workspaceStore.workspaceId}/member`)
  }
  
  export const getWorkspaceById = () => {
    return axiosInstance.get(`/workspace/${workspaceStore.workspaceId}`)
  }