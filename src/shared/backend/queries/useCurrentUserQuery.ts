import api from "@/axios.ts"
import type { IUserPrivate } from "@/entities/User.ts"
import { useQuery } from "@tanstack/react-query"
import { CURRENT_USER_URL } from "@shared/backend/restApiUrls/currentUserUrls.ts"

export const CURRENT_USER_QUERY_KEY = ["current-user"]

const CURRENT_USER_LIFETIME = 1000 * 60 * 60

const fetchCurrentUser = async () => {
    const response = await api.get<IUserPrivate>(CURRENT_USER_URL, { withCredentials: true })
    return response.data
}

export const useCurrentUserQuery = () => {
    return useQuery({
        queryKey: CURRENT_USER_QUERY_KEY,
        queryFn: fetchCurrentUser,
        staleTime: CURRENT_USER_LIFETIME,
        retry: false,
        refetchOnMount: false,
    })
}
