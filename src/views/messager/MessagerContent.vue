<script setup>
import { watchEffect } from 'vue';
import InputMessage from './InputMessage.vue';
import MyMessage from './MyMessage.vue';
import YourMessage from './YourMessage.vue';
import { useMessageStore } from '@/stores/messageStore';
import { groupMessagesByMinute } from '@/utils/logic';
import jsCookie from 'js-cookie';

const messageStore = useMessageStore()

watchEffect(() => {
    if (messageStore.messages && messageStore.messages.length > 0) {
        let groupedMessages = groupMessagesByMinute(messageStore.messages);

        let messageRender = []
        Object.keys(groupedMessages).forEach((group) => {
            let listSender = []
            let listReceiver = []
            groupedMessages[group].forEach((mesage, index) => {
                if(mesage.userID == messageStore.userConversationID) { 
                    if (listReceiver.length > 0)
                        messageRender.push(listReceiver)

                    listReceiver = []

                    listSender = listSender.concat(mesage)
                } else {
                    if (listSender.length > 0)
                        messageRender.push(listSender)
                    
                    listSender = []

                    listReceiver = listReceiver.concat(mesage)
                }

                if (index == groupedMessages[group].length - 1) {
                    if (listSender.length > 0)
                        messageRender.push(listSender)
                    if (listReceiver.length > 0)
                        messageRender.push(listReceiver)
                }
            })
        })

        messageStore.messagerRender = messageRender
    }
})

</script>

<template>
    <div class='h-[100vh] w-full bg-[#acacac]/20 space-y-1 p-5 overflow-y-auto scroll-smooth'>
        <div v-for="message in messageStore.messagerRender" :key="message">
            <MyMessage 
                v-if="message[0]?.userID == jsCookie.get('user_id') || ''"
                :data="message"
            />
            <YourMessage 
                v-else
                :data="message"
            />
        </div>
    </div>
    <InputMessage />
</template>