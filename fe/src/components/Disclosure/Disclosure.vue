<template>
  <Disclosure as="div" :default-open="true">
    <DisclosureButton
      class="flex w-full justify-between rounded-lg bg-orange-100 px-4 py-2 text-left text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/75"
      @click="toggleCollapse"
      @keydown.enter.prevent="toggleCollapse"
      @keydown.space.prevent="toggleCollapse"
    >
      <span>{{ title }}</span>
      <div class="h-5 w-5 text-orange-500">
        <i class="pi" :class="isCollapsed ? 'pi-chevron-up' : 'pi-chevron-down'"></i>
      </div>
    </DisclosureButton>
    <div v-show="!isCollapsed">
      <DisclosurePanel
        class="pb-2 pt-4 text-sm text-gray-500"
        :class="disclosurePanelCustom"
        :unmount="false"
        static
      >
        <slot> </slot>
      </DisclosurePanel>
    </div>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { nextTick } from 'vue'

const props = defineProps({ title: String, disclosurePanelCustom: String, paramKey: String })
const isCollapsed = defineModel('isCollapsed', { type: Boolean, default: false })

const toggleCollapse = async () => {
  isCollapsed.value = !isCollapsed.value
  await nextTick()
  if (!isCollapsed.value) document.getElementById(props.paramKey)?.focus()
}
</script>

<style scoped></style>
