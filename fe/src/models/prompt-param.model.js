export class PromptParam {
  constructor(paramKey) {
    this.paramKey = paramKey
    this.name = paramKey
    this.value = ''
    this.isRequired = true
    this.isCollapsed = false
  }
}
