import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isLoading: true
  }),
  actions: {
    setIsLoading(value) {
      setTimeout(() => this.isLoading = value, value ? 0 : 500)
    }
  }
})
