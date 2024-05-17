<script setup>
import AppButton from '@/components/Common/AppButton.vue';
import { useAuthStore } from '@/stores/authStore';
import { ref, nextTick } from 'vue';
import { useConfigStore } from '@/stores/configStore';
import Logo from '@/assets/images/logo.svg'
import { apiOTPConfirm } from '@/apis/auth';
import { message } from 'ant-design-vue';

const configStore = useConfigStore()
const authStore = useAuthStore()

const otp = ref(Array(6).fill(''));
const inputRefs = ref([]);

const focusNext = (event, index) => {
  if (event.target.value.length === 1 && index < 6) {
    const nextInput = inputRefs.value[index];
    if (nextInput) {
      nextInput.focus();
    }
  }
};

const handleBackspace = (event, index) => {
  if (event.key === "Backspace" && otp.value[index - 1] === '' && index > 1) {
    const previousInput = inputRefs.value[index - 2]; // Lấy input trước đó
    if (previousInput) {
      previousInput.focus();
    }
  }
};

const handlePaste = (event, index) => {
  // Ngăn chặn hành vi paste mặc định
  event.preventDefault();
  // Lấy text từ clipboard
  const text = (event.clipboardData || window.clipboardData).getData('text').slice(0, 6);
  // Điền text vào các ô từ vị trí hiện tại
  text.split('').forEach((char, idx) => {
    otp.value[index + idx - 1] = char;
  });
  // Cập nhật focus sau khi nhập
  nextTick(() => {
    const nextInput = inputRefs.value[index + text.length - 1];
    if (nextInput) {
      nextInput.focus();
    }
  });
};


const handleConfirmOTP = async () => {
  let otpString = otp.value.join("")

  if(otpString && otpString.length === 6) {
    authStore.confirmOTP(otpString)
  } else {
    message.warning("OTP is empty")
  }
}
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
                        OTP Confirm
                    </h2>
                    <p class="text-slate-400 dark:text-navy-300">
                        Please check your email to retrieve the OTP
                    </p>
                </div>
            </div>
            
            <form class="mt-5 flex flex-col items-center space-y-3">
                <div class="otp-input-container space-x-2">
                    <input 
                        v-for="index in 6"
                        :key="index"
                        class="otp-input"
                        type="text"
                        maxlength="1"
                        ref="inputRefs"
                        v-model="otp[index - 1]"
                        @input="focusNext($event, index)"
                        @keyup="handleBackspace($event, index)"
                        @paste="handlePaste($event, index)"
                    />
                </div>
                <div class="flex space-x-2 text-xs">
                    <span>You have not received the OTP code?</span>
                    <a
                        class="ml-1 select-none text-[#1677ff]"
                        style="cursor: pointer; text-decoration: underline"
                        @click="
                            async () => {
                              
                            }
                        "
                    >
                        Send again
                    </a>
                </div>
                <AppButton 
                  class="w-full !bg-blue" 
                  type="primary" 
                  @click="(e) => {
                    handleConfirmOTP()
                  }"
                  :loading="authStore.isConfirmOTP"
                >Confirm OTP</AppButton>
            </form>
        </div>
    </main>
</template>

<style lang="scss">
.otp-input-container {
  display: flex;
  justify-content: space-between;
  max-width: 300px; /* Hoặc bất kỳ kích thước nào phù hợp với bạn */
}

.otp-input {
  width: 40px;
  padding: 10px;
  text-align: center;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: all .35s ease;

  &:hover {
    border: 1px solid #1677ff;
  }

  &:focus {
    border: 1px solid #1677ff;
  }
}
</style>