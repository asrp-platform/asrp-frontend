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

/**
 * Centralised permission helpers for the administration UI. Keeping the
 * checks here prevents individual screens from accidentally treating an
 * administrator as all-powerful or forgetting to require the `view` action.
 */
export const useAdminPermissions = () => {
    const query = useCurrentUserPermissionsQuery()
    const actions = query.data?.map(({ action }) => action) ?? []

    const can = (permission: string) => query.isAdmin && actions.includes(permission)
    const canAny = (permissions: string[]) => permissions.some(can)
    const canAll = (permissions: string[]) => permissions.every(can)

    return {
        ...query,
        actions,
        can,
        canAny,
        canAll,
    }
}
