import api from "../../../../axios.ts"
import { CURRENT_USER_MEMBERSHIP_REQUEST_URL } from "../../rest-api-urls/currentUserUrls.ts"
import type { IMembershipRequest } from "../../../../entities/Membership.ts"
import { useQuery } from "@tanstack/react-query"

export const CURRENT_USER_MEMBERSHIP_REQUEST_QUERY_KEY = ["current-user-membership-request"]

const fetchCurrentUserMembershipRequest = async () => {
    const response = await api.get<IMembershipRequest>(CURRENT_USER_MEMBERSHIP_REQUEST_URL)
    return response.data
}

export const useCurrentUserMembershipRequestQuery = () => {
    return useQuery({
        queryKey: CURRENT_USER_MEMBERSHIP_REQUEST_QUERY_KEY,
        queryFn: fetchCurrentUserMembershipRequest,
        staleTime: 1000 * 60 * 5,
        retry: false,
    })
}
