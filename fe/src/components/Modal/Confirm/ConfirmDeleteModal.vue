<template>
  <a-modal
    width="50vw"
    v-model:open="isModalVisible"
    :title="modalTitle"
    :closable="false"
    centered
  >
    <p class="font-semibold text-gray-500">
      {{ modalDescription }}
    </p>

    <div v-if="projectName">
      <div class="mb-1 mt-1 font-semibold">
        Project name<span class="text-xl text-red-500"> *</span>
      </div>
      <a-input v-model:value="enteredProjectName" spellcheck="false" :placeholder="projectName" />
    </div>
    <template #footer>
      <div class="mt-4 flex justify-end gap-1">
        <CancelButton key="cancel" @click.enter="isModalVisible = false" />
        <primary-button
          :class="[
            !isValidData ? 'opacity-50' : '',
            !isValidData || confirmLoading ? 'cursor-not-allowed' : ''
          ]"
          danger
          @click.enter="handleOk"
          ><template #label>
            <a-spin :indicator="loadingSpinner" v-show="confirmLoading" /> Delete
          </template>
        </primary-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup>
import { ref, h, computed, onBeforeUpdate } from 'vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import CancelButton from '@/components/Button/CancelButton.vue'
import PrimaryButton from '@/components/Button/PrimaryButton.vue'

const props = defineProps({ type: String, projectName: String })
const emits = defineEmits(['submit'])
const isModalVisible = defineModel('isModalVisible')

const loadingSpinner = h(LoadingOutlined, {
  class: '!flex text-white !text-[18px] items-center',
  spin: true
})
const confirmLoading = ref(false)
const enteredProjectName = ref('')
const isValidData = computed(() => {
  if (!props.projectName) return true
  return enteredProjectName.value.trimEnd() === props.projectName.trimEnd()
})
const modalTitle = 'Are you sure you want to delete the ' + props.type + '?'
const modalDescription =
  'Deletion is irreversible. Please proceed with caution. If you are sure to delete, please' +
  (props.projectName ? ' enter the project name below.' : ' click the delete button below.')

onBeforeUpdate(() => {
  enteredProjectName.value = ''
})

const handleOk = () => {
  if (confirmLoading.value || !isValidData.value) return
  confirmLoading.value = true

  emits('submit')
  confirmLoading.value = false
}
</script>
