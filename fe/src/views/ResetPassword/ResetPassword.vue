<template>
    <div>
        <a-row type="flex" justify="center" align="middle" style="background:#ECECEC; height: 100vh; padding-bottom: 150px;">
    <a-col :md="6" :xs="24">
      <a-card style="border-radius: 5px;" class="m-2 shadow">
        <h1 class="text-2xl font-bold mb-5">Quên mật khẩu</h1>
        <div>
            <a-form
                :model="formResetPassword"
                name="basic"
                :label-col="{ span: 24 }"
                autocomplete="off"
                @finish="handleResetPassword"
                @finishFailed="onFinishFailed"
            >
                <a-form-item
                    label="Mật khẩu:"
                    name="newPassword"
                    :rules="[{required: true, message:'Please input new password!'}]"
                >
                    <a-input-password v-model:value="formResetPassword.newPassword" placeholder="Mật khẩu mới" />
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" class="w-full" html-type="submit">Đặt lại mật khẩu</a-button>
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
import { resetPassword } from '@/services/auth.service';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
let token = route.query.token

const formResetPassword = reactive({
    newPassword: '',
})

const handleResetPassword = async() => {
    const res = await resetPassword({
        token:token,
        newPassword:formResetPassword.newPassword
    })
    if(res.status === 201){
        router.push({name: 'Login'})
    }
}

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

</script>

<style scoped>

</style>