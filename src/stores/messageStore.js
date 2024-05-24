import { apiGetMessages, apiJoinRoom } from "@/apis/message";
import { USER_ID } from "@/constants/cookie";
import { message } from "ant-design-vue";
import dayjs from "dayjs";
import jsCookie from "js-cookie";
import { defineStore } from "pinia";

const userID = jsCookie.get(USER_ID)
export const useMessageStore = defineStore({   
    id: 'messages',
    state:() => ({
        isFetchMessage: false,
        isJoinRoom: false,

        userConversation: '',
        userConversationID: null,
        
        roomID: '',
        messageSocket: null,
        isTyping: false,
        lastMessageID: '',
        lastMessageNextID: '',

        messages: [],
        messageNextStep: [],
        messageText: '',
        elementLast: '',
        isLastMessage: false,
        isScrollBottom: false,
    }),
    actions: { 
        async lazyLoadMessageNextStep(payload) { 
            if(!this.isFetchMessage) {
                this.isFetchMessage = true

                const res = await apiGetMessages(payload)

                if (res && res.code === 200) {
                    if(res.data && res.data.length > 0) {
                        res.data.map(dt => { 
                            if (userID === dt.SenderID) {
                                this.messageNextStep = [{
                                    message: dt.Content,
                                    userID: userID,
                                    time:  dayjs(dt.CreatedAt),
                                }].concat(this.messageNextStep)
                            } else {
                                this.messageNextStep = [{
                                    message: dt.Content,
                                    userID: dt.SenderID,
                                    time:  dayjs(dt.CreatedAt),
                                }].concat(this.messageNextStep)
                            }
                        })

                        this.lastMessageNextID = res.data[res.data.length - 1].ID
                    } else {
                        this.isLastMessage = true
                    }
                } else {
                    message.error(res?.message || 'NETWORK ERROR.')
                }
                
                this.isFetchMessage = false
            }
        },
        async fetchMessageList(payload) {
            if(!this.isFetchMessage) {
                this.isFetchMessage = true

                const res = await apiGetMessages(payload)

                if (res && res.code === 200) {
                    if(res.data && res.data.length > 0) {
                        this.messages = []
                        res.data.map(dt => { 
                            if (userID === dt.SenderID) {
                                this.messages = [{
                                    message: dt.Content,
                                    userID: userID,
                                    time:  dayjs(dt.CreatedAt),
                                }].concat(this.messages)
                            } else {
                                this.messages = [{
                                    message: dt.Content,
                                    userID: dt.SenderID,
                                    time:  dayjs(dt.CreatedAt),
                                }].concat(this.messages)
                            }
                        })

                        this.lastMessageID = res.data[res.data.length - 1].ID
                    } else {
                        this.messages = []
                    }
                } else {
                    message.error(res?.message || 'NETWORK ERROR.')
                }
                
                this.isFetchMessage = false
            }
        },
        async joinRoom(payload) {
            if(!this.isJoinRoom) {
                this.isJoinRoom = true

                const res = await apiJoinRoom(payload) 

                if(res && res.code == 200) {
                    this.roomID = res.data
                } else {
                    message.error(res.message || "NETWORK ERROR")
                }

                this.isJoinRoom = false
            }
        }
    }
})