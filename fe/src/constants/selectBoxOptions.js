const modelOptions = [
  { label: 'ChatGPT 4o mini', value: 'ChatGPT 4o mini' },
  { label: 'Gemini Flash 1.5', value: 'Gemini Flash 1.5' }
]
const levelOptions = [
  { label: 'Precise', value: 'Precise' },
  { label: 'Balance', value: 'Balance' },
  { label: 'Creative', value: 'Creative' }
]
const lengthOptions = [
  { value: '200 words - 500 words', label: 'Short (200 words - 500 words)' },
  { value: '500 words - 1000 words', label: 'Medium (500 words - 1000 words)' },
  { value: '1000 words - 2000 words', label: 'Long (1000 words - 2000 words)' },
  { value: 'More than 2000 words', label: 'More than 2000 words' }
]
const toneOptions = [
  { value: 'Formal', label: 'Formal' },
  { value: 'Friendly', label: 'Friendly' },
  { value: 'Professional', label: 'Professional' },
  { value: 'Neutral', label: 'Neutral' },
  { value: 'Custom', label: 'Custom' }
]
const languageOptions = [
  { value: 'English', label: 'English' },
  { value: 'Vietnamese', label: 'Vietnamese' },
  { value: 'Japanese', label: 'Japanese' }
]
const applicationTypeOptions = [
  { value: 'BotSocial', label: 'Bot Social' },
  // { value: 'BotWeb', label: 'Bot Web' },
  // { value: 'Chatbot', label: 'Chatbot' },
  { value: 'Product', label: 'Product' },
  { value: 'Brand', label: 'Brand' }
]
const filterTypeOptions = [
  { value: 'All', label: 'All' },
  { value: 'BotSocial', label: 'Bot Social' },
  { value: 'Product', label: 'Product' },
  { value: 'Brand', label: 'Brand' }
]
const filterAttributeOptions = [
  { value: 'All', label: 'All' },
  { value: 'Favorite', label: 'Favorite' },
  { value: 'Recent', label: 'Recent' }
]

const filterOption = (input, option) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

export {
  modelOptions,
  levelOptions,
  lengthOptions,
  toneOptions,
  languageOptions,
  applicationTypeOptions,
  filterTypeOptions,
  filterAttributeOptions,
  filterOption
}
