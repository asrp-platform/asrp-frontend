import { useQuery } from "@tanstack/react-query"

import api from "@/axios.ts"
import type { IMemberDirectoryItem, IMembersDirectoryFilters } from "@/entities/MemberDirectory.ts"
import { MEMBERS_URL } from "@/shared/backend/restApiUrls/restApiUrls.ts"
import type { IPaginatedBackendResponse } from "@shared/interfaces.ts"

export const MEMBERS_DIRECTORY_QUERY_KEY = ["members-directory"]

interface MembersDirectoryQueryParams {
    page: number
    pageSize: number
    filters: IMembersDirectoryFilters
    enabled?: boolean
}

export const useMembersDirectoryQuery = ({
    page,
    pageSize,
    filters,
    enabled = true,
}: MembersDirectoryQueryParams) =>
    useQuery<IPaginatedBackendResponse<IMemberDirectoryItem>>({
        queryKey: [...MEMBERS_DIRECTORY_QUERY_KEY, page, pageSize, filters],
        queryFn: async () => {
            const response = await api.get<IPaginatedBackendResponse<IMemberDirectoryItem>>(
                MEMBERS_URL,
                {
                    params: {
                        page,
                        page_size: pageSize,
                        ...filters,
                    },
                },
            )

            return response.data
        },
        enabled,
        placeholderData: (previousData) => previousData,
        staleTime: 1000 * 60 * 5,
        retry: false,
    })
