<script setup>
const props = defineProps({
    title: String,
    isRequire: Boolean,
    errorText: String,
})
</script>

<template>
    <label class="block space-y-2">
        <div class="font-medium">{{ props.title || "TITLE FORM GROUP"}}<span v-if="props.isRequire" class="ml-1 text-[red]">*</span></div>
        <slot></slot>
        <span class="text-[red] text-xs italic" v-if="props.errorText">{{ props.errorText }}</span>
  </label>
</template>