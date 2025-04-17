<template>
  <div class="flex flex-col gap-4 p-6">
    <header class="flex justify-between">
      <h1 class="text-xl font-semibold">{{ project.name }}</h1>
      <CreateApplicationModal />
    </header>

    <div class="filter-bar flex items-center justify-between">
      <div class="flex gap-2">
        <a-select
          class="w-32"
          ref="selectType"
          v-model:value="selectedType"
          :options="filterTypeOptions"
        ></a-select>
        <a-select
          class="w-32"
          ref="selectAttribute"
          v-model:value="selectedAttribute"
          :options="filterAttributeOptions"
        ></a-select>
      </div>
      <SearchBar class="w-60" placeholder="Search in project" v-model:value="searchQuery" />
    </div>

    <template v-for="type in filterTypeOptions.slice(1)" :key="type.value">
      <div
        v-if="(selectedType == 'All' || selectedType == type.value) && getItems(type.value).length"
      >
        <div
          v-show="selectedType == 'All'"
          class="text-md mb-4 rounded-lg bg-gradient-to-r from-orange-300 from-20% to-gray-50 to-50% px-2 py-1 font-semibold text-primary"
        >
          {{ type.label }}
        </div>
        <div class="grid-custom">
          <component
            v-for="item in getItems(type.value)"
            :key="getItemKey(item)"
            :is="cardComponents[type.value] || 'div'"
            v-bind="item"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, provide, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getOneProject } from '@/services/project.service'
import { filterAttributeOptions, filterTypeOptions } from '@/constants/selectBoxOptions'
import { useLoadingStore } from '@/stores/loading.store'
import SearchBar from '@/components/Search/SearchBar.vue'
import CreateApplicationModal from '@/components/Modal/Create/CreateApplicationModal.vue'
import BotCard from '@/components/Card/BotCard.vue'
import ProductCard from '@/components/Card/ProductCard.vue'
import BrandCard from '@/components/Card/BrandCard.vue'
import debounce from 'lodash.debounce'

const loadingStore = useLoadingStore()

const cardComponents = {
  BotSocial: BotCard,
  Product: ProductCard,
  Brand: BrandCard
}

const route = useRoute()
const projectId = route.params.projectId
const project = ref({})

const selectedType = ref('All')
const selectedAttribute = ref('All')
const searchQuery = ref('')
const searchName = ref('')
const botSocials = ref([])
const products = ref([])
const brands = ref([])

onBeforeMount(() => {
  fetchProjectData()
})
const fetchProjectData = async () => {
  try {
    const { data } = await getOneProject(projectId)
    project.value = data
    botSocials.value = data.botSocials
    products.value = data.products
    brands.value = data.brands
  } catch (error) {
    console.error(error)
  } finally {
    loadingStore.setIsLoading(false)
  }
}

watch(
  searchQuery,
  debounce(() => {
    searchName.value = searchQuery.value
  }, 500)
)
const filterItems = (items) => {
  let filteredItems = [...items.value]
  filteredItems = filteredItems.filter((item) =>
    item.name.toLowerCase().includes(searchName.value.toLowerCase())
  )
  if (selectedAttribute.value === 'Favorite') {
    filteredItems = filteredItems.filter((item) => item.favorite)
  }
  if (selectedAttribute.value === 'Recent') {
    filteredItems = filteredItems.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  }
  return filteredItems
}
const filteredBotSocials = computed(() => filterItems(botSocials))
const filteredProducts = computed(() => filterItems(products))
const filteredBrands = computed(() => filterItems(brands))

const getItems = (type) => {
  return (
    {
      BotSocial: filteredBotSocials,
      Product: filteredProducts,
      Brand: filteredBrands
    }[type].value || []
  )
}
const getItemKey = (item) => {
  return item.botSocialId || item.productId || item.brandId || 'unknown-id'
}

provide('projectData', {
  botSocials,
  products,
  brands
})
</script>

<style scoped></style>
