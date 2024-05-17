<script setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()


</script>

<template>
    <div class="flex items-center space-x-1">
        <div 
            class="h-8 w-8 cursor-pointer flex justify-center items-center" 
            @click="() => {
                configStore.isToggleSideBar = !configStore.isToggleSideBar
            }"
        >
            <MenuFoldOutlined v-if="!configStore.isToggleSideBar"class="text-xl hover:text-[--primary-color] transition-all"/>
            <MenuUnfoldOutlined v-else class="text-xl hover:text-[--primary-color] transition-all"/>
        </div>
    </div>
</template>