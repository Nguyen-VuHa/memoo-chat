<script setup>
import { ConfigProvider } from 'ant-design-vue';
</script>

<template>
    <ConfigProvider
        :theme="{
            token:{
                fontFamily: 'Quicksand',
            },
        }"
    >
        <RouterView />
    </ConfigProvider>
</template>