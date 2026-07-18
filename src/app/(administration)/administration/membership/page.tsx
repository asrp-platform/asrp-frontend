"use client"

import MembershipRequestsTable from "@app/(administration)/administration/membership/(tabs)/MembershipRequestsTable/MembershipRequestsTable.tsx"
import { Tabs } from "antd"
import MembershipDowngradeRequestsTable from "@app/(administration)/administration/membership/(tabs)/MembershipDowngradeRequestsTable/MembershipDowngradeRequestsTable.tsx"
import MembersTable from "@app/(administration)/administration/membership/(tabs)/MembersTable/MembersTable.tsx"
import AdminPermissionGuard from "@shared/ui/PermissionGuard/AdminPermissionGuard.tsx"
import MembershipTypesTable from "@app/(administration)/administration/membership/(tabs)/MembershipTypesTable/MembershipTypesTable.tsx"

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
        label: `Membership Downgrade Requests`,
        key: "downgrade-requests",
        children: <MembershipDowngradeRequestsTable />,
    },
    {
        label: `Membership Types`,
        key: "membership-types",
        children: <MembershipTypesTable />,
    },
]

const Page = () => {
    return (
        <AdminPermissionGuard permission={"memberships.view"}>
            <Tabs
                defaultActiveKey="members"
                type={"card"}
                style={{ marginBottom: 32 }}
                items={items}
            />
        </AdminPermissionGuard>
    )
}

export default Page
