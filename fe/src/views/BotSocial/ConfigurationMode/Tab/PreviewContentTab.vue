<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div class="m-3 rounded-xl border bg-white">
    <header class="rounded-t-xl border bg-gradient-to-r from-cyan-500 to-blue-500 p-3 text-white">
      <span class="truncate text-2xl font-bold">{{ botData.name }}</span>
      <br />
      <span>{{ botData.description }}</span>
    </header>
    <main class="rounded-3 min-h-[66vh] p-3">
      <div v-html="markedContent"></div>
      <div v-show="isGeneratingContent" class="flex justify-center pt-5">
        <a-spin :indicator="loadingSpinner" />
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref, inject, h, computed } from 'vue'
import { marked } from 'marked'
import { LoadingOutlined } from '@ant-design/icons-vue'

const botData = inject('botData')
const { isGeneratingContent, content } = inject('configurationMode')

const markedContent = computed(() => marked(content.value))
const loadingSpinner = h(LoadingOutlined, {
  class: 'text-blue-700 !text-[40px]',
  spin: true
})
</script>
<style scoped></style>
