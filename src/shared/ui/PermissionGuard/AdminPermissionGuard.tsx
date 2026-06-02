"use client"

import { type ReactNode } from "react"
import { useCurrentUserQuery } from "@/shared/backend/queries/useCurrentUserQuery.ts"
import { usePermissions } from "@/context/PermissionsProvider.tsx"
import Loading from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import PermissionGuard from "@/shared/ui/PermissionGuard/PermissionGuard.tsx"

interface Props {
    permission: string | string[]
    children: ReactNode
    fallback?: ReactNode
    requireAll?: boolean
}

const AdminPermissionGuard = ({ permission, children, fallback, requireAll = true }: Props) => {
    const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUserQuery()
    const { permissions, isPermissionsLoading } = usePermissions()

    const isAdmin = Boolean(currentUser?.admin)

    if (isCurrentUserLoading || (isAdmin && isPermissionsLoading)) {
        return <Loading />
    }

    const requiredPermissions = Array.isArray(permission) ? permission : [permission]
    const hasRequiredPermissions = requireAll
        ? requiredPermissions.every((item) => permissions.includes(item))
        : requiredPermissions.some((item) => permissions.includes(item))

    return (
        <PermissionGuard allowed={isAdmin && hasRequiredPermissions} fallback={fallback}>
            {children}
        </PermissionGuard>
    )
}

export default AdminPermissionGuard
