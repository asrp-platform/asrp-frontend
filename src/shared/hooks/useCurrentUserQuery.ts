import api from "../../axios.ts"
import type { IUser } from "../../entities/User.ts"
import { CURRENT_USER_URL } from "../backend/currentUserUrls.ts"
import { useQuery } from "@tanstack/react-query"

export const CURRENT_USER_QUERY_KEY = ["current-user"]

const CURRENT_USER_LIFETIME = 1000 * 60 * 5

const fetchCurrentUser = async () => {
    try {
        const response = await api.get<IUser>(CURRENT_USER_URL, { withCredentials: true })
        return response.data
    } catch (error: any) {
        if (error?.response?.status === 401) {
            return null
        }
        throw error
    }
}

export const useCurrentUserQuery = () => {
    return useQuery({
        queryKey: CURRENT_USER_QUERY_KEY,
        queryFn: fetchCurrentUser,
        staleTime: CURRENT_USER_LIFETIME,
        retry: false,
    })
}
