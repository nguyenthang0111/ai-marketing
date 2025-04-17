<template>
  <div class="mt-4 flex w-full gap-3 px-3">
    <div class="data h-fit w-1/2 rounded-lg border border-gray-300 bg-white p-3">
      <div v-show="autoFillData.hasBrandFields">
        <div class="brand label">
          Select brand
          <custom-tooltip title="Select a brand from the list" :is-show-question-icon="true">
          </custom-tooltip>
        </div>
        <a-select
          class="w-full"
          v-model:value="autoFillData.selectedBrandId"
          show-search
          allowClear
          placeholder="Select a brand from the list"
          :filter-option="filterOption"
          :options="brandOptions"
          @change="handleChangeBrand"
        ></a-select>
      </div>
      <div v-show="autoFillData.hasProductFields">
        <div class="product label">
          Select product
          <custom-tooltip title="Select a product from the list" :is-show-question-icon="true">
          </custom-tooltip>
        </div>
        <a-select
          class="w-full"
          v-model:value="autoFillData.selectedProductId"
          show-search
          allowClear
          placeholder="Select a product from the list"
          :filter-option="filterOption"
          :options="productOptions"
          @change="handleChangeProduct"
        ></a-select>
      </div>

      <Disclosure title="NHẬP GIÁ TRỊ THAM SỐ ĐẦU VÀO" disclosure-panel-custom="px-4" class="mt-4" v-model:isCollapsed="isCollapsedParameter">
        Điền giá trị của biến, sẽ được tự động thay thế trong từ nhắc mỗi khi một câu hỏi được gửi.
        <div class="my-3 flex justify-between">
          <custom-tooltip title="Reset all params data to empty">
            <a-button default @click="resetParamsData">Reset</a-button>
          </custom-tooltip>
          <custom-tooltip title="Collapse all params">
            <a-button default @click="collapseAllParams">Collapse all</a-button>
          </custom-tooltip>
        </div>
        <div v-for="param in params" :key="param.paramKey">
          <Disclosure
            v-show="param.paramKey != ''"
            class="mt-2"
            :title="param.name"
            :paramKey="param.paramKey"
            v-model:isCollapsed="param.isCollapsed"
          >
            <a-textarea
              :id="param.paramKey"
              :placeholder="param.name + (param.isRequired ? ' (Bắt buộc)' : '')"
              :auto-size="{ minRows: 4 }"
              spellcheck="false"
              v-model:value="param.value"
            />
          </Disclosure>
        </div>
      </Disclosure>
    </div>
    <div class="option h-fit w-1/2 rounded-lg border border-gray-300 bg-white p-3">
      <div class="custom-content label">Custom content</div>
      <a-textarea
        v-model:value="contentFormat.customContent"
        allowClear
        placeholder="It will add novelty to your article."
        :auto-size="{ minRows: 5 }"
      />

      <div class="model label">
        Model
        <custom-tooltip title="" :is-show-question-icon="true"> </custom-tooltip>
      </div>
      <a-select
        class="w-full"
        v-model:value="contentFormat.model"
        :options="modelOptions"
      ></a-select>

      <div class="creativity-level label">
        Level of creativity
        <custom-tooltip title="" :is-show-question-icon="true"> </custom-tooltip>
      </div>
      <a-select
        class="w-full"
        v-model:value="contentFormat.creativityLevel"
        :options="levelOptions"
      ></a-select>

      <div class="length label">Length</div>
      <a-select
        class="w-full"
        v-model:value="contentFormat.length"
        :options="lengthOptions"
      ></a-select>

      <div class="tone label">Tone</div>
      <a-select class="w-full" v-model:value="contentFormat.tone" :options="toneOptions"></a-select>

      <div class="language label">Language</div>
      <a-select
        class="mb-3 w-full"
        v-model:value="contentFormat.language"
        show-search
        allowClear
        placeholder="Select a language for the article"
        :filter-option="filterOption"
        :options="languageOptions"
      ></a-select>

      <a-checkbox v-model:checked="contentFormat.useEmoji">Use emoji</a-checkbox>
      <a-checkbox v-model:checked="contentFormat.useMarkdown">Use markdown</a-checkbox>

      <div class="mt-3 flex justify-end">
        <primary-button @click="previewContent">
          <template #label> Preview content </template>
        </primary-button>
      </div>
    </div>

    <ErrorDialog v-bind="dialogState" />
  </div>
</template>
<script setup>
import { computed, inject, reactive, ref, watch } from 'vue'
import {
  modelOptions,
  levelOptions,
  lengthOptions,
  toneOptions,
  languageOptions,
  filterOption
} from '@/constants/selectBoxOptions'
import { brandFieldMapping, productFieldMapping } from '@/constants/fields'
import { generateContent } from '@/services/llm.service'
import PrimaryButton from '@/components/Button/PrimaryButton.vue'
import ErrorDialog from '@/components/Dialog/ErrorDialog.vue'
import Disclosure from '@/components/Disclosure/Disclosure.vue'
import ContentFormat from '@/models/content-format.model'
import CustomTooltip from '@/components/Tooltip/CustomTooltip.vue'

const { params, handleChangeTab, autoFillData, isGeneratingContent, content, prompt } =
  inject('configurationMode')

const contentFormat = reactive(new ContentFormat())
const brandOptions = computed(() =>
  autoFillData.brands.map((brand) => ({ label: brand.name, value: brand.name, data: brand }))
)
const productOptions = computed(() =>
  autoFillData.products.map((product) => ({
    label: product.name,
    value: product.name,
    data: product
  }))
)
const dialogState = reactive({
  isOpen: false,
  title: 'Invalid Information',
  content: '',
  handleOk: () => closeDialog(),
  handleCancel: () => closeDialog()
})
const focusedParamId = ref('')
const isCollapsedParameter = ref(false)

watch(
  () => dialogState.isOpen,
  (isOpen) => {
    if (!isOpen) {
      setTimeout(() => document.getElementById(focusedParamId.value)?.focus(), 300)
    }
  }
)

const handleChangeBrand = (value, option) => {
  if (!value) return

  const brandData = option.data
  for (const param of params.value) {
    if (brandFieldMapping[param.paramKey]) {
      param.value = brandData[brandFieldMapping[param.paramKey]]
      isCollapsedParameter.value = false
      param.isCollapsed = false
    }
  }
}
const handleChangeProduct = (value, option) => {
  if (!value) return

  const productData = option.data
  for (const param of params.value) {
    if (productFieldMapping[param.paramKey]) {
      param.value = productData[productFieldMapping[param.paramKey]]
      isCollapsedParameter.value = false
      param.isCollapsed = false
    }
  }
}
const resetParamsData = () => {
  autoFillData.selectedBrandId = undefined
  autoFillData.selectedProductId = undefined
  
  for (const param of params.value) {
    param.value = ''
  }
}
const collapseAllParams = () => {
  for (const param of params.value) {
    param.isCollapsed = true
  }
}

const validateData = () => {
  for (const param of params.value) {
    if (param.isRequired && param.value === '') {
      isCollapsedParameter.value = false
      param.isCollapsed = false
      focusedParamId.value = param.paramKey

      Object.assign(dialogState, {
        content: `Please fill in the information for the param '${param.name}'`,
        isOpen: true
      })
      return false
    }
  }

  if (!contentFormat.language) {
    Object.assign(dialogState, {
      content: 'Please select a language for the article',
      isOpen: true
    })
    return false
  }

  return true
}
const replacePlaceholders = (prompt) => {
  for (const param of params.value) {
    const placeholder = new RegExp(`{{${param.name}}}`, 'g')
    prompt = prompt.replace(placeholder, param.value)
  }
  return prompt
}
const generateArticleContent = async () => {
  try {
    const processedPrompt = replacePlaceholders(prompt.value)
    content.value = (await generateContent(processedPrompt, contentFormat)).data
  } catch (error) {
    console.error(error)
  } finally {
    isGeneratingContent.value = false
  }
}
const previewContent = () => {
  if (!validateData()) return 

  generateArticleContent()
  isGeneratingContent.value = true
  handleChangeTab(2)
}
const closeDialog = () => {
  dialogState.isOpen = false
}

</script>
<style scoped>
.label {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
  margin-top: 16px;
}
</style>
