<template>
  <div class="divide-black-900 divide-y">
    <header class="flex flex-row items-center gap-16 px-6 py-3">
      <div class="information flex max-w-[50%] flex-row items-center gap-3">
        <i class="pi pi-chevron-left cursor-pointer" @click="$router.go(-1)"> </i>

        <img
          class="inline-block size-6 rounded-full ring-2 ring-white"
          src="@/assets/flag/vietnam.png"
          alt=""
        />
        <div class="flex max-w-[90%] flex-col">
          <div class="flex gap-2">
            <h6 class="truncate font-semibold">{{ botData.name }}</h6>
            <i class="pi pi-pen-to-square cursor-pointer" @click="showEditModal"></i>
            <QuickEditModal
              modalTitle="Edit Bot"
              :fieldsData="botFieldsData"
              :fieldsInfo="botFieldsInfo"
              v-model:isModalVisible="editModalVisible"
              @submit="handleUpdateBot"
            />
          </div>
          <h6 class="truncate text-xs font-normal">{{ botData.description }}</h6>
        </div>
      </div>
      <div class="view-mode flex gap-4">
        <span class="text-xl font-semibold text-primary">Tổng quan</span>
        <!-- <span class="text-xl font-medium text-dark-gray">Lịch sử</span> -->
      </div>
    </header>
    <main>
      <ConfigurationMode />
    </main>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, provide, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getOneBotSocial, updateBotSocial } from '@/services/bot-social.service'
import { botFieldsInfo } from '@/constants/fields'
import { useLoadingStore } from '@/stores/loading.store'
import ConfigurationMode from './ConfigurationMode/ConfigurationMode.vue'
import QuickEditModal from '@/components/Modal/Edit/QuickEditModal.vue'

const loadingStore = useLoadingStore()
const route = useRoute()
const botId = route.params.botId
const botData = reactive({
  botSocialId: '',
  name: '',
  description: '',
  prompt: ''
})
const botFieldsData = reactive({
  name: '',
  description: ''
})
const editModalVisible = ref(false)

onBeforeMount(async () => {
  try {
    const { data } = await getOneBotSocial(botId)
    Object.assign(botData, data)
    editModalVisible.value = false
  } catch (error) {
    console.log(error)
  }
})
onMounted(() => {
  loadingStore.setIsLoading(false)
})

const showEditModal = () => {
  Object.assign(botFieldsData, botData)
  editModalVisible.value = true
}
const handleUpdateBot = async () => {
  try {
    const res = (await updateBotSocial(botId, botFieldsData)).data

    Object.assign(botData, res.data)
    editModalVisible.value = false
  } catch (error) {
    console.log(error)
  }
}

provide('botData', botData)
</script>

<style scoped></style>
