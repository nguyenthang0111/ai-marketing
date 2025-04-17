<template>
  <div class="relative">
    <div
      :class="[
        'h-[50vh] overflow-y-auto',
        'py-2 text-sm font-medium leading-6 text-gray-900',
        'whitespace-pre-wrap break-words',
        'select-none',
        isResizing ? 'select-none' : ''
      ]"
      ref="containerRef"
      contenteditable="true"
      spellcheck="false"
      placeholder="Viết từ nhắc của bạn ở đây nhập '{' để thêm một biến mới."
      @blur="handleBlur"
      @input="handleInput"
    ></div>

    <ConfirmAddParamModal
      :isModalVisible="isModalVisible"
      :newParams="newParams"
      @closeModal="isModalVisible = false"
      @mergeParams="mergeParams"
    />
    <!-- Resize bar -->
    <div
      class="absolute bottom-0 left-0 flex h-2 w-full cursor-row-resize justify-center"
      @mousedown="startResize"
    >
      <div class="h-1 w-5 rounded-sm bg-gray-300"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue'
import { useResizeHeight } from '@/composables/useResizeHeight'
import { useHighlightPrompt } from '@/composables/useHighlightPrompt'
import ConfirmAddParamModal from '@/components/Modal/Confirm/ConfirmAddParamModal.vue'

const botData = inject('botData')
const { params, prompt } = inject('configurationMode')
const optimizedPrompt = inject('optimizedPrompt')

const { isResizing, containerRef, startResize } = useResizeHeight()
const { handleInput, getNewParams, initializePrompt } = useHighlightPrompt(
  prompt,
  params,
  botData,
  containerRef
)

const newParams = ref([])
const isModalVisible = ref(false)

onMounted(() => {
  initializePrompt()
})
watch(optimizedPrompt, () => {
  prompt.value = optimizedPrompt.value
  initializePrompt()
})
watch(prompt, (value) => {
// console.log("🚀 ~ watch ~ value:", value)
})

const handleBlur = () => {
  newParams.value = getNewParams()
  if (newParams.value.length) {
    isModalVisible.value = true
  }
}
const mergeParams = () => {
  params.value = [...params.value, ...newParams.value]
}
</script>

<style scoped>
[contentEditable='true']:empty:before {
  content: attr(placeholder);
  opacity: 0.6;
}
</style>
