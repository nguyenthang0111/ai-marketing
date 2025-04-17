<template>
  <BaseCard
    :name="name"
    :description="description"
    :updatedAt="updatedAt"
    :projectName="projectName"
    :favorite="favorite"
    @viewDetail="viewDetail"
    @handleQuickEdit="showEditModal"
    @handleDelete="showConfirmModal"
    @handleDuplicate="handleDuplicateBot"
    @handleChangeFavorite="handleChangeFavorite"
  />

  <QuickEditModal
    modalTitle="Edit Bot"
    :fieldsData="botFieldsData"
    :fieldsInfo="botFieldsInfo"
    v-model:isModalVisible="editModalVisible"
    @submit="handleUpdateBot"
  />

  <ConfirmDeleteModal
    type="bot"
    v-model:isModalVisible="confirmModalVisible"
    @submit="handleDeleteBot"
  />
</template>

<script setup>
import { ref, inject, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { deleteBotSocial, updateBotSocial } from '@/services/bot-social.service'
import { botFieldsInfo } from '@/constants/fields'
import BaseCard from './BaseCard.vue'
import QuickEditModal from '../Modal/Edit/QuickEditModal.vue'
import ConfirmDeleteModal from '../Modal/Confirm/ConfirmDeleteModal.vue'

const { botSocials } = inject('projectData', {
  botSocials: ref([])
})
const props = defineProps({
  botSocialId: String,
  botWebId: String,
  chatbotId: String,
  name: String,
  description: String,
  prompt: String,
  favorite: Boolean,
  updatedAt: String,
  projectName: String,
  botId: String,
  routeName: String,
})

const route = useRoute()
const router = useRouter()
const projectId = route.params.projectId

const botFieldsData = reactive({
  name: '',
  description: ''
})
const botId = props.botSocialId || props.botWebId || props.chatbotId 

const editModalVisible = ref(false)
const confirmModalVisible = ref(false)

const viewDetail = () => {
  router.push({
    name: getRouteName(),
    params: {
      projectId,
      botId
    }
  })
}
const getRouteName = () => {
  return 'Bot Social Detail';
}
const showEditModal = () => {
  Object.assign(botFieldsData, props)
  editModalVisible.value = true
}
const showConfirmModal = () => {
  confirmModalVisible.value = true
}
const handleDeleteBot = async () => {
  try {
    await deleteBotSocial(botId)
    
    botSocials.value = botSocials.value.filter((bot) => bot.botSocialId !== botId)
    confirmModalVisible.value = false
  } catch (error) {
    console.log(error)
  }
}
const handleUpdateBot = async () => {
  try {
    const res = (await updateBotSocial(botId, botFieldsData)).data

    botSocials.value = botSocials.value.map((bot) => {
      if (bot.botSocialId === botId) {
        return { ...bot, ...res.data }
      }
      return bot
    })
    editModalVisible.value = false
  } catch (error) {
    console.log(error)
  }
}
const handleDuplicateBot = () => {}
const handleChangeFavorite = async () => {
  try {
    const res = (await updateBotSocial(botId, { favorite: !props.favorite })).data

    botSocials.value = botSocials.value.map((bot) => {
      if (bot.botSocialId === botId) {
        return { ...bot, ...res.data }
      }
      return bot
    })
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
