<script setup>
import Logo from '@/assets/images/logo.svg'
import { useAuthStore } from '@/stores/authStore';
import { signInSchema } from '@/validations/auth';
import FormGroup from '@/components/Common/FormGroup.vue';
import { Input } from 'ant-design-vue'
import AppButton from '@/components/Common/AppButton.vue';
import { watch } from 'vue'
import { RouterLink } from 'vue-router';
import { encryptRSA, uint8ArrayToBase64 } from '@/utils/crypto';

const authStore = useAuthStore()

const handleSignInAccount = async (e) => {
    e.preventDefault()

    const isValidate = await validateAndSubmit()
    
    if (isValidate) {
        const payload = {
            Email: authStore.formSignIn.email,
            Password: authStore.formSignIn.password,
        }

        const dataDecode = await encryptRSA(authStore.publicKey, JSON.stringify(payload))
        const base64DecodeData = uint8ArrayToBase64(dataDecode);


        authStore.signInAccount(base64DecodeData)
    } 
}

const validateAndSubmit = async () => {
    try {
        // Kiểm tra lại toàn bộ form trước khi submit
        await signInSchema.validate(authStore.formSignIn, { abortEarly: false });
        return true
    } catch (err) {
        err.inner.forEach((error) => {
            authStore.errorSignIn[error.path] =  error.message
        });

        return false
    }
};
</script>

<template>
    <main
        class="flex w-full flex-col items-center bg-white dark:bg-navy-700 lg:max-w-md"
    >
        <div class="flex w-full max-w-sm grow flex-col justify-center p-5">
            <div class="text-center">
                <div class="mt-4">
                    <img
                        class="mx-auto mb-3 h-20 w-20 lg:hidden"
                        :src="Logo"
                        alt="logo"
                    />
                    <h2
                        class="text-2xl font-semibold text-slate-600 dark:text-navy-100"
                    >
                        Welcome Chat MeMoo
                    </h2>
                    <p class="text-slate-400 dark:text-navy-300">
                        Please sign in to continue
                    </p>
                </div>
            </div>
            <form class="mt-16 space-y-3" @submit="(e) => handleSignInAccount(e)">
                <!-- Input Email -->
                <FormGroup title="Email"  :errorText="authStore.errorSignIn.email">
                    <Input 
                        placeholder="Nhập email của bạn..."
                        name="email"
                        :value="authStore.formSignIn.email"
                        @change="(e) => {
                            authStore.formSignIn.email = e.target.value
                            authStore.errorSignIn.email = ''
                        }"
                    />
                </FormGroup>
                <FormGroup title="Mật Khẩu"  :errorText="authStore.errorSignIn.password">
                    <Input 
                        name="password"
                        type="password"
                        placeholder="Nhập mật khẩu..."
                        :value="authStore.formSignIn.password"
                        @change="(e) => {
                            authStore.formSignIn.password = e.target.value
                            authStore.errorSignIn.password = ''
                        }"
                    />
                </FormGroup>
                <div class="flex text-sm">
                    <label>Bạn chưa có tài khoản?</label>
                    <RouterLink to="/auth/sign-up" class="btn ml-2 underline cursor-pointer">Đăng ký</RouterLink>
                </div>
                <AppButton 
                    class="w-full" type="primary" 
                    :loading="authStore.isSignIn"
                    :onClick="(e) => {
                        handleSignInAccount(e)
                    }"
                >
                    Đăng Nhập
                </AppButton>
            </form>
        </div>
    </main>
</template>