<script setup>
import HeaderControl from './HeaderControl.vue';
import UserControl from './UserControl.vue'
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
</script>

<template>
    <div class="wrapper-header transition-all" :class="configStore.isToggleSideBar ? 'toggle' : ''">
        <div class="w-full h-full p-4 flex justify-between items-center">
            <HeaderControl />
            <UserControl />
        </div>
    </div>
</template>

<style lang="scss">
    .wrapper-header {
        position: fixed;
        width: calc(100% - var(--sidebar-width));
        height: var(--header-height);
        margin-left: var(--sidebar-width);
        background-color: #fff;
        border-bottom: 1px solid var(--border-color);

        &.toggle {
            width: calc(100% - var(--sidebar-width-mobile));
            margin-left: var(--sidebar-width-mobile);
        }
    }
</style>