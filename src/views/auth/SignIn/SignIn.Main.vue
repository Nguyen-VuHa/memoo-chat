<script setup>
import FormData from './FormData.vue'
import OTPConfirm from './OTPConfirm.vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore()
</script>

<template>
     <OTPConfirm v-if="authStore.OTPRequire"/>
     <FormData v-else/>
</template>