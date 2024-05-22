
import { apiGetKey, apiOTPConfirm, apiSignIn, apiSignUp } from '@/apis/auth'
import { message } from 'ant-design-vue'
import { defineStore } from 'pinia'
import router from "@/routes"
import { ACCESS_TOKEN, DEVIDE_CODE, FULL_NAME, REFRESH_TOKEN, USER_ID } from '@/constants/cookie'
import Cookies from 'js-cookie'

export const useAuthStore = defineStore({ 
    id: 'authenticate',
    state:() => ({
        publicKey: null,
        isFetchKey: false,

        OTPRequire: false,
        userData: null,
        isConfirmOTP: false,

        formSignIn: {
            email: '',
            password: '',
        },
        errorSignIn: {
            email: '',
            password: '',
        },
        isSignIn: false,

        formSignUp: {
            email: '',
            fullname: '',
            password: '',
            confirmPassword: '',
        },
        errorSignUp: {
            email: '',
            fullname: '',
            password: '',
            confirmPassword: '',
        },
        isSignUp: false,
    }),
    actions: {
        async fetchClientKey() { 
            if(!this.isFetchKey) {
                this.isFetchKey = true

                const res = await apiGetKey()

                if(res && res.code === 200) {
                    this.publicKey = res.data
                }

                this.isFetchKey = false
            }
        },
        async signUpAccount(payload) { 
            if(!this.isSignUp) {
                this.isSignUp = true

                const res = await apiSignUp({
                    data: payload
                }) 

                if (res && res.code === 200) { 
                    message.success(res.message || "Đăng ký tài khoản thành công.")
                    router.push({ name: "sign-in" })
                    this.formSignUp = {
                        email: '',
                        fullname: '',
                        password: '',
                        confirmPassword: '',
                    }
                } else {
                    message.error(res.message || "Đăng ký tài khoản thất bại")
                }

                this.isSignUp = false
            }
        },
        async signInAccount(payload) {
            if (!this.isSignIn) {
                this.isSignIn = true

                const res = await apiSignIn({
                    data: payload
                }) 


                if (res && res.code === 200) {
                    const dataResp = res.data

                    if(dataResp.authentication_status) {
                        Cookies.set(ACCESS_TOKEN, dataResp?.access_token, { expires: 1 });
                        Cookies.set(REFRESH_TOKEN, dataResp?.refresh_token, { expires: 1 });
                        Cookies.set(FULL_NAME, dataResp?.full_name, { expires: 1 });
                        Cookies.set(USER_ID, dataResp?.user_id, { expires: 1 });

                        const hashURL = window.location.hash;
                        const [path, queryString] = hashURL.slice(1).split('?');
                        const urlParams = new URLSearchParams(queryString);
                        const redirectURL = urlParams.get('redirect');

                        if(redirectURL && redirectURL != '/') {
                            router.push({ path: redirectURL }); 
                        } else {
                            window.location.reload()
                        }
                    } else {
                        this.OTPRequire = true
                        this.userData = dataResp
                    }
                } else {
                    message.error(res.message)
                }

                this.isSignIn = false
            }
        },
        async confirmOTP(otp) { 
            if (!this.isConfirmOTP) {
                this.isConfirmOTP = true

                const payload = {
                    otp,
                    userID: this.userData?.user_id
                }

                const res = await apiOTPConfirm(payload)

                if (res && res.code === 200) {
                    message.success(res.message || "Xác thực thành công.")
                    const dataResp = res.data

                    Cookies.set(ACCESS_TOKEN, dataResp?.access_token, { expires: 1 });
                    Cookies.set(REFRESH_TOKEN, dataResp?.refresh_token, { expires: 1 });
                    Cookies.set(FULL_NAME, dataResp?.full_name, { expires: 1 });
                    Cookies.set(USER_ID, dataResp?.user_id, { expires: 1 });

                    const hashURL = window.location.hash;
                    const [path, queryString] = hashURL.slice(1).split('?');
                    const urlParams = new URLSearchParams(queryString);
                    const redirectURL = urlParams.get('redirect');

                    if(redirectURL && redirectURL != '/') {
                        router.push({ path: redirectURL }); 
                    } else {
                        window.location.reload()
                    }

                    this.OTPRequire = false
                    this.userData = null
                } else {
                    message.error(res.message)
                }

                this.isConfirmOTP = false
            }
        },
        async signOutAccount() {
            Cookies.remove(ACCESS_TOKEN);
            Cookies.remove(REFRESH_TOKEN);
            Cookies.remove(FULL_NAME);
            Cookies.remove(DEVIDE_CODE);

            window && window.location.replace('/')
        },
    }
})