"use client"

import { type ReactNode } from "react"

import AccessDenied from "@shared/ui/PermissionGuard/AccessDenied.tsx"
import { useAdminPermissions } from "@shared/backend/queries/usePermissionsQuery.ts"
import Loading from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"

interface Props {
    permission: string | string[]
    children: ReactNode
    fallback?: ReactNode
    requireAll?: boolean
}

/** Guards an individual create/update/delete control or an inline editor. */
const AdminActionGuard = ({ permission, children, fallback, requireAll = true }: Props) => {
    const { isLoading, can } = useAdminPermissions()

    if (isLoading) return <Loading />

    const requiredPermissions = Array.isArray(permission) ? permission : [permission]
    const allowed = requireAll ? requiredPermissions.every(can) : requiredPermissions.some(can)

    return allowed ? <>{children}</> : (fallback ?? <AccessDenied compact />)
}

export default AdminActionGuard
