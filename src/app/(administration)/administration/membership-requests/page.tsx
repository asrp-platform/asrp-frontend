"use client"

import MembershipRequestsTable from "./ui/MembershipRequestsTable.tsx"
import { usePermissions } from "../../../../context/PermissionsProvider.tsx"

const Page = () => {
    const { permissions } = usePermissions()

    const canView = permissions.includes("memberships.view")

    if (!canView) return <span>Don't have permissions</span>

    return <MembershipRequestsTable />
}

export default Page
