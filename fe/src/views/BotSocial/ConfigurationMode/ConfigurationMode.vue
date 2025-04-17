<template>
  <div class="p-3">
    <TabGroup :selected-index="selectedTab" @change="(index) => handleChangeTab(index)" manual>
      <div class="flex flex-row items-center justify-between px-3">
        <TabList class="flex space-x-2 rounded-xl bg-gray-200/70 p-2">
          <Tab v-for="tab in tabs" as="template" :key="tab.id" v-slot="{ selected }">
            <button
              :class="[
                'rounded-lg px-3 py-1.5 text-sm font-semibold leading-5',
                'focus:outline-none',
                selected ? 'bg-white text-primary-light shadow' : 'text-dark-gray hover:bg-white'
              ]"
            >
              {{ tab.name }}
            </button>
          </Tab>
        </TabList>
        <div v-show="selectedTab == 0" class="flex flex-row gap-3">
          <custom-button
            class="h-8 border bg-white text-sm font-semibold text-dark-gray-bold hover:shadow-md"
            @click.enter="handleResetOriginal()"
            ><template #label> Đặt lại </template>
          </custom-button>
          <primary-button class="h-8 text-sm" @click.enter="handleSave()"
            ><template #label> Lưu </template></primary-button
          >
        </div>
      </div>
      <TabPanels class="mt-2">
        <TabPanel v-for="tab in tabs" :key="tab.id" :unmount="false">
          <component :is="tab.component" :ref="tab.ref" />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import { provide, ref, reactive, onBeforeMount, watch, inject } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { getAllBrand } from '@/services/brand.service'
import { useRoute } from 'vue-router'
import { getAllProduct } from '@/services/product.service'
import { Highlight } from '@/helpers/highlight'
import { brandFields, productFields } from '@/constants/fields'
import { updateBotSocial } from '@/services/bot-social.service'
import CustomButton from '@/components/Button/CustomButton.vue'
import EditPromptTab from './Tab/EditPromptTab.vue'
import EnterDataTab from './Tab/EnterDataTab.vue'
import PreviewContentTab from './Tab/PreviewContentTab.vue'
import PostingTab from './Tab/PostingTab.vue'
import PrimaryButton from '@/components/Button/PrimaryButton.vue'

const botData = inject('botData')

const route = useRoute()
const projectId = route.params.projectId
const highlighter = new Highlight()

const tabs = [
  { id: 0, name: 'Edit prompt', component: EditPromptTab, ref: 'editPromptTab' },
  { id: 1, name: 'Fill data', component: EnterDataTab, ref: 'enterDataTab' },
  { id: 2, name: 'Preview content', component: PreviewContentTab, ref: 'previewContentTab' },
  { id: 3, name: 'Posting', component: PostingTab, ref: 'postingTab' }
]

const selectedTab = ref(0)
const params = ref([])
const prompt = ref(undefined)
const autoFillData = reactive({
  hasBrandFields: false,
  hasProductFields: false,
  selectedBrandId: '',
  selectedProductId: '',
  brands: [],
  products: []
})
const isGeneratingContent = ref(false)
const content = ref('')
const editPromptTab = ref(null)

onBeforeMount(async () => {
  const [brandRes, productRes] = await Promise.all([
    getAllBrand(projectId),
    getAllProduct(projectId)
  ])
  autoFillData.brands = brandRes.data
  autoFillData.products = productRes.data
})
watch(
  () => botData.prompt,
  (newValue, oldValue) => {
    prompt.value = newValue

    if (oldValue == '' || newValue == oldValue + ' ') {
      params.value = highlighter.getParams(newValue)
      params.value.forEach((param) => {
        if (brandFields.includes(param.paramKey)) autoFillData.hasBrandFields = true
        if (productFields.includes(param.paramKey)) autoFillData.hasProductFields = true
      })
    }
  }
)

const handleResetOriginal = () => {
  botData.prompt = botData.prompt + ' '
}
const handleSave = async () => {
  const res = (await updateBotSocial(botData.botSocialId, { prompt: prompt.value.trimEnd() })).data
  Object.assign(botData, res.data)
}
const handleChangeTab = async (index) => {
  let isValid = true
  if (selectedTab.value == 0 && index == 1) {
    isValid = await editPromptTab.value[0].validateData()
  }

  if (!isValid) return
  selectedTab.value = index
}

provide('configurationMode', {
  autoFillData,
  isGeneratingContent,
  content,
  prompt,
  params,
  handleChangeTab
})
</script>
<style scoped></style>
