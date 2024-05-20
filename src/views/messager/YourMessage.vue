<script setup>
import dayjs from 'dayjs'


const props = defineProps({
    data: Array,
})
</script>

<template>
    <div class="flex items-start space-x-2.5 sm:space-x-5">
        <div class="avatar w-10 h-10">
            <img class="rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRCFgHuWIBCleFnK0U9Hytp0Q76Ygu1alwrQ&usqp=CAU" alt="avatar" />
        </div>
        <div class="flex flex-col items-end space-y-1">
        <div class="max-w-lg space-y-1">
            <div 
                class="font-genos rounded-2xl rounded-tl-none bg-white p-3 text-slate-700 shadow-sm dark:bg-navy-700 dark:text-navy-100"
                v-for="message in props.data || []" :key="message"
            >
                {{ message.message }}
            </div>
            <p class="mt-1 ml-auto text-right text-xs text-slate-400 dark:text-navy-300">
                {{ dayjs(props.data[0]?.time).fromNow() }}
            </p>
        </div>
        </div>
    </div>
</template>