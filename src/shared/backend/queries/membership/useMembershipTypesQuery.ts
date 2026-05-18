import api from "@/axios.ts"
import type { IMembershipType } from "@/entities/Membership.ts"
import { useQuery } from "@tanstack/react-query"
import { MEMBERSHIP_TYPES_URL } from "@shared/backend/rest-api-urls/restApiUrls.ts"

export const MEMBERSHIP_TYPES_QUERY_KEY = ["membership-types"]

const fetchMembershipTypes = async (onlyPurchasable = true) => {
    const response = await api.get<IMembershipType[]>(
        `${MEMBERSHIP_TYPES_URL}?is_purchasable=${onlyPurchasable}`,
    )
    return response.data
}

export const useMembershipTypesQuery = (onlyPurchasable = true) => {
    return useQuery({
        queryKey: MEMBERSHIP_TYPES_QUERY_KEY,
        queryFn: () => fetchMembershipTypes(onlyPurchasable),
        staleTime: 1000 * 60 * 5,
        retry: false,
    })
}
