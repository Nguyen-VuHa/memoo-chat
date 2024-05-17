<script setup>
import InputSearchFriend from '@/components/Common/InputSearchFriend.vue';
import { USER_ID } from '@/constants/cookie';
import { useFriendStore } from '@/stores/friendStore';
import { useMessageStore } from '@/stores/messageStore';
import Cookies from 'js-cookie';
import { onMounted } from 'vue';

const friendStore = useFriendStore()
const messageStore = useMessageStore()

onMounted(() => {
    let userID = Cookies.get(USER_ID)

    friendStore.getMyFriends(userID)
})
</script>

<template>
    <div class="w-[360px] h-full max-md:w-[88px] space-y-4 border-r-2  p-3">
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
                    messageStore.userConversation=friend.FullName
                    messageStore.userConversationID=friend.UserID
                }"
            >
                <div class="w-[40px] h-[40px]">

                </div>
                <div>
                    {{ friend.FullName }}
                    <div>
                        <span class="text-xs text-[#87d068]">Hoạt động 30 phút trước</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>