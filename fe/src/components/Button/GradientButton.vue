<template>
  <custom-button
    class="border bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 !px-2.5 !py-1"
  >
    <template #icon> <slot></slot></template>
    <template #label>
      <span
        class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent"
        >{{ label }}</span
      ></template
    >
  </custom-button>
</template>

<script setup>
import CustomButton from './CustomButton.vue'

const props = defineProps({label: String})
</script>

<style scoped></style>
