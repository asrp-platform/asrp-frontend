import axios from "axios"
import {REFRESH_URL, REST_API_URL} from "./shared/backend/restApiUrls.ts";
import type {IRefreshResponse} from "./shared/types/interfaces.ts";



const api = axios.create({
    baseURL: REST_API_URL,
    withCredentials: true,
})

api.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

api.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true
            try {
                const response = await axios.post<IRefreshResponse>(
                    REFRESH_URL,
                    {},
                    {
                        withCredentials: true,
                    },
                )
                localStorage.setItem("accessToken", response.data.access_token)
                return api.request(originalRequest)
            } catch (error) {
                console.log(`User is not authenticated ${error}`)
            }
        }
        throw error
    },
)

export default api
