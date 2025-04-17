<template>
  <div class="mt-3 flex w-full gap-3 px-3">
    <div class="prompt w-1/2">
      <div class="parameter-template w-full rounded-xl border bg-white px-3 py-3">
        <label class="mb-2 block text-sm font-semibold text-gray-800"
          >Mẫu tham số
          <custom-tooltip
            title="Chọn mẫu tham số để điền vào prompt. Mẫu tham số sẽ tự động thay thế biến trong prompt."
            :is-show-question-icon="true"
          >
          </custom-tooltip>
        </label>
        <div class="flex items-center gap-2 pt-2">
          <a-checkbox v-model:checked="autoFillData.hasProductFields" @click="updateProductFields"
            >Sản phẩm
          </a-checkbox>
          <a-checkbox v-model:checked="autoFillData.hasBrandFields" @click="updateBrandFields"
            >Thương hiệu</a-checkbox
          >
        </div>
      </div>
      <div class="prompt mt-3 rounded-xl border border-gray-300 bg-white px-3">
        <div class="prompt__header flex items-center justify-between py-3 text-sm font-semibold">
          <div>
            Câu lệnh hệ thống (Prompt)
            <custom-tooltip
              title="Prompt hướng dẫn AI phản hồi với hướng dẫn và ràng buộc.           
                Chèn biến như {{ input }}. Prompt này sẽ không hiển thị cho người dùng."
              :is-show-question-icon="true"
            >
            </custom-tooltip>
          </div>
          <OptimizePromptModal />
        </div>
        <ContentEditable />
      </div>
      <primary-button class="mt-3" @click="handleChangeTab(1)">
        <template #label> Fill data </template>
      </primary-button>
    </div>
    <div class="input-parameters w-1/2 rounded-xl border border-gray-300 bg-white p-3">
      <div class="flex justify-between">
        <div class="text-sm font-semibold">
          Tham số đầu vào
          <custom-tooltip
            title="Người dùng điền biến vào một biểu mẫu, tự động thay thế biến trong prompt"
            :is-show-question-icon="true"
          >
          </custom-tooltip>
        </div>
        <a-button @click="addParam">
          <span class="font-semibold"> <i class="pi pi-plus me-1 text-xs"></i> Thêm </span>
        </a-button>
      </div>
      <div v-show="params.length" class="pt-2">
        <a-table
          :columns="tableConfig"
          :data-source="params"
          :pagination="false"
          :scroll="{ x: 'max-content' }"
          size="small"
          bordered
        >
          <template #headerCell="{ column }">
            <span class="text-xs text-gray-500">
              {{ column.title }}
            </span>
          </template>
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.dataIndex == 'key'">
              <a-input
                v-model:value="record.paramKey"
                placeholder="Key"
                spellcheck="false"
                @change="validateDuplicateParam(record.paramKey, index)"
              />
            </template>
            <template v-else-if="column.dataIndex == 'name'">
              <a-input
                v-model:value="record.name"
                placeholder="Parameter name"
                spellcheck="false"
              />
            </template>
            <template v-else-if="column.dataIndex == 'isRequired'">
              <a-switch v-model:checked="record.isRequired" />
            </template>
            <template v-else>
              <div class="flex justify-around">
                <SettingOutlined class="cursor-pointer" />
                <i class="pi pi-trash cursor-pointer" @click="deleteParam(index)"> </i>
              </div>
            </template>
          </template>
        </a-table>
      </div>
      <div v-show="!params.length" class="py-2 text-sm">
        <p v-pre>
          Biến cho phép người dùng giới thiệu prompt hoặc lời mở đầu khi điền vào biểu mẫu. Bạn có
          thể thử nhập {{ input }} vào trong prompt.
        </p>
      </div>
    </div>
    <ErrorDialog v-bind="dialogState" />
  </div>
</template>
<script setup>
import { inject, ref, reactive, provide } from 'vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import { PromptParam } from '@/models/prompt-param.model'
import { brandFields, productFields } from '@/constants/fields'
import { message } from 'ant-design-vue'
import PrimaryButton from '@/components/Button/PrimaryButton.vue'
import ContentEditable from '@/components/ContentEditable.vue'
import ErrorDialog from '@/components/Dialog/ErrorDialog.vue'
import debounce from 'lodash.debounce'
import CustomTooltip from '@/components/Tooltip/CustomTooltip.vue'
import OptimizePromptModal from '@/components/Modal/OptimizePromptModal.vue'

const { params, autoFillData, handleChangeTab } = inject('configurationMode')
const tableConfig = [
  {
    title: 'KHÓA BIẾN',
    dataIndex: 'key',
    width: '30%'
  },
  {
    title: 'TÊN THAM SỐ ĐẦU VÀO',
    dataIndex: 'name',
    width: '40%'
  },
  {
    title: 'BẮT BUỘC',
    dataIndex: 'isRequired',
    width: '14%'
  },
  {
    title: 'HÀNH ĐỘNG',
    dataIndex: 'action',
    width: '16%'
  }
]

const dialogState = reactive({
  isOpen: false,
  title: 'Invalid Information',
  content: '',
  handleCancel: () => {},
  handleOk: () => {}
})
const optimizedPrompt = ref(undefined)

const mergeParams = (existingParams, additionalParams) => {
  const mergedParams = [...existingParams]
  additionalParams.forEach((newParam) => {
    if (!existingParams.some((currentParam) => newParam === currentParam.paramKey)) {
      mergedParams.push(new PromptParam(newParam))
    }
  })
  return mergedParams
}
const removeParams = (existingParams, paramsToRemove) => {
  return existingParams.filter((param) => !paramsToRemove.includes(param.paramKey))
}
const toggleParamTemplate = (templateKey, paramList) => {
  autoFillData[templateKey] = !autoFillData[templateKey]
  params.value = autoFillData[templateKey]
    ? mergeParams(params.value, paramList)
    : removeParams(params.value, paramList)
}

const addParam = () => {
  params.value.push(new PromptParam(''))
}
const deleteParam = (index) => {
  params.value.splice(index, 1)
}
const updateBrandFields = () => {
  toggleParamTemplate('hasBrandFields', brandFields)
}
const updateProductFields = () => {
  toggleParamTemplate('hasProductFields', productFields)
}

const checkDuplicateParam = (paramKey, index) => {
  return params.value.some((param, i) => param.paramKey == paramKey && i != index)
}
const validateDuplicateParam = debounce((paramKey, index) => {
  if (checkDuplicateParam(paramKey, index))
    message.error(`Khóa biến ${paramKey} đã tồn tại. Vui lòng chọn khóa biến khác.`, 5)
}, 500)
const hasEmptyParams = () => {
  return params.value.some((param) => param.paramKey === '')
}

const showValidationDialog = (content, resolveValue, resolve) => {
  Object.assign(dialogState, {
    content,
    isOpen: true,
    handleCancel: () => {
      dialogState.isOpen = false
      resolve(false)
    },
    handleOk: () => {
      dialogState.isOpen = false
      resolve(resolveValue)
    }
  })
}
const validateData = () => {
  return new Promise((resolve) => {
    if (hasEmptyParams()) {
      showValidationDialog(
        'Những tham số không có khóa biến sẽ không thể tự thay thế biến trong prompt. Bạn có muốn tiếp tục?',
        true,
        resolve
      )
      return
    }

    for (const index in params.value) {
      const paramKey = params.value[index].paramKey
      if (checkDuplicateParam(paramKey, index)) {
        showValidationDialog(
          `Khóa biến ${paramKey} bị trùng lặp. Vui lòng thay đổi khóa biến để tiếp tục.`,
          false,
          resolve
        )
        return
      }
    }

    resolve(true)
  })
}

defineExpose({ validateData })
provide('optimizedPrompt', optimizedPrompt)
</script>
<style scoped></style>
