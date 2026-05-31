import api from "@/axios.ts"
import type { IPermission } from "@entities/Permission.ts"
import { getUserPermissionsStuffUrl } from "@shared/backend/restApiUrls/admin/adminApiUrls.ts"
import { useQuery } from "@tanstack/react-query"

export const CURRENT_USER_PERMISSIONS_QUERY_KEY = ["current-user-permissions"]

const CURRENT_USER_PERMISSIONS_LIFETIME = 1000 * 60 * 60

const fetchCurrentUserPermissions = async (currentUserId: string | number) => {
    const response = await api.get<IPermission[]>(getUserPermissionsStuffUrl(currentUserId))
    return response.data
}

export const useCurrentUserPermissionsQuery = (
    currentUserId: string | number | undefined,
    enabled = false,
) => {
    return useQuery({
        queryKey: [...CURRENT_USER_PERMISSIONS_QUERY_KEY, currentUserId],
        queryFn: () => fetchCurrentUserPermissions(currentUserId as string | number),
        staleTime: CURRENT_USER_PERMISSIONS_LIFETIME,
        retry: false,
        enabled: enabled && currentUserId != null,
    })
}
