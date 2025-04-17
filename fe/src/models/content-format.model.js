import {
  languageOptions,
  levelOptions,
  modelOptions,
  toneOptions,
  lengthOptions
} from '@/constants/selectBoxOptions'
export default class ContentFormat {
  constructor(
    customContent,
    model,
    creativityLevel,
    length,
    tone,
    language,
    useEmoji,
    useMarkdown
  ) {
    this.customContent = customContent || ''
    this.model = model || modelOptions[1].value
    this.creativityLevel = creativityLevel || levelOptions[1].value
    this.length = length || lengthOptions[1].value
    this.tone = tone || toneOptions[1].value
    this.language = language || languageOptions[1].value
    this.useEmoji = useEmoji || false
    this.useMarkdown = useMarkdown || false
  }
}
