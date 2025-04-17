<template>
  <div class="px-4 md:px-6 lg:px-12">
    <div class="flex justify-between pt-4 pb-3">
      <h1 class="text-lg font-bold md:text-xl lg:text-2xl">Thư viện botAI</h1>
      
    </div>

    <div class="mb-4 mt-10">
      <!-- <div class="flex flex-wrap gap-4">
        <a-button class="active rounded-full bg-white font-medium hover:bg-[#bfa29b]"
          >Tất cả</a-button
        >
        <a-button class="rounded-full bg-white font-medium hover:bg-[#bfa29b]">Bot Social</a-button>
        <a-button class="rounded-full bg-white font-medium hover:bg-[#bfa29b]">Bot Web</a-button>
      </div> -->
    </div>

    <div class="flex flex-col gap-5">
      <div v-for="category in listCategory">
        <div 
          class="text-md mb-4 rounded-lg bg-gradient-to-r from-primary from-20% to-gray-50 to-50% px-2 py-1 font-semibold text-white"
        >
          {{ category }}
        </div>
        <div class="flex flex-wrap gap-5">
          <a-card 
            class="flex w-full flex-col gap-5 md:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)]"
            v-for="botLibrary in listBotLibrary.filter(bot => bot.type == category)"
          >
            <div class="flex">
              <img
                style="height: 36px; width: 36px; border-radius: 5px; margin-top: 6px"
                src="/src/assets/icon/default-icon.png"
                alt=""
              />
              <h3 class="ms-2 font-bold">
                {{ botLibrary.name }}
              </h3>
            </div>

            <div class="mt-3 text-xs">
              <span>{{ botLibrary.description }}</span>
            </div>

            <div class="mt-3">
              <AddBotLibraryModal :prompt="botLibrary.prompt"/>
            </div>
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useLoadingStore} from '@/stores/loading.store';
import PrimaryButton from '@/components/Button/PrimaryButton.vue'
import axios from 'axios';
import AddBotLibraryModal from '@/components/Modal/Create/AddBotLibraryModal.vue';

const loadingStore = useLoadingStore()
const listBotLibrary = ref([]);
const listCategory = ref([])

onBeforeMount(() => {
  fetchBotLibrary();
  fetchCategory();
})

const fetchBotLibrary = async () => {
  try {
    const response = await axios.get('http://localhost:8082/bot-library/all')
    listBotLibrary.value = response.data
  } catch (error) {
    console.error(error)
  } finally {
    loadingStore.setIsLoading(false)
  }
}

const fetchCategory = async () => {
  try {
    const response = await axios.get('http://localhost:8082/category/all')
    response.data.map(cate => (
      listCategory.value.push(cate.name)
    ))
  } catch (error) {
    console.error(error)
  } finally {
    loadingStore.setIsLoading(false)
  }
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.active {
  background-color: #eb9784;
}
</style>
