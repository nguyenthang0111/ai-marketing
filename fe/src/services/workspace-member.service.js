import axiosInstance from "@/utils/http";

export const getWorkspacesByUser = async () => {
    return await axiosInstance.get('/workspace-member/workspaces-by-user')
}

export const addMemberToWorkspace = async (data) => {
    return await axiosInstance.post('/workspace-member', data)
}