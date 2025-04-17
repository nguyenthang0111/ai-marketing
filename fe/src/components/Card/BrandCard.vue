<template>
  <BaseCard
    :name="name"
    :description="description"
    :updatedAt="updatedAt"
    @handleQuickEdit="showEditModal"
    @handleDelete="showConfirmModal"
    @handleDuplicate="handleDuplicateBrand"
  />

  <QuickEditModal
    modalTitle="Edit Brand"
    :fieldsData="brandFieldsData"
    :fieldsInfo="brandFieldsInfo"
    v-model:isModalVisible="editModalVisible"
    @submit="handleUpdateBrand"
  />

  <ConfirmDeleteModal
    type="brand"
    v-model:isModalVisible="confirmModalVisible"
    @submit="handleDeleteBrand"
  />
</template>

<script setup>
import { ref, inject, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { deleteBrand, updateBrand } from '@/services/brand.service'
import { brandFieldsInfo } from '@/constants/fields'
import BaseCard from './BaseCard.vue'
import QuickEditModal from '../Modal/Edit/QuickEditModal.vue'
import Brand from '@/models/brand.model'
import ConfirmDeleteModal from '../Modal/Confirm/ConfirmDeleteModal.vue'

const { brands } = inject('projectData')
const props = defineProps({
  brandId: String,
  name: String,
  description: String,
  location: String,
  contactInfo: String,
  updatedAt: String
})

const brandFieldsData = reactive(new Brand({}))

const editModalVisible = ref(false)
const confirmModalVisible = ref(false)

const showEditModal = () => {
  Object.assign(brandFieldsData, props)
  editModalVisible.value = true
}
const showConfirmModal = () => {
  confirmModalVisible.value = true
}
const handleDeleteBrand = async () => {
  try {
    await deleteBrand(props.brandId)

    brands.value = brands.value.filter((brand) => brand.brandId !== props.brandId)
    confirmModalVisible.value = false
  } catch (error) {
    console.error(error)
  }
}
const handleUpdateBrand = async () => {
  try {
    const res = (await updateBrand(props.brandId, new Brand(brandFieldsData))).data

    brands.value = brands.value.map((brand) => {
      if (brand.brandId === props.brandId) {
        return { ...brand, ...res.data }
      }
      return brand
    })
    editModalVisible.value = false
  } catch (error) {
    console.error(error)
  }
}
const handleDuplicateBrand = () => {}
</script>

<style scoped></style>
