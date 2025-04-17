<template>
  <div>
    <primary-button class="text-medium h-8" @click.enter="isModalVisible = true">
      <template #label>Add Member</template>
    </primary-button>
    <a-modal
      width="50vw"
      v-model:open="isModalVisible"
      :title="modalTitle"
      :closable="false"
      centered
    >

      <div>
        <div class="mb-1 mt-1 font-semibold">
          Please enter the email below<span class="text-xl text-red-500"> *</span>
        </div>
        <a-input v-model:value="enterEmail" spellcheck="false" :placeholder="Email" />
      </div>
      <template #footer>
        <div class="mt-4 flex justify-end gap-1">
          <CancelButton key="cancel" @click.enter="isModalVisible = false" />
          <primary-button
            :class="[
              !isValidData ? 'opacity-50' : '',
              !isValidData || confirmLoading ? 'cursor-not-allowed' : ''
            ]"
            danger
            @click.enter="handleAdd"
            ><template #label>
              <a-spin :indicator="loadingSpinner" v-show="confirmLoading" /> Add
            </template>
          </primary-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, h, computed, onBeforeUpdate } from 'vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import CancelButton from '@/components/Button/CancelButton.vue'
import PrimaryButton from '@/components/Button/PrimaryButton.vue'
import { getUserByEmail } from '@/services/user.service'
import { getWorkspaceById } from '@/services/project.service'
import { addMemberToWorkspace } from '@/services/workspace-member.service'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const props = defineProps({ type: String, projectName: String })
const emits = defineEmits(['submit'])
const isModalVisible = defineModel('isModalVisible')

const loadingSpinner = h(LoadingOutlined, {
  class: '!flex text-white !text-[18px] items-center',
  spin: true
})
// const workspace = ref({})
const confirmLoading = ref(false)
const enterEmail = ref('')
const isValidData = computed(() => {
  if (!props.projectName) return true
  return enterEmail.value.trimEnd() === props.projectName.trimEnd()
})
const modalTitle = 'Add new member to workspace'

onBeforeUpdate(async () => {
  enterEmail.value = ''
})

const handleAdd = async () => {
  const userRes = await getUserByEmail(enterEmail.value)
  const workspaceRes = await getWorkspaceById()
  const data = {
    workspace: workspaceRes.data,
    user: userRes.data,
    role: "MEMBER"
  }
  console.log(data)
  try {
    addMemberToWorkspace(data)
    toast.success("Add Member Succesfully", {
        autoClose: 1500,
    });
  } catch(error) {
    console.log(error)
  } finally {
    window.reload();
  }
}
</script>
