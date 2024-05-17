import { apiSearchFriend, apiSendAcceptRequestFriend, apiSendRequestFriend } from "@/apis/friend";
import { message } from "ant-design-vue";
import { defineStore } from "pinia";


export const useFriendStore = defineStore({  
    id: 'friends',
    state:() => ({
        isFetchFriend: false,
        isSendRequestFriend: false,
        
        userIDHandle: null,
        search: '',
        friendList: [],
    }),
    actions: {
        async searchFriend(payload) {
            if(!this.isFetchFriend) {
                this.isFetchFriend = true

                const res = await apiSearchFriend(payload)

                if (res && res.code === 200) {
                    this.friendList = res.data || []
                } else {
                    message.error(res.message || "Search failed")
                }

                this.isFetchFriend = false
            }
        },
        async sendRequestFriend(payload) {
            if(!this.isSendRequestFriend) {
                this.userIDHandle = payload.userID
                this.isSendRequestFriend = true

                const res = await apiSendRequestFriend(payload)

                if (res && res.code === 200) {
                    message.success("Gửi yêu cầu kết bạn thành công.")
                    this.friendList = this.friendList.map(friend => friend.UserID === payload.userID ? 
                        { ...friend,
                        FriendStatus: 'pending-accept'} : 
                        { ...friend})
                    this.userIDHandle = null
                } else {
                    message.error(res.message)
                }

                this.isSendRequestFriend = false
            }
        },
        async sendAcceptRequestFriend(payload) { 
            if(!this.isSendRequestFriend) { 
                this.isSendRequestFriend = true

                const res = await apiSendAcceptRequestFriend(payload)

                if (res && res.code === 200) {
                    this.userIDHandle = payload.userID
                    message.success(res.message)
                    this.friendList = this.friendList.map(friend => friend.UserID === payload.userID ? 
                        { ...friend,
                        FriendStatus: 'accepted'} : 
                        { ...friend})
                    this.userIDHandle = null
                } else {
                    message.error(res.message)
                }


                this.isSendRequestFriend = false
            }
        }
    }
})