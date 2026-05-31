"use client"

import { type ReactNode } from "react"
import { useCurrentUserQuery } from "@/shared/backend/queries/useCurrentUserQuery.ts"
import Loading from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import PermissionGuard from "@/shared/ui/PermissionGuard/PermissionGuard.tsx"
import { useCurrentUserPermissionsQuery } from "@shared/backend/queries/usePermissionsQuery.ts"

interface Props {
    permission: string | string[]
    children: ReactNode
    fallback?: ReactNode
    requireAll?: boolean
}

const AdminPermissionGuard = ({ permission, children, fallback, requireAll = true }: Props) => {
    const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUserQuery()

    const isAdmin = Boolean(currentUser?.admin)
    const { data: permissions = [], isLoading: isPermissionsLoading } =
        useCurrentUserPermissionsQuery(currentUser?.id, isAdmin)

    if (isCurrentUserLoading || (isAdmin && isPermissionsLoading)) {
        return <Loading />
    }

    const requiredPermissions = Array.isArray(permission) ? permission : [permission]
    const hasRequiredPermissions = requireAll
        ? requiredPermissions.every((item) =>
              permissions.some((permission) => permission.action === item),
          )
        : requiredPermissions.some((item) =>
              permissions.some((permission) => permission.action === item),
          )

    return (
        <PermissionGuard allowed={isAdmin && hasRequiredPermissions} fallback={fallback}>
            {children}
        </PermissionGuard>
    )
}

export default AdminPermissionGuard
