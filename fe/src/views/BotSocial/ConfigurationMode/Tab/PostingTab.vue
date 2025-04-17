<template>
  <div class="m-3 h-[75vh] rounded-xl border bg-white p-3">
    <div>
      <PrimaryButton class="border !bg-primary-light" @click="handleRecommendTitle">
        <template #label> Recommend article title </template>
      </PrimaryButton>
      <div v-show="showSpinner" class="flex justify-center pt-5">
        <a-spin :indicator="loadingSpinner" />
      </div>
      <div v-show="isShowRecommendedTitle">
        <a-select
          class="mt-3 w-full"
          v-model:value="selectedTitle"
          :options="recommendedTitles"
          placeholder="Select a title"
        ></a-select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { generateContent, suggestTitle } from '@/services/llm.service'
import { ref, inject, h } from 'vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import CustomButton from '@/components/Button/CustomButton.vue'
import PrimaryButton from '@/components/Button/PrimaryButton.vue'
import { message } from 'ant-design-vue'

const { content } = inject('configurationMode')

const loadingSpinner = h(LoadingOutlined, {
  class: 'text-blue-700 !text-[40px]',
  spin: true
})
const showSpinner = ref(false)
const selectedTitle = ref('')
const isShowRecommendedTitle = ref(false)
const recommendedTitles = ref([])

const handleRecommendTitle = async () => {
  if (content.value === '') {
    message.error('Please create content before recommending title')
    return
  }
  
  try {
    showSpinner.value = true
    const res = (await suggestTitle(content.value)).data
    const cleanedResult = res.replace(/```json|```/g, '').trim()

    recommendedTitles.value = JSON.parse(cleanedResult)
    recommendedTitles.value = recommendedTitles.value.map((title, index) => ({
      label: title,
      value: title
    }))

    showSpinner.value = false
    isShowRecommendedTitle.value = true
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped></style>
