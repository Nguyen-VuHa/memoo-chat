
<script setup>
import HeaderMain from '@/components/Header/Header.Main.vue'
import SideBarMain from '@/components/SideBar/SideBar.Main.vue'
import { useAuthStore } from '@/stores/authStore';
import { useConfigStore } from '@/stores/configStore'
import { onMounted } from 'vue';

const configStore = useConfigStore()
const authStore = useAuthStore()

onMounted(() => {
    if (!authStore.public_key)
        authStore.fetchClientKey()
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