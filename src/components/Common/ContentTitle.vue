<script setup>
const props = defineProps({
    title: String
})
</script>

<template>
    <h4 class="text-md font-medium text-slate-700 line-clamp-1 dark:text-navy-50">
        {{ props.title || 'NO TITLE' }}
    </h4>
</template>