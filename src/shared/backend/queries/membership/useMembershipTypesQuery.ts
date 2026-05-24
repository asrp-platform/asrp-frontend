import api from "@/axios.ts"
import type { IMembershipType } from "@/entities/Membership.ts"
import { useQuery } from "@tanstack/react-query"
import { MEMBERSHIP_TYPES_URL } from "@shared/backend/rest-api-urls/restApiUrls.ts"

export const MEMBERSHIP_TYPES_QUERY_KEY = ["membership-types"]

interface IFilters {
    is_purchasable?: boolean
    price_usd__lt?: number
}

const fetchMembershipTypes = async (filters: IFilters = {}) => {
    const searchParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            searchParams.append(key, String(value))
        }
    })

    const queryString = searchParams.toString()

    const response = await api.get<IMembershipType[]>(
        queryString ? `${MEMBERSHIP_TYPES_URL}?${queryString}` : MEMBERSHIP_TYPES_URL,
    )
    return response.data
}

export const useMembershipTypesQuery = (filters: IFilters = {}, enabled = true) => {
    return useQuery({
        queryKey: [...MEMBERSHIP_TYPES_QUERY_KEY, filters],
        queryFn: () => fetchMembershipTypes(filters),
        staleTime: 1000 * 60 * 5,
        retry: false,
        enabled: enabled,
    })
}
