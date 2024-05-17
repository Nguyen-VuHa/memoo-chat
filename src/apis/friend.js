import axiosClient from "./axios.config"


export const apiSearchFriend = (payload) => {
    const apiPath = `/connector/search?_user_id=${payload.userID}&_search=${payload.search}`

    return axiosClient.get(apiPath)
}

export const apiSendRequestFriend = (payload) => {
    const apiPath = `/connector/send-request?_user_action=${payload.userAction}&_user_id=${payload.userID}`

    return axiosClient.get(apiPath)
}


export const apiSendAcceptRequestFriend = (payload) => {
    const apiPath = `/connector/accept-friend?_user_action=${payload.userAction}&_user_id=${payload.userID}`

    return axiosClient.get(apiPath)
}

export const apiGetFriends = (payload) => {
    const apiPath = `/connector/friends?_user_id=${payload}`

    return axiosClient.get(apiPath)
}
