<script setup>
import { useMessageStore } from '@/stores/messageStore';
import { Badge } from 'ant-design-vue'

const messageStore = useMessageStore()
</script>

<template>
    <div class="w-full flex justify-between items-center h-[60px] border-b-2 p-2">
        <!-- Name User -->
        <div>
            <div>{{messageStore.userConversation || ''}}</div>
            <div v-if="messageStore.userConversation">
                <Badge color="#87d068"></Badge> 
                <span class="text-xs text-[#87d068]">Active</span>
            </div>
        </div>
    </div>
</template>