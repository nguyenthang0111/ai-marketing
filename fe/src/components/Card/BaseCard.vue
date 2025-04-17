<template>
  <div
    class="card cursor-pointer rounded-lg border bg-white p-4 hover:shadow-lg"
    @click="$emit('viewDetail')"
  >
    <div class="flex min-h-20 justify-between">
      <div class="w-10/12 pe-2">
        <p class="w-full truncate text-base font-semibold">{{ name }}</p>
        <p class="description w-full overflow-hidden text-sm font-normal">
          {{ description }}
        </p>
      </div>
      <DefaultIcon class="h-1/3 w-2/12 rounded-lg" />
    </div>
    <custom-tooltip
      v-if="projectName"
      placement="topLeft"
      :title="projectName"
    >
      <div class="project-name">
        <span class="text-xs text-primary">Dự án: </span>
        <span class="font-sans text-xs">{{ projectName }}</span>
      </div>
    </custom-tooltip>
    <div class="mt-4 flex items-center justify-between">
      <h6 class="text-xs font-normal text-dark-gray">
        Edited
        {{ formattedDate }}
      </h6>
      <div class="flex gap-1">
        <custom-tooltip :title="favorite ? 'Remove from favorite list' : 'Add to favorite list'">
          <transition :name="favorite ? 'pulse' : null" mode="out-in">
            <component
              v-if="favorite != undefined"
              :is="favorite ? StarFilled : StarOutlined"
              class="rounded-lg border bg-gray-100 p-1 text-lg hover:bg-gray-200"
              :class="favorite ? 'text-warning' : ''"
              @click="
                (e) => {
                  e.stopPropagation()
                  $emit('handleChangeFavorite')
                }
              "
            />
          </transition>
        </custom-tooltip>

        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click="(e) => e.stopPropagation()">
            <MoreOutlined class="rounded-lg border bg-gray-100 p-1.5 hover:bg-gray-200" />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <h6 class="text-sm font-semibold" @click="$emit('handleQuickEdit')">Quick edit</h6>
              </a-menu-item>
              <!-- <a-menu-item>
                <h6 class="text-sm font-semibold" @click="$emit('handleDuplicate')">Duplicate</h6>
              </a-menu-item>
              <a-menu-item>
                <h6 class="text-sm font-semibold">Migrate</h6>
              </a-menu-item> -->
              <a-menu-item>
                <h6 class="text-sm font-semibold text-danger" @click="$emit('handleDelete')">
                  Delete
                </h6>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { StarFilled, StarOutlined, MoreOutlined } from '@ant-design/icons-vue'
import DefaultIcon from '../Icon/DefaultIcon.vue'
import CustomTooltip from '../Tooltip/CustomTooltip.vue'

const props = defineProps({
  name: String,
  description: String,
  updatedAt: String,
  projectName: String,
  favorite: undefined
})

const formattedDate = computed(() => {
  return new Date(props.updatedAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
})
const emits = defineEmits([
  'viewDetail',
  'handleDelete',
  'handleQuickEdit',
  'handleDuplicate',
  'handleChangeFavorite'
])
</script>

<style scoped>
.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.project-name {
  max-height: 45px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.pulse-enter-active {
  animation: pulse 0.5s;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
