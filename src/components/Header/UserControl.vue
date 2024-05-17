<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { DownOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import IMG200 from '@/assets/images/200x200.png'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const dropdownRef = ref(null)
const buttonRef = ref(null)

const state = reactive({
    isOpenControl: false
})

onMounted(() => {
    window.addEventListener('click', (e) => {
        if(!dropdownRef.value.contains(e.target) && !buttonRef.value.contains(e.target)) {
            if(state.isOpenControl)
                state.isOpenControl = false
        }
    });
})

onUnmounted(() => {
    window.removeEventListener("click", () => {})
})
</script>

<template>
    <div class="relative select-none min-w-[180px]">  
        <div 
            ref="buttonRef"
            class="cursor-pointer 
            flex justify-between items-center rounded-md
            select-none border-[1px] font-semibold w-auto px-3 h-[32px]
            space-x-1.5 text-[13px] hover:bg-[#f5f5f5] transition duration-[1s]
            dark:hover:bg-[#4b4f7366]
            "
            @click="() => {
                state.isOpenControl = !state.isOpenControl
            }"
        >
            <span>{{ Cookies.get("full_name") || "NO NAME" }}</span>
            <div class="text-[10px] font-bold transition" :class="state.isOpenControl ? 'rotate-[180deg]' : ''">
                <DownOutlined />
            </div>
        </div>
        <div 
            ref="dropdownRef"
            class="
                absolute w-full h-auto border-[1px] bg-white shadow-xl rounded-md
                p-1 space-y-2 leading-none transition-all duration-[0.4s]  dark:bg-[#26334d]
            "
            :class="state.isOpenControl ? 'top-[110%] visible' : 'top-[90%] opacity-0 invisible'"
        >   
            <div class="flex flex-col items-center space-y-4 leading-none ">
                <div class="w-[40px] overflow-hidden rounded-[50%]">
                    <img 
                        :src="IMG200"
                    />
                </div>
                <div class="text-[16px]">{{ Cookies.get("full_name") || "NO NAME" }}</div>
            </div>
            <hr class="divide"/>
            <button
                class="px-3 py-2 text-[13px] h-[32px] hover:bg-[#f5f5f5] transition focus:outline-none border-[1px] rounded-md w-full flex justify-start items-center space-x-3
                dark:hover:bg-[#4b4f7366]
                "
                @click="() => {
                    authStore.signOutAccount()
                }"
            >
                <div class="rotate-[180deg]">
                    <LogoutOutlined />
                </div>
                <span>Đăng xuất</span>
            </button>
        </div>
    </div>
</template>