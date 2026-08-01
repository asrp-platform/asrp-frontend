import api from "@/axios.ts"
import type { MembershipDowngradeRequest } from "@entities/MembershipDowngradeRequest.ts"
import { CURRENT_USER_MEMBERSHIP_DOWNGRADE_REQUEST_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import { useQuery } from "@tanstack/react-query"

export const CURRENT_USER_MEMBERSHIP_DOWNGRADE_REQUEST_QUERY_KEY = [
    "current-user-membership-downgrade-request",
]

const fetchCurrentUserMembershipTypeChangeRequest = async () => {
    const response = await api.get<MembershipDowngradeRequest | null>(
        CURRENT_USER_MEMBERSHIP_DOWNGRADE_REQUEST_URL,
    )

    return response.data
}

export const useCurrentUserMembershipDowngradeRequestQuery = () => {
    return useQuery({
        queryKey: CURRENT_USER_MEMBERSHIP_DOWNGRADE_REQUEST_QUERY_KEY,
        queryFn: fetchCurrentUserMembershipTypeChangeRequest,
    })
}
