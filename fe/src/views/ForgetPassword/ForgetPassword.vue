<template>
    <div>
        <a-row type="flex" justify="center" align="middle" style="background:#ECECEC; height: 100vh; padding-bottom: 150px;">
    <a-col :md="6" :xs="24">
      <a-card style="border-radius: 5px;" class="m-2 shadow">
        <h1 class="text-2xl font-bold mb-5">Quên mật khẩu</h1>
        <div>
            <a-form
                :model="formEmailSend"
                name="basic"
                :label-col="{ span: 24 }"
                autocomplete="off"
                @finish="handleSendMail"
                @finishFailed="onFinishFailed"
            >
                <a-form-item
                    label="Email:"
                    name="email"
                    :rules="[{required: true, message:'Please input email!'}]"
                >
                    <a-input v-model:value="formEmailSend.email" placeholder="Nhập email của bạn" />
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" class="w-full" html-type="submit">Gửi</a-button>
                </a-form-item>
            </a-form>
        </div>
      </a-card>
    </a-col>
  </a-row>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { forgetPassword } from '@/services/auth.service';
import { useRouter } from 'vue-router';

const router = useRouter()

const formEmailSend = reactive({
    email: '',
})

const handleSendMail = async() => {
    await forgetPassword({
        email: formEmailSend.email
    })
}

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

</script>

<style scoped>

</style>