<script setup>
import { Tooltip } from 'ant-design-vue';

const props = defineProps({
    class: String,
    onClick: Function,
    loading: Boolean,
    loadingText: String,
    disable: Boolean,
    outline: Boolean,
    type: String,
    title: String
})

const getPopupContainer = trigger => {
  return trigger.parentElement;
};
</script>

<template>
    <button
        :class="`!rounded-[50%] transition-all w-[32px] h-[32px] flex justify-center items-center !text-[14px] !px-4 space-x-2 bg-[#4096ff] text-white hover:bg-[#4096ff]-focus hover:shadow-lg hover:shadow-[#4096ff]/50 
        ${props.class || ''} ${props.outline && '!bg-transparent border-[1px] !border-[#4096ff] !text-[#4096ff]' || ''}
        ${props.disable ? 'opacity-[0.5]' : ''}
        `"
        @click="(e) => {
            if(!props.disabled && !props.loading) {
                props.onClick && props.onClick(e)
            }
        }"
        :disabled="props.disable"
        :type="type || 'button'"
    >   
    
            <slot v-if="!props.loading"></slot>
            <div v-else class="flex justify-between items-center space-x-2">
                <div :class="props.outline && 'border-[#4096ff]/60 !text-[#4096ff]' || ''" class="spinner is-elastic size-5 animate-spin !rounded-[50%] border-[3px] border-white/30 border-r-white dark:border-accent/30 dark:border-r-accent"></div>
            </div>
    </button>
</template>