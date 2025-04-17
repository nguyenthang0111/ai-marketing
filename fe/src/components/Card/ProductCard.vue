<template>
  <BaseCard
    :name="name"
    :description="description"
    :updatedAt="updatedAt"
    @handleQuickEdit="showEditModal"
    @handleDelete="showConfirmModal"
    @handleDuplicate="handleDuplicateProduct"
  />

  <QuickEditModal
    modalTitle="Edit Product"
    :fieldsData="productFieldsData"
    :fieldsInfo="productFieldsInfo"
    v-model:isModalVisible="editModalVisible"
    @submit="handleUpdateProduct"
  />

  <ConfirmDeleteModal
    type="product"
    v-model:isModalVisible="confirmModalVisible"
    @submit="handleDeleteProduct"
  />
</template>

<script setup>
import { ref, inject, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { deleteProduct, updateProduct } from '@/services/product.service'
import { productFieldsInfo } from '@/constants/fields'
import BaseCard from './BaseCard.vue'
import QuickEditModal from '../Modal/Edit/QuickEditModal.vue'
import Product from '@/models/product.model'
import ConfirmDeleteModal from '../Modal/Confirm/ConfirmDeleteModal.vue'

const { products } = inject('projectData')
const props = defineProps({
  productId: String,
  name: String,
  description: String,
  benefit: String,
  promotion: String,
  customerPersona: String,
  customerProblem: String,
  solution: String,
  updatedAt: String
})

const productFieldsData = reactive(new Product({}))
const editModalVisible = ref(false)
const confirmModalVisible = ref(false)

const showEditModal = () => {
  Object.assign(productFieldsData, props)
  editModalVisible.value = true
}
const showConfirmModal = () => {
  confirmModalVisible.value = true
}
const handleDeleteProduct = async () => {
  try {
    await deleteProduct(props.productId)

    products.value = products.value.filter((product) => product.productId !== props.productId)
    confirmModalVisible.value = false
  } catch (error) {
    console.error(error)
  }
}
const handleUpdateProduct = async () => {
  try {
    const res = (await updateProduct(props.productId, new Product(productFieldsData))).data

    products.value = products.value.map((product) => {
      if (product.productId === props.productId) {
        return { ...product, ...res.data }
      }
      return product
    })
    editModalVisible.value = false
  } catch (error) {
    console.error(error)
  }
}
const handleDuplicateProduct = async () => {}
</script>

<style scoped></style>
