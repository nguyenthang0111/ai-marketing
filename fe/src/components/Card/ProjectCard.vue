<template>
  <BaseCard
    :name="name"
    :description="description"
    :updatedAt="updatedAt"
    @viewDetail="viewDetail"
    @handleQuickEdit="showEditModal"
    @handleDelete="showConfirmModal"
    @handleDuplicate="handleDuplicateProject"
  />

  <QuickEditModal
    modalTitle="Edit Project"
    :fieldsData="projectFieldsData"
    :fieldsInfo="projectFieldsInfo"
    v-model:isModalVisible="editModalVisible"
    @submit="handleUpdateProject"
  />

  <ConfirmDeleteModal
    type="project"
    :projectName="name"
    v-model:isModalVisible="confirmModalVisible"
    @submit="handleDeleteProject"
  />
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { deleteProject, updateProject } from '@/services/project.service'
import { projectFieldsInfo } from '@/constants/fields'
import BaseCard from './BaseCard.vue'
import QuickEditModal from '../Modal/Edit/QuickEditModal.vue'
import Project from '@/models/project.model'
import ConfirmDeleteModal from '../Modal/Confirm/ConfirmDeleteModal.vue'

const props = defineProps({
  projectId: String,
  name: String,
  description: String,
  updatedAt: String
})
const projects = defineModel('projects')

const router = useRouter()

const projectFieldsData = reactive(new Project({}))

const editModalVisible = ref(false)
const confirmModalVisible = ref(false)

const viewDetail = () => {
  router.push({
    name: 'Project Detail',
    params: {
      projectId: props.projectId
    }
  })
}
const showEditModal = () => {
  Object.assign(projectFieldsData, props)
  editModalVisible.value = true
}
const showConfirmModal = () => {
  confirmModalVisible.value = true
}
const handleDeleteProject = async () => {
  try {
    await deleteProject(props.projectId)
    
    projects.value = projects.value.filter((project) => project.projectId !== props.projectId)
    confirmModalVisible.value = false
  } catch (error) {
    console.error(error)
  }
}
const handleUpdateProject = async () => {
  try {
    const res = (await updateProject(props.projectId, new Project(projectFieldsData))).data

    projects.value = projects.value.map((project) => {
      if (project.projectId === props.projectId) {
        return { ...project, ...res.data }
      }
      return project
    })
    editModalVisible.value = false
  } catch (error) {
    console.error(error)
  }
}
const handleDuplicateProject = () => {}
</script>

<style scoped></style>
