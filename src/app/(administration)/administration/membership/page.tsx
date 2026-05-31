"use client"

import MembershipRequestsTable from "@app/(administration)/administration/membership/tabs/MembershipRequestsTable/MembershipRequestsTable.tsx"
import { usePermissions } from "@/context/PermissionsProvider.tsx"
import { Tabs } from "antd"
import MembershipDowngradeRequestsTable from "@app/(administration)/administration/membership/tabs/MembershipDowngradeRequestsTable/MembershipDowngradeRequestsTable.tsx"
import MembersTable from "@app/(administration)/administration/membership/tabs/MembersTable/MembersTable.tsx"

const items = [
    {
        label: `Members`,
        key: "members",
        children: <MembersTable />,
    },
    {
        label: `Membership Requests`,
        key: "membership-requests",
        children: <MembershipRequestsTable />,
    },
    {
        label: `Type Change Requests`,
        key: "downgrade-requests",
        children: <MembershipDowngradeRequestsTable />,
    },
]

const Page = () => {
    const { permissions } = usePermissions()

    const canView = permissions.includes("memberships.view")

    if (!canView) return <span>Don't have permissions</span>

    return (
        <Tabs
            defaultActiveKey="membership-requests"
            type={"card"}
            style={{ marginBottom: 32 }}
            items={items}
        />
    )
}

export default Page
