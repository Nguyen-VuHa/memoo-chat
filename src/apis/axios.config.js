import axios from 'axios'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ID, FULL_NAME } from '@/constants/cookie'

// set config default axios
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT
})

// config axios request API getway
axiosClient.interceptors.request.use(async (config) => {
    // if (Cookies.get(ACCESS_TOKEN)) {
    //     config.withCredentials = true
    //     config.headers.Authorization = `Bearer ${Cookies.get(ACCESS_TOKEN)}`;
    // }

    return config;
}, (error) => {
    Promise.reject(error)
})

// function refresh token when token expired.
const refreshAccessToken = async () => {
    try {
      const payload = {
        RefreshToken: Cookies.get(REFRESH_TOKEN) || "xxx",
        UserId: Cookies.get(USER_ID) || "xxx",
      };
  
      const res = await axiosClient.post(`/auth/refresh?_token=${payload.RefreshToken}&_user_id=${payload.UserId}`, {});
      
      if (res && res.code === 200) {
        // Lưu access token mới vào cookies
        Cookies.set(ACCESS_TOKEN, res.data?.access_token);
        Cookies.set(REFRESH_TOKEN, res.data?.refresh_token);
      }
  
      return res.data?.access_token || 'NO TOKEN';
    } catch (error) {
      // Xử lý lỗi khi refresh token không thành công
      throw error;
    }
};

let isRefreshing = false;
let refreshQueue = [];
  
// config axios reponse API getway
axiosClient.interceptors.response.use((res) => {
    return res.data;
}, async (error) => {
    const originalRequest = error?.config;

    // api status Forbidden => clear token on cookies end logout
    if (error.response && error.response.status === 403) {
        handleClearCookies()
    }   

    // api status authorization required => refresh token and set token on cookies.
    if (error.response && error.response.status === 401 && !originalRequest._retry) { 
        if (!isRefreshing) {
            isRefreshing = true

            try {
                originalRequest._retry = true
                const newAccessToken = await refreshAccessToken()
                isRefreshing = false

                refreshQueue.forEach((queuedRequest) => {
                    queuedRequest.resolve(newAccessToken);
                })
             
                refreshQueue = [];
                originalRequest.headers.Authorization = "Bearer " + newAccessToken;
                return axiosClient(originalRequest);
            } catch (error) {
                isRefreshing = false;
                // handle error when refresh token failed.
                refreshQueue.forEach((queuedRequest) => {
                    queuedRequest.reject(error);
                });
                refreshQueue = [];

                handleClearCookies();
                
                return Promise.reject(error.response.data);
            }
        } else {
            return new Promise((resolve, reject) => {
                refreshQueue.push({ resolve, reject });
            })
            .then((token) => {
                // re-send request with new access token
                originalRequest.headers.Authorization = `Bearer ${token}`;

                return axiosClient(originalRequest);
            })
            .catch((err) => {
                return Promise.resolve();
            });
        }
    }

    if (error.response) {
        return Promise.resolve(error.response?.data);
    }
    
    return Promise.resolve(error.response?.data);
})


function handleClearCookies() {
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(REFRESH_TOKEN);
    Cookies.remove(USER_ID);
    Cookies.remove(FULL_NAME);
    
    try {
        window && window.location.replace('/')
    } catch (error) {
        console.error(error);
    }
}

export default axiosClient