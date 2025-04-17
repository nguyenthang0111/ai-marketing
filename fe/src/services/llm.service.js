import axiosInstance from '@/utils/http'

export const generateContent = (userPrompt, contentFormat) => {
  return axiosInstance.post('/llm/generate-content', { userPrompt, contentFormat})
}

export const suggestTitle = (articleContent) => {
  return axiosInstance.post('/llm/suggest-title', { articleContent })
}

export const optimizePrompt = (userPrompt) => {
  return axiosInstance.post('/llm/optimize-prompt', { userPrompt })
}