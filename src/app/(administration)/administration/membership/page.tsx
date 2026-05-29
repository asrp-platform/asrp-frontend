"use client"

import MembershipRequestsTable from "@app/(administration)/administration/membership/tabs/MembershipRequestsTable/MembershipRequestsTable.tsx"
import { usePermissions } from "@/context/PermissionsProvider.tsx"
import { Tabs } from "antd"
import TypeChangeRequestsTable from "@app/(administration)/administration/membership/tabs/TypeChangeRequestsTable/TypeChangeRequestsTable.tsx"

const items = [
    {
        label: `Members`,
        key: "members",
        children: <div>Members</div>,
    },
    {
        label: `Membership Requests`,
        key: "membership-requests",
        children: <MembershipRequestsTable />,
    },
    {
        label: `Type Change Requests`,
        key: "downgrade-requests",
        children: <TypeChangeRequestsTable />,
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
