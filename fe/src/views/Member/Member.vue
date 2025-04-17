<template>
  <div class="p-6">
    <header class="pb-5">
      <div class="flex justify-between">
        <h1 class="text-xl font-semibold">Danh sách thành viên</h1>
        <AddMemberModal />
      </div>
    </header>

    <div class="card">
      <div class="card-body">
          <!-- List Category :to="{ path: '/list-category/'+toRaw(record).categoryId+'/edit' }" -->
          <div>
            <a-table bordered :dataSource="listMember" :columns="columns">
              <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'operation'">
                  <div class="flex gap-2">
                    <div @click="notify" href="" class="cursor-pointer">
                      <Icon icon="mdi:edit-circle" width="30" height="30" class="text-info" />
                    </div>
                    <div class="cursor-pointer" @click="deleteMember(record)">
                      <CloseOutlined class="text-danger"/>
                    </div>
                  </div>
                </template>
              </template>
            </a-table>
          </div>
        </div>
      </div>
    
  </div>
</template>

<script setup>
import { onBeforeMount,ref } from 'vue';
import { getAllWorkspaceMember } from '@/services/project.service';
import { useLoadingStore } from '@/stores/loading.store'
import { CloseOutlined } from '@ant-design/icons-vue';
import AddMemberModal from '@/components/Modal/Create/AddMemberModal.vue';

const loadingStore = useLoadingStore()

const listMember = ref([]);
const confirmModalVisible = ref(false)

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '30%',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: '30%',
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '20%',
    },
  ];

onBeforeMount(() => {
  // loadingStore.setIsLoading(false)
  fetchTest();
})

const handleDeleteProject = async () => {
  try {
    await deleteProject(props.projectId)
    
    projects.value = projects.value.filter((project) => project.projectId !== props.projectId)
    confirmModalVisible.value = false
  } catch (error) {
    console.error(error)
  }
}
// Submit delete category
const deleteMember = (record) => {
    console.log(record)
    // const selected = toRaw(record);
    // const id = selected.categoryId;
    // if (confirm('Bạn có chắc chắn muốn xóa category này không?')) {
    //   axios.delete('http://localhost:8081/category/' + id)
    //   .then((res) => {
    //     console.log(res);
    //     window.location.reload();
    //   })
    // }
  }

const fetchTest = async() => {
    try {
        const response = await getAllWorkspaceMember();
        console.log(response.data)
        listMember.value = response.data;
    } catch (error) {
        console.error(error)
    } finally {
    loadingStore.setIsLoading(false)
  }
}
</script>

<style>
.card {
  margin-bottom: 24px;
  box-shadow: 0 0 .875rem #2930420d;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 0.25rem;
  word-wrap: break-word;
  min-width: 0;
  position: relative;
  display: flex;
  flex-direction: column;
}

.card-body {
  flex: 1 1 auto;
  padding: 1.25rem 1.25rem;
}
</style>