"use client"

import { type ReactNode } from "react"
<<<<<<< HEAD
import Loading from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import PermissionGuard from "@/shared/ui/PermissionGuard/PermissionGuard.tsx"
import { useCurrentUserPermissionsQuery } from "@shared/backend/queries/usePermissionsQuery.ts"
=======
import { useCurrentUserQuery } from "@/shared/backend/queries/useCurrentUserQuery.ts"
import { usePermissions } from "@/context/PermissionsProvider.tsx"
import Loading from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import PermissionGuard from "@/shared/ui/PermissionGuard/PermissionGuard.tsx"
>>>>>>> 1da83e1 (Feature: add AdminPermissionGuard component (#33))

interface Props {
    permission: string | string[]
    children: ReactNode
    fallback?: ReactNode
    requireAll?: boolean
}

const AdminPermissionGuard = ({ permission, children, fallback, requireAll = true }: Props) => {
<<<<<<< HEAD
    const { data: permissions = [], isAdmin, isLoading } = useCurrentUserPermissionsQuery()

    if (isLoading) {
=======
    const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUserQuery()
    const { permissions, isPermissionsLoading } = usePermissions()

    const isAdmin = Boolean(currentUser?.admin)

    if (isCurrentUserLoading || (isAdmin && isPermissionsLoading)) {
>>>>>>> 1da83e1 (Feature: add AdminPermissionGuard component (#33))
        return <Loading />
    }

    const requiredPermissions = Array.isArray(permission) ? permission : [permission]
    const hasRequiredPermissions = requireAll
<<<<<<< HEAD
        ? requiredPermissions.every((item) =>
              permissions.some((permission) => permission.action === item),
          )
        : requiredPermissions.some((item) =>
              permissions.some((permission) => permission.action === item),
          )
=======
        ? requiredPermissions.every((item) => permissions.includes(item))
        : requiredPermissions.some((item) => permissions.includes(item))
>>>>>>> 1da83e1 (Feature: add AdminPermissionGuard component (#33))

    return (
        <PermissionGuard allowed={isAdmin && hasRequiredPermissions} fallback={fallback}>
            {children}
        </PermissionGuard>
    )
}

export default AdminPermissionGuard
