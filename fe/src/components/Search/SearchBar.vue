<template>
  <a-input :placeholder="placeholder" v-model="searchText" allowClear spellcheck="false">
    <template #prefix> <SearchOutlined /> </template>
  </a-input>
</template>
<script setup>
import { ref } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'

const props = defineProps({ placeholder: String })
const searchText = defineModel('searchText')
</script>

<style lang="scss" scoped></style>
