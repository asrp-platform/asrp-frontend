"use client"

import { type ReactNode } from "react"
import Loading from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import PermissionGuard from "@/shared/ui/PermissionGuard/PermissionGuard.tsx"
import { useAdminPermissions } from "@shared/backend/queries/usePermissionsQuery.ts"

interface Props {
    permission: string | string[]
    children: ReactNode
    fallback?: ReactNode
    requireAll?: boolean
}

const AdminPermissionGuard = ({ permission, children, fallback, requireAll = true }: Props) => {
    const { isLoading, can } = useAdminPermissions()

    if (isLoading) {
        return <Loading />
    }

    const requiredPermissions = Array.isArray(permission) ? permission : [permission]
    const hasRequiredPermissions = requireAll
        ? requiredPermissions.every(can)
        : requiredPermissions.some(can)

    return (
        <PermissionGuard allowed={hasRequiredPermissions} fallback={fallback}>
            {children}
        </PermissionGuard>
    )
}

export default AdminPermissionGuard
