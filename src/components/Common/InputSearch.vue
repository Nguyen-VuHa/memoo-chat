<script setup>
import { reactive } from 'vue';
import AppButton from './AppButton.vue';
import { Spin } from 'ant-design-vue';
import AppButtonIcon from './AppButtonIcon.vue';
import { ArrowLeftOutlined } from '@ant-design/icons-vue';

const props = defineProps({
    placeholder: String,
})
</script>

<template>
   <input 
        :placeholder="props.placeholder || 'Text search...'"
    >

    </input>
</template>
