<template>
    <div>
        <section class="h-screen" style="background: linear-gradient(135deg, rgba(255, 177, 104, 0.24), rgba(255, 215, 164, 0.5), rgba(255, 177, 104, 0.8))">
            <div class="container mx-auto py-5 h-full">
                <div class="flex justify-center items-center h-full">
                    <div class="w-full max-w-2xl">
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div class="flex">
                                <!-- Hình ảnh hoặc phần tử bên trái (ẩn trên thiết bị nhỏ) -->
                                <div class="hidden md:block md:w-1/2 overflow-hidden">

                                </div>
                                <!-- Phần tử bên phải -->
                                <div class="w-full md:w-1/2 flex items-center">
                                    <div class="p-6 lg:p-10 text-black w-full">
                                        <div class="flex items-center mb-3 pb-1">
                                            <i class="fas fa-cubes text-2xl mr-3" style="color: #ff6219;"></i>
                                            <span class="text-3xl font-bold">Logo</span>
                                        </div>

                                        <h5 class="font-semibold text-lg mb-3 pb-3 tracking-wide">
                                            {{ isRegistering ? 'Đăng nhập với email' : 'Đăng ký tài khoản' }}
                                        </h5>

                                        <a-form :model="formData" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }"
                                            autocomplete="off" @finish="handleSubmit" @finishFailed="onFinishFailed">
                                            <a-form-item v-if="!isRegistering" label="Name" name="name" :rules="[{ required: true, message: 'Please enter your username!' }]">
                                                <a-input v-model:value="formData.name" />
                                            </a-form-item>
                                            <a-form-item label="Email" name="email"
                                                :rules="[{ required: true, message: 'Please enter your email!' }]">
                                                <a-input v-model:value="formData.email" />
                                            </a-form-item>
                                            <a-form-item label="Password" name="password"
                                                :rules="[{ required: true, message: 'Please enter your password!' }]">
                                                <a-input-password v-model:value="formData.password" />
                                            </a-form-item>
                                            <div v-if="isRegistering" class="flex mb-5">
                                                <span @click="router.push({name:'ForgetPassword'})" class="text-xs text-red-500 cursor-pointer hover:text-blue-600">Quên mật khẩu</span>
                                            </div>
                                            <a-form-item>

                                                <a-button class="w-full bg-[#ffb1168a] border-yellow-600"
                                                    html-type="submit">
                                                    <span class="font-semibold">
                                                        {{ isRegistering ? 'Đăng nhập' : 'Đăng ký' }}
                                                    </span>
                                                </a-button>
                                            </a-form-item>

                                            <div class="divider flex items-center my-4">
                                                <p class="text-center font-bold mx-3 mb-0 text-gray-400">OR</p>
                                            </div>

                                        </a-form>
                            

                                        <p class="mt-4 text-center text-gray-500" style="font-size: 14px;">
                                            {{ isRegistering ? 'Đã có tài khoản?' : 'Nếu chưa có tài khoản,' }}
                                            <a href="#" class="text-blue-500 font-normal"
                                                @click.prevent="toggleRegister">
                                                {{ isRegistering ? 'Đăng ký tại đây' : 'Đăng nhập tại đây' }}
                                            </a>
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { register, login } from '@/services/auth.service';
import { API_URL } from '@/utils/http';
const router = useRouter()

const isRegistering = ref(true);
const formData = reactive({
    name:'',
    email: '',
    password: ''
})

const handleSubmit = async () => {
    try {
        if (isRegistering.value) {
            const res =  await login({
                email: formData.email,
                password: formData.password,
            })
            console.log(res)
            if(res.status === 201){
                router.push({ name: 'Dashboard' });
            }
        } else {
            let response = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            if(response.status === 201){
                isRegistering.value = !isRegistering.value;
            }   
        }
    } catch (err) {
        console.error(err);
    }
};


const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

function toggleRegister() {
    isRegistering.value = !isRegistering.value;
}

function redirectToGoogle() {
    window.location.href = `${API_URL}/auth/google`;
}
</script>

<style scoped>
.divider:after,
.divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
}
.ant-form-item:nth-child(2) {
    margin-bottom: 5px !important;
}
</style>