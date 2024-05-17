<script setup>
const props = defineProps({
    title: String
})
</script>

<template>
    <h3 class="text-lg font-medium text-slate-700 line-clamp-1 dark:text-navy-50">
        {{ props.title || 'NO TITLE' }}
    </h3>
</template>