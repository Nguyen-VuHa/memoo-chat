import axiosClient from "./axios.config"

export const apiGetMessages = (payload) => {
    const apiPath = `/message/list?_sender=${payload.senderID}&_receiver=${payload.receiverID}`

    return axiosClient.get(apiPath)
}