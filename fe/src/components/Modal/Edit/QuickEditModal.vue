<template>
  <a-modal v-model:open="isModalVisible" :title="modalTitle" centered>
    <div class="max-h-[66vh] overflow-auto">
      <div v-for="field in fieldsInfo" :key="field.key">
        <div class="mb-1 mt-4 font-semibold">
          {{ field.label }}<span v-if="field.key == 'name'" class="text-xl text-red-500"> *</span>
        </div>
        <a-input
          v-if="field.key == 'name'"
          :id="timestamp"
          v-model:value="fieldsData['name']"
          show-count
          spellcheck="false"
          :maxlength="100"
          :placeholder="field.placeholder"
        />
        <a-textarea
          v-else
          v-model:value="fieldsData[field.key]"
          spellcheck="false"
          :placeholder="field.placeholder"
          :auto-size="{ minRows: 5 }"
        />
      </div>

      <div class="mb-2 mt-3 font-semibold">Icon<span class="text-xl text-red-500"> *</span></div>
    </div>
    <template #footer>
      <div class="mt-8 flex justify-end gap-1">
        <CancelButton key="cancel" @click.enter="isModalVisible = false" />
        <primary-button
          :class="[
            !isValidData ? 'opacity-50' : '',
            !isValidData || confirmLoading ? 'cursor-not-allowed' : ''
          ]"
          @click.enter="handleOk"
          ><template #label>
            <a-spin :indicator="loadingSpinner" v-show="confirmLoading" /> Save
          </template>
        </primary-button>
      </div>
    </template>
  </a-modal>
</template>
<script setup>
import { ref, h, computed, watch, nextTick } from 'vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import PrimaryButton from '@/components/Button/PrimaryButton.vue'
import CancelButton from '@/components/Button/CancelButton.vue'

const props = defineProps({
  modalTitle: String,
  fieldsData: Object,
  fieldsInfo: Object
})
const emits = defineEmits(['submit'])
const isModalVisible = defineModel('isModalVisible')

const loadingSpinner = h(LoadingOutlined, {
  class: '!flex text-white !text-[18px] items-center',
  spin: true
})
const confirmLoading = ref(false)
const isValidData = computed(() => {
  const name = props.fieldsData['name']?.trim()
  return name
})
const timestamp = Date.now().toString()

watch(isModalVisible, (value) => {
  if (value) {
    nextTick(() => document.getElementById(timestamp).focus())
  }
})

const handleOk = async () => {
  if (confirmLoading.value || !isValidData.value) return
  confirmLoading.value = true

  emits('submit')
  confirmLoading.value = false
}
</script>
