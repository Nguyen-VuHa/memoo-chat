<script setup>
import { ConfigProvider } from 'ant-design-vue';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'

dayjs.extend(relativeTime);
dayjs.locale('vi');

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