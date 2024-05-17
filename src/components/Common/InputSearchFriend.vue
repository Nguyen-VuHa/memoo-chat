<script setup>
import { reactive, ref, watchEffect } from 'vue';
import AppButton from './AppButton.vue';
import { Spin } from 'ant-design-vue';
import AppButtonIcon from './AppButtonIcon.vue';
import { ArrowLeftOutlined } from '@ant-design/icons-vue';
import { useFriendStore } from '@/stores/friendStore';
import Cookies from 'js-cookie';
import { USER_ID } from '@/constants/cookie';

const friendStore = useFriendStore()

let debounceRef = ref(null)
const state = reactive({
    isDropDown: false,
})

function handleFocus(){
    state.isDropDown = true
}

watchEffect(() => {
    if(friendStore.search) {}

    if(debounceRef.value) {
        clearTimeout(debounceRef.value);
    }

    debounceRef.value = setTimeout(() => {
        if(friendStore.search) {
            friendStore.searchFriend({
                userID: Cookies.get(USER_ID),
                search: friendStore.search,
            })
        } else {
            friendStore.friendList = []
        }
    }, 500);
  
})

</script>

<template>
    <div class="relative">
        <div class="flex items-center space-x-2">
            <AppButtonIcon 
                title="Đóng tìm kiếm"
                :on-click="() => {
                    state.isDropDown = false
                }"
                v-if="state.isDropDown"
                class="bg-[#868e99]"                
            >
                <ArrowLeftOutlined />
            </AppButtonIcon>
            <div class="flex px-4 py-2 items-center space-x-2 input-search w-full">
                <input 
                    placeholder="Tìm kiếm trên Messenger"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    v-model="friendStore.search"
                >

                </input>
            </div>
        </div>
        <div class="dropdown" v-if="state.isDropDown"> 
            <Spin :spinning="friendStore.isFetchFriend">
                <div class="text-center py-5" v-if="friendStore.friendList.length <= 0">
                    Không có kết quả tìm kiếm
                </div>
                <div v-else>
                    <div 
                        class="flex justify-between items-center space-x-3 hover:bg-[#868e991a] transition-all cursor-pointer rounded-[8px] px-3 py-2"
                        
                        v-for="friend in friendStore.friendList" :key="friend.UserID"
                    >
                        <div class="flex items-center space-x-2">
                            <img 
                                class="w-8 h-8 rounded-[50%] overflow-hidden border-2 p-1"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr39JkrnRLGcVCORkbnI5VlJuq5KnB-IIf1s4dv8IcOQ&s"
                            />
                            <div class="flex flex-col">
                                <span class="text-sm">{{ friend.FullName }}</span>
                            </div>
                        </div>
                        <AppButton 
                            class="h-[20px] !text-xs" 
                            v-if="friend.FriendStatus == 'N/A'"
                            :loading="friendStore.isSendRequestFriend && friendStore.userIDHandle === friend.UserID"
                            loading-text=" "
                            :on-click="() => {
                                const payload = {
                                    userAction: Cookies.get(USER_ID),
                                    userID: friend.UserID
                                }

                                friendStore.sendRequestFriend(payload)
                            }"
                        >
                            Kết bạn
                        </AppButton>
                        <span class="text-xs text-[#87d068]" v-if="friend.FriendStatus == 'pending-accept'">Đã gửi yêu cầu</span>
                        <AppButton 
                            class="h-[20px] !text-xs" v-if="friend.FriendStatus == 'pending'"
                            :loading="friendStore.isSendRequestFriend && friendStore.userIDHandle === friend.UserID"
                            loading-text=" "
                            :on-click="() => {
                                const payload = {
                                    userAction: Cookies.get(USER_ID),
                                    userID: friend.UserID
                                }

                                friendStore.sendAcceptRequestFriend(payload)
                            }"
                        >
                            Chấp nhận
                        </AppButton>
                    </div>
                </div>
            </Spin>
        </div>
    </div>
</template>

<style lang="scss">
.input-search {
    outline: none;
    background-color: #868e991a;
    border-radius: 18px;

    input {
        outline: none;
        width: 100%;
        background-color: transparent
    }
}

.dropdown {
    position: absolute;
    width: 100%;
    top: 110%;
    left: 0;
    
    z-index: 9999;

    border-radius: 8px;
    padding: 4px;
    background-color: #fff;

    border: 1px solid #868e991a;
}
</style>