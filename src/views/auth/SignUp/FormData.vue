<script setup>
import Logo from '@/assets/images/logo.svg'
import { useAuthStore } from '@/stores/authStore';
import { signUpSchema } from '@/validations/auth';
import FormGroup from '@/components/Common/FormGroup.vue';
import { Input } from 'ant-design-vue'
import AppButton from '@/components/Common/AppButton.vue';
import { encryptRSA, uint8ArrayToBase64 } from '@/utils/crypto';

const authStore = useAuthStore()

const handleSignUpAccount = async (e) => {
    e.preventDefault()

    const isValidate = await validateAndSubmit()
    
    if (authStore.formSignUp.password != authStore.formSignUp.confirmPassword) {
        authStore.errorSignUp["confirmPassword"] =  "Mật khẩu nhập lại không đúng."
        return
    }

    if (isValidate) {
        const payload = {
            Email: authStore.formSignUp.email,
            Password: authStore.formSignUp.password,
            FullName: authStore.formSignUp.fullname,
        }

        // const dataDecode = await encryptRSA(authStore.publicKey, JSON.stringify(payload))
        // const base64DecodeData = uint8ArrayToBase64(dataDecode);

        // authStore.signUpAccount(base64DecodeData)
        authStore.signUpAccount(payload)
    } 
}

const validateAndSubmit = async () => {
    try {
        // Kiểm tra lại toàn bộ form trước khi submit
        await signUpSchema.validate(authStore.formSignUp, { abortEarly: false });
        return true
    } catch (err) {
        err.inner.forEach((error) => {
            authStore.errorSignUp[error.path] =  error.message
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
                </div>
            </div>
            <form class="mt-16 space-y-3" @submit="(e) => handleSignInAccount(e)">
                <!-- Input Email -->
                <FormGroup title="Email"  :errorText="authStore.errorSignUp.email">
                    <Input 
                        placeholder="Nhập email của bạn..."
                        name="email"
                        :value="authStore.formSignUp.email"
                        @change="(e) => {
                            authStore.formSignUp.email = e.target.value
                            authStore.errorSignUp.email = ''
                        }"
                    />
                </FormGroup>
                <FormGroup title="Họ & Tên"  :errorText="authStore.errorSignUp.fullname">
                    <Input 
                        placeholder="Nhập tên của bạn..."
                        name="fullname"
                        :value="authStore.formSignUp.fullname"
                        @change="(e) => {
                            authStore.formSignUp.fullname = e.target.value
                            authStore.errorSignUp.fullname = ''
                        }"
                    />
                </FormGroup>
                <FormGroup title="Mật khẩu"  :errorText="authStore.errorSignUp.password">
                    <Input 
                        name="password"
                        type="password"
                        placeholder="Nhập mật khẩu..."
                        :value="authStore.formSignUp.password"
                        @change="(e) => {
                            authStore.formSignUp.password = e.target.value
                            authStore.errorSignUp.password = ''
                        }"
                    />
                </FormGroup>
                <FormGroup title="Nhập lại mật khẩu"  :errorText="authStore.errorSignUp.confirmPassword">
                    <Input 
                        name="confirmPassword"
                        type="password"
                        placeholder="Nhập lại mật khẩu..."
                        :value="authStore.formSignUp.confirmPassword"
                        @change="(e) => {
                            authStore.formSignUp.confirmPassword = e.target.value
                            authStore.errorSignUp.confirmPassword = ''
                        }"
                    />
                </FormGroup>
                <div class="flex text-sm">
                    <label>Bạn đã có tài khoản</label>
                    <RouterLink to="/auth/sign-in" class="btn ml-2 underline cursor-pointer">Đăng nhập</RouterLink>
                </div>
                <AppButton 
                    class="w-full" type="primary" 
                    :loading="authStore.isSignUp"
                    :onClick="(e) => {
                        handleSignUpAccount(e)
                    }"
                >
                    Đăng Ký
                </AppButton>
            </form>
        </div>
    </main>
</template>