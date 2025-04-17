<template>
  <div>
    <primary-button class="text-medium h-8" @click.enter="isModalVisible = true">
      <template #label> Create Application</template>
    </primary-button>
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

        <div class="application-type">
          <div class="mb-1 font-semibold">
            Application type<span class="text-xl text-red-500"> *</span>
          </div>
          <a-select
            class="w-full"
            v-model:value="selectedApplicationType"
            :options="applicationTypeOptions"
          ></a-select>
        </div>

        <div v-show="isShowFields">
          <div v-for="field in fieldsInfo" :key="field.key">
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

        <div class="icon">
          <div class="mb-1 font-semibold">Icon<span class="text-xl text-red-500"> *</span></div>
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
import { useRoute, useRouter } from 'vue-router'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { filterOption, applicationTypeOptions } from '@/constants/selectBoxOptions'
import { getAllProjectOfWorkspace } from '@/services/project.service'
import { botFieldsInfo, brandFieldsInfo, productFieldsInfo } from '@/constants/fields'
import { createBrand } from '@/services/brand.service'
import { createProduct } from '@/services/product.service'
import { createBotSocial } from '@/services/bot-social.service'
import PrimaryButton from '@/components/Button/PrimaryButton.vue'
import CancelButton from '@/components/Button/CancelButton.vue'
import BotSocial from '@/models/bot-social.model'
import Brand from '@/models/brand.model'
import Product from '@/models/product.model'

const { brands, products } = inject('projectData')
const router = useRouter()
const route = useRoute()
const currentProjectId = route.params.projectId
const loadingSpinner = h(LoadingOutlined, {
  class: '!flex text-white !text-[18px] items-center',
  spin: true
})
const selectedProjectId = ref(currentProjectId)
const projectOptions = ref([])
const selectedApplicationType = ref('')
const fieldsData = reactive({})
const fieldsInfo = ref([])
const fieldsMapping = {
  BotSocial: {
    fieldsInfo: botFieldsInfo,
    fieldsData: new BotSocial({})
  },
  Brand: {
    fieldsInfo: brandFieldsInfo,
    fieldsData: new Brand({})
  },
  Product: {
    fieldsInfo: productFieldsInfo,
    fieldsData: new Product({})
  }
}
const confirmLoading = ref(false)
const isShowSkeleton = ref(false)
const isModalVisible = ref(false)
const isShowFields = ref(false)
const isValidData = computed(() => {
  const name = fieldsData['name']?.trim()
  return name && selectedProjectId.value !== undefined
})
const timestamp = Date.now().toString()

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

watch(isModalVisible, (newVal) => {
  if (newVal) {
    selectedApplicationType.value = 'BotSocial'
  } else
    selectedApplicationType.value = ''
})
watch(selectedApplicationType, (newVal) => {
  if (!newVal) return

  isShowFields.value = false
  isShowSkeleton.value = true

  fieldsInfo.value = fieldsMapping[newVal].fieldsInfo
  Object.assign(fieldsData, fieldsMapping[newVal].fieldsData)

  setTimeout(() => {
    isShowSkeleton.value = false
    isShowFields.value = true

    nextTick(() => document.getElementById(timestamp).focus())
  }, 300)
})

const handleCreate = () => {
  if (confirmLoading.value || !isValidData.value) return
  confirmLoading.value = true

  try {
    switch (selectedApplicationType.value) {
      case 'BotSocial':
        handleCreateBotSocial()
        break
      case 'Brand':
        handleCreateBrand()
        break
      case 'Product':
        handleCreateProduct()
        break
    }
    isModalVisible.value = false
  } catch (error) {
    console.error('An error occurred while creating the application:', error)
  } finally {
    confirmLoading.value = false
  }
}
const handleCreateBotSocial = async () => {
  const botSocialRes = (await createBotSocial(selectedProjectId.value, new BotSocial(fieldsData)))
    .data

  router.push({
    name: 'Bot Social Detail',
    params: { projectId: selectedProjectId.value, botId: botSocialRes.data.botSocialId }
  })
}
const handleCreateProduct = async () => {
  const productRes = (await createProduct(selectedProjectId.value, new Product(fieldsData))).data

  if (currentProjectId == selectedProjectId.value)
    products.value = [productRes.data, ...products.value]
}
const handleCreateBrand = async () => {
  const brandRes = (await createBrand(selectedProjectId.value, new Brand(fieldsData))).data

  if (currentProjectId == selectedProjectId.value) brands.value = [brandRes.data, ...brands.value]
}
</script>
