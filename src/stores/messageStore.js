import { defineStore } from "pinia";


export const useMessageStore = defineStore({   
    id: 'messages',
    state:() => ({
        userConversation: '',
        userConversationID: null
    }),
    actions: { 

    }
})