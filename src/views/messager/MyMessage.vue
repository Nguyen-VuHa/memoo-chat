<script setup>

</script>

<template>
    <div class="flex items-start justify-end space-x-2 sm:space-x-5">
            <div class="flex flex-col items-end space-y-1">
                <div class="max-w-lg space-y-1">
                    <div key={index} class="font-genos rounded-2xl rounded-tr-none bg-info/10 p-3 text-slate-700 shadow-sm dark:bg-accent dark:text-white">
                        {msg.message}
                    </div>
                    <p class="mt-1 ml-auto text-right text-xs text-slate-400 dark:text-navy-300">
                        {time}
                    </p>
                </div>
            </div>
            <div class="avatar w-10 h-10">
                <img class="rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRCFgHuWIBCleFnK0U9Hytp0Q76Ygu1alwrQ&usqp=CAU" alt="avatar" />
            </div>
        </div>
</template>