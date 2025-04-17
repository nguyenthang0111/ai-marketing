<template>
    <div class="p-5">
        <a-card style="border-radius: 0;">
            <a-row :gutter="[16, 16]">
                <a-col :xs="24" :sm="24" :md="12" :lg="12">
                    <a-card style="border-radius: 0;">
                        <template #title>
                            <h3>Thông tin cá nhân</h3>
                        </template>
                        <div>
                            <span @click="triggerFileInput">
                                <a-avatar :size="64"
                                    :src="authStore.avatarUrl" />
                                <input type="file" ref="fileInputRef" @change="handleFileChange"
                                    style="display: none" />
                            </span>
                            <div class="mt-10">
                                <div>
                                    <span class="font-bold">Họ Tên</span>
                                    <div>
                                        <span v-if="!editInput">{{ authStore.name }}</span>
                                        <EditFilled v-if="!editInput" @click="editInput = true"
                                            class="text-yellow-500 hover:text-red-500 cursor-pointer ms-2" />
                                        <div v-if="editInput" class="flex justify-between items-center gap-2 mt-1">
                                            <a-input show-count :maxlength="20" :placeholder="authStore.name" v-model:value="name"
                                                style="border-color: #ffc527; height: 32px" />
                                            <a-button type="" class="custom-btn" @click="editInput = !editInput">
                                                Thoát
                                            </a-button>
                                            <a-button html-type="submit" class="custom-btn" @click="handleSave()">
                                                Lưu
                                            </a-button>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-5">
                                    <span class="font-bold">Email</span>
                                    <div>
                                        <span>{{ authStore.email }}</span>
                                    </div>
                                </div>
                                <a-popconfirm title="Bạn chắc chắn muốn xóa tài khoản của mình không?">
                                    <a-button type="danger" class="custom-btn mt-5">
                                        Xóa tài khoản
                                    </a-button>
                                </a-popconfirm>
                            </div>
                        </div>
                    </a-card>
                </a-col>

                <a-col :xs="24" :sm="24" :md="12" :lg="12">
                    <a-card style="border-radius: 0;">
                        <template #title>
                            <h3>Đổi mật khẩu</h3>
                        </template>
                        <div>
                            <a-form :model="formChangePw" :rules="formRules" :label-col="{ span: 8 }"
                                :wrapper-col="{ span: 16 }" @finish="handleChangePassword" @finishFailed="onFinishFailed">
                                <a-form-item label="Mật khẩu cũ" name="password">
                                    <a-input-password v-model:value="formChangePw.password" />
                                </a-form-item>
                                <a-form-item label="Mật khẩu mới" name="newPassword">
                                    <a-input-password v-model:value="formChangePw.newPassword" />
                                </a-form-item>
                                <a-form-item label="Xác nhận mật khẩu mới" name="reNewPassword">
                                    <a-input-password v-model:value="formChangePw.reNewPassword" />
                                </a-form-item>
                                <a-form-item :wrapper-col="{ offset: 10 }">
                                    <a-button type="" html-type="submit" class="custom-btn mt-10">
                                        Đổi mật khẩu
                                    </a-button>
                                </a-form-item>
                            </a-form>
                        </div>
                    </a-card>
                </a-col>
            </a-row>
        </a-card>
    </div>
</template>

<script setup>
import { EditFilled } from '@ant-design/icons-vue';
import { ref, reactive, onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { changePassword, updateUser } from '@/services/user.service';
import { fetchUserData } from '@/router/middleware';
import { useLoadingStore } from '@/stores/loading.store';

const authStore = useAuthStore()
const loadingStore = useLoadingStore()

const name = ref(authStore.name)

const formRules = {
    password: [{ required: true, message: 'Vui lòng không để trống!' }],
    newPassword: [{ required: true, message: 'Vui lòng không để trống!' }],
    reNewPassword: [
        { required: true, message: 'Vui lòng không để trống!' },
        {
            validator: (rule, value) => {
                if (value !== formChangePw.newPassword) {
                    return Promise.reject('Mật khẩu xác nhận không khớp!');
                }
                return Promise.resolve();
            },
        },
    ],
};

const editInput = ref(false);
const fileInputRef = ref(null)
const formChangePw = reactive({
    password: '',
    newPassword: '',
    reNewPassword: '',
});

onBeforeMount(() => {
    loadingStore.setIsLoading(false)
})

const triggerFileInput = () => {
    fileInputRef.value.click()
}
const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
        const formData = new FormData()
        formData.append('file', file)
    }
}

async function handleSave() {
  editInput.value = !editInput.value;
  await updateUser({
    name: name.value,
  }, authStore.userId)
  await fetchUserData()
}

const handleChangePassword = async () => {
    await changePassword({
        password: formChangePw.password,
        newPassword: formChangePw.newPassword,
    })
}

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
</script>

<style scoped>
.custom-btn {
    background-color: rgb(242, 90, 41);
    color: white;
    transition: all 0.3s;
}

.custom-btn:hover {
    background-color: #ffc527;
    color: black;
}
</style>