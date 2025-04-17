<template>
    <div class="p-5">
        <a-card>
            <template #title>
                <div class="flex items-center gap-2 ms-5 text-xl">
                    <SettingOutlined />
                    <span class="dark:text-customColor-button">{{ $t('hello') }}</span>
                </div>
            </template>
            <a-tabs v-model:activeKey="activeKey" :tab-position="'left'" :style="{ minHeight: '200px' }">
                <a-tab-pane :key="1">
                    <template #tab>
                        <span>
                            <TranslationOutlined />
                            Ngôn ngữ
                        </span>
                    </template>
                    <div class="flex gap-5">
                        <custom-tooltip title="Tiếng Việt">
                            <img @click="changeLanguage('vi')" style="width: 30px; height: 25px;" src="/src/assets/flag/vietnam.png" alt="">
                        </custom-tooltip>
                        <custom-tooltip title="日本語">
                            <img @click="changeLanguage('ja')" style="width: 30px; height: 25px; border: 1px solid #ccc;"
                                src="/src/assets/flag/japan.png" alt="">
                        </custom-tooltip>
                        <custom-tooltip title="English">
                            <img @click="changeLanguage('en')" style="width: 30px; height: 25px;" src="/src/assets/flag/uk.png" alt="">
                        </custom-tooltip>
                    </div>
                </a-tab-pane>
                <a-tab-pane :key="2">
                    <template #tab>
                        <span>
                            <ControlOutlined />
                            Theme
                        </span>
                    </template>
                    <div class="flex gap-4">
                        <div @click="themeStore.setDarkMode('auto')" class="w-8 h-8 rounded-md bg-[rgb(249,115,22)]"
                            :class="{ selected: themeStore.colorMode === 'auto' }">
                        </div>
                        <div @click="themeStore.setDarkMode('dark')" class="w-8 h-8 rounded-md bg-[#1eb9ee]"
                            :class="{ selected: themeStore.colorMode === 'dark' }">
                        </div>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </a-card>
    </div>
</template>

<script setup>
import { ControlOutlined, TranslationOutlined } from '@ant-design/icons-vue';
import { ref, computed, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import {SettingOutlined} from '@ant-design/icons-vue';
import { useThemeStore } from '@/stores/theme.store';
import { useLoadingStore } from '@/stores/loading.store';
import CustomTooltip from '@/components/Tooltip/CustomTooltip.vue';

const themeStore = useThemeStore();
const loadingStore = useLoadingStore();

const { locale } = useI18n();
const activeKey = ref(1);

onBeforeMount(() => {
    loadingStore.setIsLoading(false);
})

const changeLanguage = (lang) => {
    locale.value = lang;
    localStorage.setItem('lang', lang)
}

</script>

<style scoped>
.selected {
    border: 2px solid #000;
}
img {
  width: 30px;
  height: 25px;
  border: 2px solid #ff4500;
  border-radius: 5px; /* Bo góc */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}

img:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

</style>