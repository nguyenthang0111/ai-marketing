import axiosInstance from '@/utils/http'

const prompt = `Write a Facebook story post using the AIDA (Attention, Interest, Desire, Action) framework without explicitly labeling the sections. The post should creatively tell a story about the brand {{BrandName}} and its product {{ProductName}}, while including the following elements:

Product information:
Name: {{ProductName}}
Description: {{ProductDescription}}
Benefit: {{ProductBenefit}}
Customer Persona: {{CustomerPersona}}, who is experiencing the challenge/problem: {{CustomerProblem}}
Solution: How the product addresses this problem: {{Solution}}
Promotion: Include any current promotional offers: {{ProductPromotion}}

Brand information:
Name: {{BrandName}}
Description: {{BrandDescription}}
Location: {{BrandLocation}}
Contact Information: {{BrandContactInfo}}

Structure:
Attention: Begin with a compelling headline or hook to immediately grab the reader's attention.
Interest: Introduce key details about the product and the challenges your target audience faces.
Desire: Build emotional appeal and curiosity by showing how the product is the perfect solution.
Action: Conclude with a strong call to action (e.g., shop now, visit the store, comment below).
`

export const createBotSocial = (projectId, data) => {
  return axiosInstance.post(`project/${projectId}/bot-social`, {
    ...data,
    prompt: prompt
  })
}

export const createBotSocialFromLibrary = (projectId, data) => {
  return axiosInstance.post(`project/${projectId}/bot-social`, {
    ...data
  })
}

export const getAllBotSocial = (projectId) => {
  return axiosInstance.get(`/project/${projectId}/bot-social`)
}

export const getOneBotSocial = (botSocialId) => {
  return axiosInstance.get(`/bot-social/${botSocialId}`)
}

export const updateBotSocial = (botSocialId, data) => {
  return axiosInstance.patch(`/bot-social/${botSocialId}`, data)
}

export const deleteBotSocial = (botSocialId) => {
  return axiosInstance.delete(`/bot-social/${botSocialId}`)
}