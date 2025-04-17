<template>
  <a-modal :open="isOpen" :title="title" centered @cancel="handleCancel">
    <template #footer>
      <div class="flex items-center justify-end gap-1 pt-2">
        <CancelButton key="cancel" @click="handleCancel" />
        <CustomButton
          key="ok"
          class="bg-red-600 text-sm font-semibold text-white hover:bg-red-500"
          @click="handleOk"
        >
          <template #label> OK </template>
        </CustomButton>
      </div>
    </template>
    <div class="mt-2">
      <p class="text-base font-medium text-gray-500">
        {{ content }}
      </p>
    </div>
  </a-modal>
</template>

<script setup>
import CancelButton from '../Button/CancelButton.vue'
import CustomButton from '../Button/CustomButton.vue'

const props = defineProps({
  isOpen: Boolean,
  title: String,
  content: String,
  handleOk: Function,
  handleCancel: Function
})
</script>
