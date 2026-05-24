import type { MembershipTypeChangeRequest } from "@entities/MembershipTypeChangeRequest.ts"
import { MEMBERSHIP_TYPE_CHANGE_REQUESTS_ADMIN_URL } from "@shared/backend/rest-api-urls/admin/membershipsAdminUrls.ts"
import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import type { IPaginatedBackendResponse } from "@shared/types/interfaces.ts"

export const MEMBERSHIP_TYPE_CHANGE_REQUESTS_QUERY_KEY = ["membership-type-change-requests"]

export interface MembershipTypeChangeRequestsFilters {
    pending?: boolean
    approved?: boolean
    upgrade?: boolean
}

interface UseMembershipTypeChangeRequestsQueryParams {
    page: number
    pageSize: number
    ordering?: string[]
    filters?: MembershipTypeChangeRequestsFilters
}

export const useMembershipTypeChangeRequestsQuery = ({
    page,
    pageSize,
    ordering = [],
    filters = {},
}: UseMembershipTypeChangeRequestsQueryParams) => {
    return useTableDataQuery<
        IPaginatedBackendResponse<MembershipTypeChangeRequest>,
        MembershipTypeChangeRequestsFilters
    >({
        url: MEMBERSHIP_TYPE_CHANGE_REQUESTS_ADMIN_URL,
        queryKey: MEMBERSHIP_TYPE_CHANGE_REQUESTS_QUERY_KEY,
        page,
        pageSize,
        ordering,
        filters,
    })
}
