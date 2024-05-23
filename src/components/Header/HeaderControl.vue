<script setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { useConfigStore } from '@/stores/configStore'
import { onBeforeUnmount, onMounted, watchEffect } from 'vue';

const configStore = useConfigStore()

onMounted(() => {
    window.addEventListener('resize', (e) => {
        configStore.windowSize = window.innerWidth

        if(window.innerWidth <= 680 && !configStore.isToggleSideBar) {
            configStore.isToggleSideBar = true
        }
    });
})


onBeforeUnmount(() => {
    window.removeEventListener('resize');
})

</script>

<template>
    <div class="flex items-center space-x-1">
        <div 
            class="h-8 w-8 cursor-pointer flex justify-center items-center" 
            @click="() => {
                if(configStore.windowSize >= 680) {
                    configStore.isToggleSideBar = !configStore.isToggleSideBar
                } else {
                    configStore.isToggleSearhBar = !configStore.isToggleSearhBar
                }
            }"
        >
            <MenuFoldOutlined v-if="!configStore.isToggleSideBar"class="text-xl hover:text-[--primary-color] transition-all"/>
            <MenuUnfoldOutlined v-else class="text-xl hover:text-[--primary-color] transition-all"/>
        </div>
    </div>
</template>