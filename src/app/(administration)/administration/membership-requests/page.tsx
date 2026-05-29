"use client"

import MembershipRequestsTable from "@/app/(administration)/administration/membership-requests/ui/MembershipRequestsTable.tsx"
import AdminPermissionGuard from "@/shared/ui/PermissionGuard/AdminPermissionGuard.tsx"

const Page = () => {
    return (
        <AdminPermissionGuard permission="memberships.view">
            <MembershipRequestsTable />
        </AdminPermissionGuard>
    )
}

export default Page
