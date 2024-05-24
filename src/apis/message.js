import axiosClient from "./axios.config"

export const apiGetMessages = (payload) => {
    const apiPath = `/message/list?_sender=${payload.senderID}&_receiver=${payload.receiverID}`

    return axiosClient.get(apiPath)
}

export const apiJoinRoom = (payload) => {
    const apiPath = `/socket/join?user_id=${payload.userID}&sender_id=${payload.senderID}`

    return axiosClient.get(apiPath)
}