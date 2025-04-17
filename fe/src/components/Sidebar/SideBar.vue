<template>
  <div
    id="side-bar"
    class="border-r bg-white"
    :class="isSidebarOpen == true ? 'side-bar-open' : 'side-bar-close'"
  >
    <div class="position-sticky left-0 top-0 h-[100vh]">
      <div class="position-relative flex h-full w-full flex-col justify-between">
        <!-- Top -->
        <div>
          <div class="relative">
            <a class="flex items-center justify-center px-[24px] py-[18px]" v-show="isSidebarOpen">
              <img alt="Logo brand" src="@/assets/logo/javis.png" class="h-8 w-auto object-cover" />
            </a>
            <div class="flex flex-col items-center py-[8px]" v-show="!isSidebarOpen">
              <span class="text-lg font-semibold">Javis</span>
              <span class="text-lg font-semibold">AI</span>
            </div>
            <div class="absolute -right-3 top-4 z-50">
              <button @click="clickArrowButton">
                <span
                  class="icon-[mdi--chevron-right-circle] h-7 w-7 text-primary duration-500"
                  :class="isSidebarOpen == true ? '-rotate-180' : ''"
                >
                </span>
              </button>
            </div>
          </div>

          <!-- BUTTON ADD PROJECT -->
          <div class="w-ful" :class="isSidebarOpen == true ? 'px-[20px]' : 'px-3'">
            <primary-button :class="isSidebarOpen ? '!px-7 !py-1.5' : ''">
              <template #icon>
                <span class="icon-[mdi--plus-thick]"></span>
              </template>
              <template #label>
                <span v-show="isSidebarOpen">Tạo ứng dụng mới</span>
              </template>
            </primary-button>
          </div>

          <ul class="list-none p-0">
            <li
              class="block py-[15px]"
              v-for="item in sidebarItems"
              :key="item.id"
              :class="isSidebarOpen == true ? 'px-[26px]' : 'px-[20px]'"
            >
              <div
                @click="$router.push({ name: item.routeName })"
                class="flex cursor-pointer items-center gap-[10px] font-normal text-[#495057] no-underline hover:text-primary"
              >
                <span :class="item.icon"></span>
                <span class="font-body text-sm font-medium duration-500" v-show="isSidebarOpen">{{
                  item.name
                }}</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Bottom -->
        <div v-show="isSidebarOpen">
          <!-- DIVIDER -->
          <div v-show="isSidebarOpen" class="h-[0.5px] w-full bg-[#D1D5DB]"></div>

          <!-- WORKSPACE -->
          <!-- Account -->
          <div class="relative p-3">
            <p class="pb-2 text-sm font-medium">Không gian làm việc</p>
            <div>
              <a-popover trigger="click" placement="right">
                <template #content>
                  <div class="flex-col flex gap-2">
                    <span
                      v-for="workspace in workspaceStore.listWorkspaceOfUser"
                      :key="workspace.workspaceId"
                      @click="switchWorkspace(workspace)"
                      class="cursor-pointer hover:text-red-500"
                    >
                      {{ workspace.name }}
                    </span>
                  </div>
                </template>
                <button
                  class="flex items-center gap-2"
                  type="button"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  @click="showWorkspaceList = !showWorkspaceList"
                >
                  <div
                    class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <img class="size-5 rounded-full" :src="authStore.avatarUrl" alt="" />
                  </div>
                  <span class="text-sm font-normal hover:text-primary">{{ workspaceStore.name }}</span>
                  <RetweetOutlined />
                </button>
              </a-popover>
            </div>
          </div>

          <!-- DIVIDER -->
          <div v-show="isSidebarOpen" class="h-[0.5px] w-full bg-[#D1D5DB]"></div>

          <!-- Account -->
          <div class="p-[14px]">
            <div class="flex items-center gap-2.5">
              <div
                class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <img class="size-7 rounded-full" :src="authStore.avatarUrl" alt="avatar" />
              </div>
              <a-popover placement="top" trigger="click">
                <template #content>
                  <div class="mb-3 flex items-center gap-2 hover:text-primary">
                    <UserOutlined />
                    <p
                      @click="router.push({ path: '/profile' })"
                      class="font-bold hover:cursor-pointer"
                    >
                      Thông tin cá nhân
                    </p>
                  </div>
                  <div class="flex items-center gap-2 hover:text-primary">
                    <SettingOutlined />
                    <p
                      @click="router.push({ path: '/setting' })"
                      class="font-bold hover:cursor-pointer"
                    >
                      Cài đặt
                    </p>
                  </div>
                </template>
                <span class="mr-2 text-base font-semibold hover:text-primary">{{
                  authStore.name
                }}</span>
              </a-popover>
              <button
                @click="logout"
                class="flex items-center rounded-full border border-[#E2E8F0] p-1"
              >
                <i class="pi pi-sign-out h-5 w-5"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import sidebarItems from '../../constants/sidebarItems.js'
import PrimaryButton from '../Button/PrimaryButton.vue'
PrimaryButton
import { useRouter } from 'vue-router'
import { SettingOutlined, UserOutlined, RetweetOutlined } from '@ant-design/icons-vue'
import { useAuthStore } from '@/stores/auth.store.js'
import { useWorkspaceStore } from '@/stores/workspace.store.js'

const percent = computed(() => (current.value / total.value) * 100);

const workspaceStore = useWorkspaceStore()
const authStore = useAuthStore()

const current = ref(workspaceStore.creditCodes.usedCredits);
const total = ref(workspaceStore.creditCodes.totalCredits);

const switchWorkspace = (workspace) => {
  workspaceStore.switchWorkspace(workspace);
  router.push({ path: '/dashboard' })
};

const router = useRouter()

const isSidebarOpen = ref(true)
const showWorkspaceList = ref(false)

const logout = () => {
  localStorage.removeItem('ai-marketing-token')
  router.push({ path: '/login' })
}

const clickWorkSpace = () => {
  showWorkspaceList.value = !showWorkspaceList.value
}

const clickArrowButton = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<style>
.side-bar-open {
  max-width: 260px;
  min-width: 260px;
}

.side-bar-close {
  max-width: 60px;
  min-width: 60px;
}

#side-bar {
  transition: 300ms;
}

.wrapper-progress .ant-progress-outer{
  width: 90% !important;
}
</style>