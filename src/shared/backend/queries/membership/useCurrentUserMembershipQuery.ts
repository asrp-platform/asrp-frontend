import api from "@/axios.ts"
import { CURRENT_USER_MEMBERSHIP_URL } from "@shared/backend/rest-api-urls/currentUserUrls.ts"
import type { IUserMembership } from "@entities/Membership.ts"
import { useQuery } from "@tanstack/react-query"

export const CURRENT_USER_MEMBERSHIP_QUERY_KEY = ["current-user-membership"]

const fetchCurrentUserMembership = async () => {
    const response = await api.get<IUserMembership>(CURRENT_USER_MEMBERSHIP_URL)
    return response.data
}

export const useCurrentUserMembershipQuery = (enabled = true) => {
    return useQuery({
        queryKey: CURRENT_USER_MEMBERSHIP_QUERY_KEY,
        queryFn: fetchCurrentUserMembership,
        staleTime: 1000 * 60 * 5,
        retry: true,
        enabled: enabled,
    })
}
