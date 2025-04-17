<template>
  <div class="px-10 pt-5 pb-6">
    <div class="mb-5 flex flex-wrap justify-end items-center gap-3">
      <a-input
        class="w-full md:w-auto border-[rgb(249,115,22)]"
        placeholder="Tìm kiếm"
        v-model:value="searchQuery"
        @change="handleSearch"
      />
    </div>

    <div>
      <div class="mb-2 flex flex-wrap justify-between items-center">
        <div class="flex gap-3 items-center">
          <h4 class="text-xl font-bold">Các BotAI đã sử dụng gần đây</h4>
          <HistoryOutlined class="text-red-900" />
        </div>
        <div class="flex flex-wrap gap-5 items-center mr-3">
          <span class="font-bold text-xs w-full sm:w-auto">Sắp xếp theo</span>
          <div class="flex items-center gap-1 w-full sm:w-auto">
            <span class="text-xs">Tên</span>
            <SortAscendingOutlined v-if="sort === 'ascend'" @click="sortName" class="cursor-pointer hover:text-red-600" />
            <SortDescendingOutlined v-else @click="sortName" class="cursor-pointer hover:text-red-600" />
          </div>
          <div class="flex items-center gap-1 w-full sm:w-auto">
            <span class="text-xs">Sử dụng gần nhất</span>
            <SortDescendingOutlined v-if="sortdate === 'descend'" @click="sortDate" class="cursor-pointer hover:text-red-600" />
            <SortAscendingOutlined v-else @click="sortDate" class="cursor-pointer hover:text-red-600" />
          </div>
        </div>

      </div>
      <div>
        <div class="flex flex-wrap gap-5">
          <div v-for="(bot, i) in filteredBotList" class="flex w-full flex-col gap-5 md:w-[calc(50%-1rem)] lg:w-[calc(20%-1rem)]">
            <BotCard
              :key="i"
              :botId="bot.botId"
              :name="bot.name"
              :description="bot.description"
              :project-name="bot.projectName"
              :route-name="bot.routeName"
              :updatedAt="bot.updatedAt"
              v-model:favorite="bot.favorite"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <div class="mb-2 flex flex-wrap justify-between items-center">
        <div class="flex gap-3 items-center">
          <h4 class="text-xl font-bold">Danh sách BotAI yêu thích của bạn</h4>
          <HeartFilled class="text-red-500" />
        </div>
        <!-- <div class="flex gap-5 items-center mr-3">
          <span class="font-bold text-xs w-full sm:w-auto">Sắp xếp theo</span>
          <div class="flex items-center gap-1">
            <span class="text-xs">Tên</span>
            <SortAscendingOutlined class="cursor-pointer hover:text-red-600" />
            <SortDescendingOutlined/>
          </div>
        </div> -->
      </div>
      <div>
        <div class="flex flex-wrap gap-5">
          <div v-for="(bot, i) in filteredBotList" class="flex w-full flex-col gap-5 md:w-[calc(50%-1rem)] lg:w-[calc(20%-1rem)]">
            <BotCard
              :key="i"
              :botId="bot.botId"
              :name="bot.name"
              :description="bot.description"
              :project-name="bot.projectName"
              :route-name="bot.routeName"
              :updatedAt="bot.updatedAt"
              v-model:favorite="bot.favorite"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, computed } from 'vue';
import { HistoryOutlined, HeartFilled, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons-vue';
import { useLoadingStore } from '@/stores/loading.store';
import BotCard from '@/components/Card/BotCard.vue';

const searchQuery = ref('');

const filteredBotList = computed(() => {
  if (!searchQuery.value.trim()) {
    return botList.value;
  }
  return botList.value.filter(bot => {
    const searchString = searchQuery.value.toLowerCase();
    return (
      bot.name.toLowerCase().includes(searchString) || 
      bot.description.toLowerCase().includes(searchString)
    );
  });
});

//Data test
const generateRandomTime = (maxDays = 30) => {
  const randomDaysOffset = Math.floor(Math.random() * maxDays);
  const date = new Date();
  date.setDate(date.getDate() - randomDaysOffset);
  
  return date.toISOString();
};

const botList = ref([
  {
    botId: '1',
    name: 'Quảng cáo nước hoa chính hãng Herspace',
    description: 'Viết kịch bản video quảng cáo câu chuyện, cảnh quay, lời dẫn, nhịp độ',
    projectName: 'Hệ thống báo cháy từ xa thông minh, tiên tiến, hiện đại bậc nhất',
    routeName: 'Bot Social Detail',
    updatedAt: generateRandomTime(),
    favorite: false
  },
  {
    botId: '2',
    name: 'Quảng cáo sản phẩm chăm sóc da mới nhất',
    description: 'Tạo chiến lược quảng cáo cho sản phẩm chăm sóc da nổi bật',
    projectName: 'Ứng dụng kết nối người dùng với chuyên gia da liễu',
    routeName: 'Bot Social Detail',
    updatedAt: generateRandomTime(),
    favorite: true
  },
  {
    botId: '3',
    name: 'Quảng cáo du lịch đến Nhật Bản',
    description: 'Lên kế hoạch video quảng cáo cho chuyến du lịch Nhật Bản',
    projectName: 'Website đặt tour du lịch quốc tế',
    routeName: 'Bot Social Detail',
    updatedAt: generateRandomTime(),
    favorite: false
  },
  {
    botId: '4',
    name: 'Quảng cáo dịch vụ chăm sóc sức khỏe online',
    description: 'Thiết kế quảng cáo cho dịch vụ y tế trực tuyến',
    projectName: 'Nền tảng chăm sóc sức khỏe từ xa',
    routeName: 'Bot Social Detail',
    updatedAt: generateRandomTime(),
    favorite: true
  },
  {
    botId: '5',
    name: 'Quảng cáo khóa học lập trình Python',
    description: 'Tạo kịch bản quảng cáo cho khóa học lập trình Python trực tuyến',
    projectName: 'Học viện lập trình viên quốc tế',
    routeName: 'Bot Social Detail',
    updatedAt: generateRandomTime(),
    favorite: false
  }
]);

const loadingStore = useLoadingStore()

const favorite = ref(false)
const sort = ref('ascend')
const sortdate = ref('descend');

onBeforeMount(() => {
  loadingStore.setIsLoading(false)
})

const sortName = () => {
  sort.value = sort.value === 'ascend' ? 'descend' : 'ascend';
};

const sortDate = () => {
  sortdate.value = sortdate.value === 'descend' ? 'ascend' : 'descend';
};

const sortedData = computed(() => {
  let sorted = [...filteredBotList.value];
  
  // Sắp xếp theo tên
  sorted = sorted.sort((a, b) => {
    if (sort.value === 'ascend') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  // Sắp xếp theo thời gian sử dụng gần nhất
  sorted = sorted.sort((a, b) => {
    if (sortdate.value === 'descend') {
      return b.updatedAt - a.updatedAt;
    } else {
      return a.updatedAt - b.updatedAt;
    }
  });

  return sorted;
});
</script>