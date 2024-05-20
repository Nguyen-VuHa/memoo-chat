
<script setup>
import HeaderMain from '@/components/Header/Header.Main.vue'
import SideBarMain from '@/components/SideBar/SideBar.Main.vue'
import { USER_ID } from '@/constants/cookie';
import { useAuthStore } from '@/stores/authStore';
import { useConfigStore } from '@/stores/configStore'
import { useMessageStore } from '@/stores/messageStore';
import Cookie from 'js-cookie';
import { onMounted } from 'vue';

const configStore = useConfigStore()
const authStore = useAuthStore()
const messageStore = useMessageStore()

onMounted(() => {
    if (!authStore.public_key)
        authStore.fetchClientKey()
})


onMounted(() => {
    const userID = Cookie.get(USER_ID)
    var socket = new WebSocket(import.meta.env.VITE_URL_SOCKET + `/ws/connection?user_id=${userID}`);
    messageStore.messageSocket = socket
    
    socket.onopen = function() {
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    window.addEventListener('beforeunload', (e) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: "close", userID: userID }));
            socket.close();
        }
    })
})
</script>

<template>
    <div class="min-h-screen">
        <!-- Sidebar -->
        <SideBarMain />    
        <!-- Header -->
        <HeaderMain /> 

        <!-- Content -->    
        <div 
            class="pt-[--header-height] "
            :class="configStore.isToggleSideBar ? 'ml-[--sidebar-width-mobile]' : 'ml-[--sidebar-width]'"
        >
            <div class="height-content">
                <RouterView />  
            </div>  
        </div>
    </div>
</template>

<style lang="scss">
.height-content {
    height: calc(100vh - var(--header-height))
}
</style>