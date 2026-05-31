import type { AdminMembershipTypeChangeRequest } from "@entities/MembershipTypeChangeRequest.ts"
import { MEMBERSHIP_DOWNGRADE_REQUESTS_ADMIN_URL } from "@shared/backend/restApiUrls/admin/membershipsAdminUrls.ts"
import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"

export const MEMBERSHIP_TYPE_CHANGE_REQUESTS_QUERY_KEY = ["membership-downgrade-requests"]

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
    return useTableDataQuery<AdminMembershipTypeChangeRequest, MembershipTypeChangeRequestsFilters>(
        {
            url: MEMBERSHIP_DOWNGRADE_REQUESTS_ADMIN_URL,
            queryKey: MEMBERSHIP_TYPE_CHANGE_REQUESTS_QUERY_KEY,
            page,
            pageSize,
            ordering,
            filters,
        },
    )
}
