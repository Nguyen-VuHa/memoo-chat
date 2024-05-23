<script setup>
import InputSearchFriend from '@/components/Common/InputSearchFriend.vue';
import { USER_ID } from '@/constants/cookie';
import { useConfigStore } from '@/stores/configStore';
import { useFriendStore } from '@/stores/friendStore';
import { useMessageStore } from '@/stores/messageStore';
import Cookies from 'js-cookie';
import { onMounted } from 'vue';

const userID = Cookies.get(USER_ID)

const friendStore = useFriendStore()
const messageStore = useMessageStore()
const configStore = useConfigStore()


onMounted(() => {
    friendStore.getMyFriends(userID)
})

</script>

<template>
    <div class="
        w-[360px] h-full 
        space-y-4 border-r-2 p-3
        bg-[#fff]
        max-md:fixed
        max-md:z-[999]
        max-md:w-[--search-bar-mobile]
        transition-all
    "
    :class="configStore.windowSize <= 680 && configStore.isToggleSearhBar ? 'hiden-search-bar' : ''"
    
    >
        <div>
            <InputSearchFriend 
            />
        </div>

        <div>Danh sách bạn bè {{friendStore.myFriends.length > 0 && `(${friendStore.myFriends.length})` || ''}}</div>
        <div class="space-y-1">
            <div 
                v-for="friend in friendStore.myFriends" :key="friend.UserID"
                class="flex items-center p-1 space-x-2 border-[1px] rounded-[6px] cursor-pointer
                hover:bg-[#868e991a] transition-all
                "
                @click="() => {
                    configStore.isToggleSearhBar = true
                    if(messageStore.userConversationID != friend.UserID) {
                        messageStore.userConversation = friend.FullName
                        messageStore.userConversationID = friend.UserID
                        messageStore.fetchMessageList({
                            senderID: userID,
                            receiverID: friend.UserID,
                        })
                        messageStore.isScrollBottom = true
                    }
                 
                }"
            >
                <div class="w-[40px] h-[40px]">

                </div>
                <div>
                    {{ friend.FullName }}
                    <div>
                        <span class="text-xs text-[#87d068]">Hoạt động ... phút trước</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    .hiden-search-bar {
        z-index: -999 !important;
        opacity: 0 !important;
    }
</style>