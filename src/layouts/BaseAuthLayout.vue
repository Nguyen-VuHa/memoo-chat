<script setup>
import { useAuthStore } from '@/stores/authStore';
import { onMounted } from 'vue';

const authStore = useAuthStore()

onMounted(() => {
    if (!authStore.public_key)
        authStore.fetchClientKey()
})
</script>


<template>
    <RouterView />    
</template>