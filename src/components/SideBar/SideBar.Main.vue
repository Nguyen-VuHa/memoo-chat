<script setup>
import Menu from './Menu.vue';
import { useConfigStore } from '@/stores/configStore'
import Logo from '@/assets/images/logo.svg'

const configStore = useConfigStore()

</script>

<template>
    <div 
        class="h-full fixed max-h-screen transition-all border-r-2 border-[--border-color]"
        :class="configStore.isToggleSideBar ? '!w-[--sidebar-width-mobile]' : 'w-[--sidebar-width]'"
    >
        <div class="w-full h-full">
            <!-- Logo -->
            <div class="h-[--header-height] flex justify-center items-center">
                <img
                    class="mx-auto mb-3 h-10 w-10"
                    :src="Logo"
                    alt="logo"
                />
            </div>
            <!-- Menu -->
            <Menu />
        </div>
    </div>
</template>