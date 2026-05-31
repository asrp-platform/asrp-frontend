"use client"

import AdminPermissionGuard from "@/shared/ui/PermissionGuard/AdminPermissionGuard.tsx"
import MembershipRequestsTable from "../membership/tabs/MembershipRequestsTable/MembershipRequestsTable"

const Page = () => {
    return (
        <AdminPermissionGuard permission="memberships.view">
            <MembershipRequestsTable />
        </AdminPermissionGuard>
    )
}

export default Page
