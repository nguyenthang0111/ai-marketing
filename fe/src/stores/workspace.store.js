import { defineStore } from 'pinia'

export const useWorkspaceStore = defineStore('workspace', {
  state: () => ({
    workspaceId: localStorage.getItem('workspaceId') || '',
    name: localStorage.getItem('nameWorkspace') || '',
    listWorkspaceOfUser:[],
    creditCodes:JSON.parse(localStorage.getItem('creditCodes')) || {}
  }),
  actions: {
    async updateState(data) {
      Object.assign(this, data)
    },
    switchWorkspace(workspace) {
      this.workspaceId = workspace.id;
      this.name = workspace.name;
      this.creditCodes = workspace.creditCodes || {};

      localStorage.setItem('workspaceId', workspace.workspaceId);
      localStorage.setItem('nameWorkspace', workspace.name);
      localStorage.setItem('creditCodes', JSON.stringify(workspace.creditCodes[0] || {}));
    }
  }
})