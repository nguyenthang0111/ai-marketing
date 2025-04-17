<template>
  <div class="mt-40 flex w-full flex-col items-center justify-center gap-3">
    <MehOutlined class="text-3xl" />
    <span class="text-base font-semibold">No results found under the current filters</span>
    <custom-button v-show="isButtonVisible"  class="border bg-gray-200 hover:bg-gray-300" @click="$emit('clearFilters')">
      <template #icon>
        <ClearOutlined />
      </template>
      <template #label>
        <span class="text-sm font-semibold"> Clear filters </span>
      </template>
    </custom-button>
  </div>
</template>

<script setup>
import { ClearOutlined, MehOutlined } from '@ant-design/icons-vue'
import CustomButton from '../Button/CustomButton.vue'

const props = defineProps({ isButtonVisible: Boolean })
const emits = defineEmits(['clearFilters'])
</script>

<style scoped></style>
