<template>
    <div>
    <a-button 
        class="border-primary text-primary bg-[#fff)] text- hover:bg-[#6a99d459] font-medium rounded-lg w-full" 
        @click.enter="isModalVisible = true"
    >
        Add to project
    </a-button>
    <a-modal v-model:open="isModalVisible" title="Create Application" centered>
      <div class="flex max-h-[66vh] flex-col gap-2 overflow-auto">
        <h6>
          Required fields are marked with an asterisk <span class="text-xl text-red-500"> * </span>
        </h6>
        <div class="project">
          <div class="mb-1 font-semibold">Project<span class="text-xl text-red-500"> *</span></div>
          <a-select
            class="w-full"
            v-model:value="selectedProjectId"
            show-search
            allowClear
            placeholder="Select a project"
            :filter-option="filterOption"
            :options="projectOptions"
          ></a-select>
        </div>

        <div v-show="isShowFields">
          <div v-for="field in botLibraryFieldsInfo" :key="field.key">
            <div class="mb-1 mt-4 font-semibold">
              {{ field.label
              }}<span v-if="field.key == 'name'" class="text-xl text-red-500"> *</span>
            </div>
            <a-input
              v-if="field.key == 'name'"
              :id="timestamp"
              v-model:value="fieldsData['name']"
              show-count
              spellcheck="false"
              :maxlength="100"
              :placeholder="field.placeholder"
            />
            <a-textarea
              v-else
              v-model:value="fieldsData[field.key]"
              spellcheck="false"
              :placeholder="field.placeholder"
              :auto-size="{ minRows: 5 }"
            />
          </div>
        </div>

        <div v-show="isShowSkeleton" class="mt-3 flex w-full flex-col gap-2">
          <a-skeleton-button active shape="round" />
          <a-skeleton-input active shape="round" :block="true" />
          <a-skeleton-button class="mt-3" active shape="round" />
          <a-skeleton-input active shape="round" :block="true" />
        </div>
      </div>
      <template #footer>
        <div class="mt-8 flex justify-end gap-1">
          <CancelButton @click.enter="isModalVisible = false" />
          <primary-button
            :class="[
              !isValidData ? 'opacity-50' : '',
              !isValidData || confirmLoading ? 'cursor-not-allowed' : ''
            ]"
            @click.enter="handleCreate"
          >
            <template #label>
              <a-spin :indicator="loadingSpinner" v-show="confirmLoading" /> Create
            </template>
          </primary-button>
        </div>
      </template>
    </a-modal>
  </div>
  </template>
  <script setup>
import { ref, h, watch, onBeforeMount, inject, computed, reactive, nextTick } from 'vue'
  import { LoadingOutlined } from '@ant-design/icons-vue'
  import { botLibraryFieldsInfo } from '@/constants/fields'
  import { useRouter } from 'vue-router'
  import BotLibrary from '@/models/bot-library.model'
  import { getAllProjectOfWorkspace } from '@/services/project.service'
  import PrimaryButton from '@/components/Button/PrimaryButton.vue'
  import CancelButton from '@/components/Button/CancelButton.vue'
  import { createBotSocialFromLibrary } from '@/services/bot-social.service'

  const router = useRouter()
  const props = defineProps({
    prompt: String
  })
  const confirmLoading = ref(false)
  const selectedProjectId = ref()
  const fieldsData = reactive(new BotLibrary({}))
  const isModalVisible = ref(false)
  const projectOptions = ref([])
  const isShowFields = ref(true)
  const isValidData = computed(() => {
    const name = fieldsData['name']?.trim()
    return name && selectedProjectId.value !== undefined
    })
  const loadingSpinner = h(LoadingOutlined, {
    class: '!flex text-white !text-[18px] items-center',
    spin: true
})

    onBeforeMount(async () => {
        try {
            const res = (await getAllProjectOfWorkspace()).data
            projectOptions.value = res.map((project) => ({
                label: project.name,
                value: project.projectId
            }))
        } catch (error) {
            console.error('Failed to fetch projects:', error)
        }
    })
  
  const handleCreate = async () => {
    try {
    fieldsData.prompt = props.prompt
    const botSocialRes = (await createBotSocialFromLibrary(selectedProjectId.value, fieldsData))
    .data

    router.push({
        name: 'Bot Social Detail',
        params: { projectId: selectedProjectId.value, botId: botSocialRes.data.botSocialId }
    })
    if (confirmLoading.value || !isValidData.value) return
    confirmLoading.value = true
    isModalVisible.value = false
    } catch (error) {
      console.error(error)
    } finally {
        confirmLoading.value = false
    }
  }
  </script>
  <style scoped></style>
  