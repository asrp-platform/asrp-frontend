import axios from "axios"
import type { IRefreshResponse } from "@shared/interfaces.ts"

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim()

export const REST_API_URL = rawApiUrl || "http://localhost:8000/api"
export const ADMIN_URL = "/admin"
export const REFRESH_URL = `${REST_API_URL}/auth/refresh`

let refreshPromise: Promise<string> | null = null

const refreshAccessToken = async () => {
    if (!refreshPromise) {
        refreshPromise = axios
            .post<IRefreshResponse>(REFRESH_URL, {}, { withCredentials: true })
            .then((response) => {
                const accessToken = response.data.access_token
                localStorage.setItem("accessToken", accessToken)
                return accessToken
            })
            .finally(() => {
                refreshPromise = null
            })
    }

    return refreshPromise
}

const api = axios.create({
    baseURL: REST_API_URL,
    withCredentials: true,
})

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
    },
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config
        const requestUrl: string = originalRequest?.url ?? ""

        const isAuthRequest =
            /\/auth\/login(?:\?|$)/.test(requestUrl) || /\/auth\/refresh(?:\?|$)/.test(requestUrl)

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry &&
            !isAuthRequest
        ) {
            originalRequest._isRetry = true

            try {
                const accessToken = await refreshAccessToken()

                originalRequest.headers = originalRequest.headers ?? {}
                originalRequest.headers.Authorization = `Bearer ${accessToken}`

                return api.request(originalRequest)
            } catch (refreshError) {
                localStorage.removeItem("accessToken")
                if (window.location.pathname !== "/login") {
                    window.location.assign("/login")
                }
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    },
)

export default api
