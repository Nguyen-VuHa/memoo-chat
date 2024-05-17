<script setup>
import InputMessage from './InputMessage.vue';
import MyMessage from './MyMessage.vue';
import YourMessage from './YourMessage.vue';

</script>

<template>
    <div class='relative h-[100vh] w-full bg-[#acacac]/20 space-y-1 p-5 overflow-y-auto scroll-smooth'>
        <MyMessage />
        <YourMessage />
        <InputMessage />
    </div>
</template>