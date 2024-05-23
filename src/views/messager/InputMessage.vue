<script setup>
import { USER_ID } from '@/constants/cookie';
import { useMessageStore } from '@/stores/messageStore'
import dayjs from 'dayjs';
import Cookies from 'js-cookie'
import { reactive, watchEffect } from 'vue';

const messageStore = useMessageStore()

watchEffect(() => {
    if(messageStore.messageSocket) {
        messageStore.messageSocket.onmessage = function(event) {
            let receiveMesssage = JSON.parse(event.data)

            if (receiveMesssage.type == "typing") {
                if (receiveMesssage.sender == messageStore.userConversationID) {
                    messageStore.isTyping = receiveMesssage.data == "0" ? false : true
                }
            }

            if (receiveMesssage.type == "send-message") {
                if (receiveMesssage.sender == messageStore.userConversationID) {
                    let dataMessage = { 
                        message: receiveMesssage.data, 
                        userID: receiveMesssage.sender, 
                        time: receiveMesssage.time
                    }

                    messageStore.messages = messageStore.messages.concat(dataMessage)
                }
            }
        };
    }
})

const onTyping = () => {
    let userID = Cookies.get(USER_ID)

    if(messageStore.userConversationID && messageStore.messageSocket) {
        messageStore.messageSocket.send(JSON.stringify({
            Type: "typing",
            UserID: userID,
            SenderID: messageStore.userConversationID,
            Content: "1",
        }))
    }
}

const onBlur = () => {
    let userID = Cookies.get(USER_ID)

    if(messageStore.userConversationID && messageStore.messageSocket) {
        messageStore.messageSocket.send(JSON.stringify({
            Type: "typing",
            UserID: userID,
            SenderID: messageStore.userConversationID,
            Content:  "0",
        }))
    }
}

const onSendMessage = (e) => { 
    e.preventDefault();

    if(messageStore.messageText) {
        let userID = Cookies.get(USER_ID)
    
        if(messageStore.userConversationID && messageStore.messageSocket) {
            messageStore.isScrollBottom = true
            messageStore.messageSocket.send(JSON.stringify({
                Type: "send-message",
                UserID: userID,
                SenderID: messageStore.userConversationID,
                Content:  messageStore.messageText,
            }))

            messageStore.messages = messageStore.messages.concat({
                message: messageStore.messageText,
                userID: userID,
                time: dayjs(),
            })

            messageStore.messageText = ''
        }
    }
}
</script>


<template>
        <form 
            class="
                ml-0 border-t-2 flex items-center absolute px-2 shadow-lg w-full bottom-0 left-0 h-[60px] bg-[white]
                max-md:fixed max-md:z-[9999]
            "
            @submit="(e) => {
                onSendMessage(e)
            }"
        >
            <div 
                className='absolute flex justify-center items-center space-x-2 top-[-55%] bg-white py-1 px-3 rounded-lg text-sm'
                v-if="messageStore.isTyping"
            >
                <span className='text-[#9E9EA1]'>{{ messageStore.userConversation }}</span>
                <div className='typing-status'>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <input
                v-if="messageStore.userConversationID"
                type="text"
                className="form-input pl-5 outline-none h-9 w-full bg-transparent placeholder:text-slate-400/70"
                :placeholder="`Nhắn gì đó cho ${messageStore.userConversation}`"
                v-model="messageStore.messageText"
                @focus="() => {
                    onTyping()
                }"
                @blur="() => {
                    onBlur()
                }"
            />
            <button
                v-if="messageStore.userConversationID"
                className="btn outline-none flex justify-center items-center h-9 w-9 shrink-0 rounded-full p-0 text-primary hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25"
                type='submit'
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5.5 w-5.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        class="text-[#87d068]"
                        d="m9.813 5.146 9.027 3.99c4.05 1.79 4.05 4.718 0 6.508l-9.027 3.99c-6.074 2.686-8.553.485-5.515-4.876l.917-1.613c.232-.41.232-1.09 0-1.5l-.917-1.623C1.26 4.66 3.749 2.46 9.813 5.146ZM6.094 12.389h7.341"
                    />
                </svg>
            </button>
        </form>
</template>