<template>
  <gradient-button label="Optimize" @click="showModal = true"
    ><i class="pi pi-sparkles text-indigo-500"></i
  ></gradient-button>
  <a-modal v-model:open="showModal" title="Auto Optimize Prompt" centered>
    <div class="flex h-[66vh] flex-col items-center justify-center">
      <div v-if="isOptimizing">
        <a-spin :indicator="loadingSpinner" />
      </div>

      <div v-else class="w-full">
        <div class="mb-2 flex justify-end">
          <gradient-button label="Retry" @click.enter="handleOptimizePrompt"></gradient-button>
        </div>
        <a-textarea
          class="!resize-none"
          v-model:value="optimizedPromptResult"
          :rows="20"
          spellcheck="false"
        />
      </div>
    </div>

    <template #footer>
      <div class="mt-8 flex justify-end gap-2">
        <CancelButton key="cancel" @click.enter="showModal = false" />
        <primary-button
          :class="{ 'cursor-not-allowed opacity-50': isOptimizing }"
          @click.enter="handleReplacePrompt"
        >
          <template #label> Replace </template>
        </primary-button>
      </div>
    </template>
  </a-modal>
</template>
<script setup>
import { ref, h, watch, inject } from 'vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { optimizePrompt } from '@/services/llm.service'
import { message } from 'ant-design-vue'
import CancelButton from '@/components/Button/CancelButton.vue'
import GradientButton from '../Button/GradientButton.vue'
import PrimaryButton from '../Button/PrimaryButton.vue'

const { prompt } = inject('configurationMode')
const optimizedPrompt = inject('optimizedPrompt')

const loadingSpinner = h(LoadingOutlined, {
  class: '!flex !text-[40px] items-center',
  spin: true
})
const showModal = ref(false)
const isOptimizing = ref(false)
const optimizedPromptResult = ref(undefined)

watch(showModal, (value) => {
  if (isOptimizing.value) return
  if (value) {
    handleOptimizePrompt()
  }
})

const handleOptimizePrompt = async () => {
  isOptimizing.value = true
  try {
    optimizedPromptResult.value = (await optimizePrompt(prompt.value)).data
  } catch (error) {
    console.error(error)
  } finally {
    isOptimizing.value = false
  }
}
const handleReplacePrompt = async () => {
  if (isOptimizing.value) return
  if (optimizedPromptResult.value == undefined) {
    message.error('Failed to optimize prompt. Please try again later.')
    return
  }

  optimizedPrompt.value = optimizedPromptResult.value
  showModal.value = false
}
</script>
