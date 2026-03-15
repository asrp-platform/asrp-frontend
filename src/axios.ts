import axios from "axios"
import type { IRefreshResponse } from "./shared/types/interfaces.ts"

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim()

export const REST_API_URL = rawApiUrl || "http://127.0.0.1:8000/api"
export const REFRESH_URL = `${REST_API_URL}/auth/refresh`

const api = axios.create({
    baseURL: REST_API_URL,
    withCredentials: true,
})

console.log(REFRESH_URL)

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
            originalRequest._isRetry = true

            try {
                const response = await axios.post<IRefreshResponse>(
                    REFRESH_URL,
                    {},
                    {
                        withCredentials: true,
                    }
                )

                localStorage.setItem("accessToken", response.data.access_token)

                originalRequest.headers = originalRequest.headers ?? {}
                originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`

                return api.request(originalRequest)
            } catch (refreshError) {
                console.log(`User is not authenticated ${refreshError}`)
            }
        }

        return Promise.reject(error)
    }
)

export default api
