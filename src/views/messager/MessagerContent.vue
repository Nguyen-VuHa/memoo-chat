<script setup>
import { nextTick, ref, watch, watchEffect } from 'vue';
import InputMessage from './InputMessage.vue';
import MyMessage from './MyMessage.vue';
import YourMessage from './YourMessage.vue';
import { useMessageStore } from '@/stores/messageStore';
import { groupMessagesByMinute } from '@/utils/logic';
import jsCookie from 'js-cookie';

const scorllMessageRef = ref(null)
const messages = ref([]);

const messageStore = useMessageStore()

const scrollToBottom = () => {
  const container = scorllMessageRef.value;
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
};

watch(messages, async () => {
  await nextTick();
  if(messageStore.isScrollBottom) {
    scrollToBottom();
    messageStore.isScrollBottom = false
  }
});

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
        
        messages.value = messageRender
    } else {
        messages.value = []
    }
})

</script>

<template>
    <div ref="scorllMessageRef" class='content-message w-full bg-[#acacac]/20 space-y-1 p-5 overflow-y-auto scroll-smooth mb-[60px]'>
        <div v-for="message in messages" :key="message">
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


<style lang="scss">
    .content-message {
        height: calc(100vh - 120px);
    }
</style>