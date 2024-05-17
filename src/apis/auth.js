import axiosClient from "./axios.config"


export const apiSignIn = (payload) => {
    const apiPath = '/auth/sign-in'

    return axiosClient.post(apiPath, payload)
}


export const apiSignUp = (payload) => {
    const apiPath = '/auth/sign-up'

    return axiosClient.post(apiPath, payload)
}


export const apiGetKey = () => {
    const apiPath = '/auth/get-key'

    return axiosClient.get(apiPath)
}

export const apiOTPConfirm = (payload) => {
    const apiPath = `/auth/otp?_otp=${payload.otp}&_user_id=${payload.userID}`

    return axiosClient.get(apiPath)
}