import api from "@/axios.ts"
import type { IPermission } from "@entities/Permission.ts"
import { getAdminUserPermissionsUrl } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { useQuery } from "@tanstack/react-query"
import { useCurrentUserQuery } from "@shared/backend/queries/useCurrentUserQuery.ts"

export const CURRENT_USER_PERMISSIONS_QUERY_KEY = ["current-user-permissions"]

const CURRENT_USER_PERMISSIONS_LIFETIME = 1000 * 60 * 60

const fetchCurrentUserPermissions = async (currentUserId: string | number) => {
    const response = await api.get<IPermission[]>(getAdminUserPermissionsUrl(currentUserId))
    return response.data
}

export const useCurrentUserPermissionsQuery = () => {
    const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUserQuery()
    const isAdmin = Boolean(currentUser?.admin)
    const currentUserId = currentUser?.id

    const permissionsQuery = useQuery({
        queryKey: [...CURRENT_USER_PERMISSIONS_QUERY_KEY, currentUserId],
        queryFn: () => fetchCurrentUserPermissions(currentUserId as string | number),
        staleTime: CURRENT_USER_PERMISSIONS_LIFETIME,
        retry: false,
        enabled: isAdmin && currentUserId != null,
    })

    return {
        ...permissionsQuery,
        currentUser,
        isAdmin,
        isCurrentUserLoading,
        isLoading: isCurrentUserLoading || (isAdmin && permissionsQuery.isLoading),
    }
}
