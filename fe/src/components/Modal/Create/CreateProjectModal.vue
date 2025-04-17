<template>
  <BaseCreateModal
    modalTitle="Create Project"
    :fieldsInfo="projectFieldsInfo"
    :fieldsData="projectFieldsData"
    v-model:isModalVisible="isModalVisible"
    @submit="handleSubmit"
  />
</template>
<script setup>
import { ref, reactive } from 'vue'
import { createProject } from '@/services/project.service'
import { projectFieldsInfo } from '@/constants/fields'
import { useRouter } from 'vue-router'
import Project from '@/models/project.model'
import BaseCreateModal from './BaseCreateModal.vue'

const projects = defineModel('projects')
const router = useRouter()
const projectFieldsData = reactive(new Project({}))
const isModalVisible = ref(false)

const handleSubmit = async () => {
  try {
    const res = (await createProject(new Project(projectFieldsData))).data

    projects.value.push(res.data)
    router.push({ name: 'Project Detail', params: { projectId: res.data.projectId } })
    isModalVisible.value = false
  } catch (error) {
    console.error(error)
  }
}
</script>
<style scoped></style>
