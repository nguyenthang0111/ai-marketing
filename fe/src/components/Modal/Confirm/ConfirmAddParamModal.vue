<template>
  <a-modal
    width="50vw"
    :open="isModalVisible"
    :closable="false"
    centered
    @cancel="$emit('closeModal')"
  >
    <div class="flex flex-row gap-4">
      <ExclamationCircleOutlined class="w-6 text-3xl text-orange-500" />
      <div>
        <p class="font-semibold">
          Biến chưa định nghĩa được tham chiếu trong <br />
          pre-prompt, bạn có muốn thêm chúng vào biểu mẫu đầu vào của người dùng không?
        </p>
        <div
          v-for="param in newParams"
          :key="param.id"
          class="mr-2 mt-2 inline-block rounded-lg bg-blue-100 p-1 font-semibold text-blue-700"
        >
          {{ '{' + '{' + param.paramKey + '}' + '}' }}
        </div>
      </div>
    </div>
    <template #footer>
      <div class="mt-8 flex justify-end gap-1">
        <CancelButton key="cancel" @click="emits('closeModal')" />
        <primary-button key="ok" @click="handleOk">
          <template #label> Confirm </template>
        </primary-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup>
import { ref } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import CancelButton from '@/components/Button/CancelButton.vue'
import PrimaryButton from '@/components/Button/PrimaryButton.vue'

const props = defineProps({
  isModalVisible: Boolean,
  newParams: Array
})
const emits = defineEmits(['closeModal', 'mergeParams'])

const handleOk = () => {
  emits('mergeParams')
  emits('closeModal')
}
</script>
