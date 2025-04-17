<template>
  <a-config-provider :locale="locale" :theme="themeStore.theme">
    <div v-if="hasSidebar" class="flex h-screen flex-row overflow-hidden">
      <SideBar v-model:isSidebarOpen="isSidebarOpen" />
      <div v-show="loadingStore.isLoading" class="w-full">
        <div class="flex h-full items-center justify-center bg-gray-50">
          <a-spin :indicator="loadingSpinner" />
        </div>
      </div>
      <div
        v-show="!loadingStore.isLoading"
        class="w-full overflow-y-auto overflow-x-hidden bg-gray-50"
      >
        <router-view></router-view>
      </div>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script setup>
import { ref, computed, watch, onMounted, provide, h } from 'vue'
import ja_JP from 'ant-design-vue/es/locale/ja_JP'
import en_US from 'ant-design-vue/es/locale/en_US'
import vi_VN from 'ant-design-vue/es/locale/vi_VN'
import SideBar from '@/components/Sidebar/SideBar.vue'
import { useLangStore } from '@/stores/lang.store'
import { useRoute } from 'vue-router'
import { useThemeStore } from '@/stores/theme.store'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { useLoadingStore } from '@/stores/loading.store'

const loadingStore = useLoadingStore()
const route = useRoute()
const locale = ref(vi_VN)
const localeMapping = {
  ja: ja_JP,
  en: en_US,
  vi: vi_VN
}
const hasSidebar = ref(null)
const isSidebarOpen = ref(true)
const isLoading = ref(true)
const loadingSpinner = h(LoadingOutlined, {
  class: '!flex !text-[50px] items-center',
  spin: true
})

const langStore = useLangStore()
const lang = computed(() => langStore.lang)

const themeStore = useThemeStore()

const setLocaleProvider = () => {
  locale.value = localeMapping[lang.value]
}

onMounted(setLocaleProvider)

watch(lang, setLocaleProvider)
watch(
  route,
  () => {
    hasSidebar.value = route.meta.hasSidebar
  },
  { immediate: true }
)

provide('isLoaded', isLoading)
</script>
