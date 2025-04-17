import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: '',
    email: '',
    name: '',
    avatarUrl: ''
  }),
  actions: {
    async updateState(data) {
      Object.assign(this, data)
    }
  }
})
