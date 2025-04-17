import axiosInstance from '@/utils/http'

export const getAllBotLibrary = () => {
  return axiosInstance.post('/llm/generate-content', { userPrompt, contentFormat})
}

