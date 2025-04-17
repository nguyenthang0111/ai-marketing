<template>
  <a-tooltip color="gray" :title="title" overlayClassName="font-medium">
    <slot></slot>
    <i v-if="isShowQuestionIcon" class="pi pi-question-circle"></i>
  </a-tooltip>
</template>

<script setup>
const props = defineProps({
  title: String,
  isShowQuestionIcon: undefined
})
</script>

<style scoped></style>
