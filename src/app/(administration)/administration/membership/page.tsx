"use client"

import { Tabs } from "antd"
import { Suspense } from "react"

import MembershipRequestsTable from "@app/(administration)/administration/membership/(tabs)/MembershipRequestsTable/MembershipRequestsTable.tsx"
import MembershipDowngradeRequestsTable from "@app/(administration)/administration/membership/(tabs)/MembershipDowngradeRequestsTable/MembershipDowngradeRequestsTable.tsx"
import MembersTable from "@app/(administration)/administration/membership/(tabs)/MembersTable/MembersTable.tsx"
import MembershipTypesTable from "@app/(administration)/administration/membership/(tabs)/MembershipTypesTable/MembershipTypesTable.tsx"
import AdminPermissionGuard from "@shared/ui/PermissionGuard/AdminPermissionGuard.tsx"
import { useQueryParamTab } from "@shared/hooks/useQueryParamTab.ts"

const items = [
    {
        label: "Members",
        key: "members",
        children: (
            <AdminPermissionGuard permission="memberships.view">
                <MembersTable />
            </AdminPermissionGuard>
        ),
    },
    {
        label: "Membership Requests",
        key: "membership-requests",
        children: (
            <AdminPermissionGuard permission="memberships.view">
                <MembershipRequestsTable />
            </AdminPermissionGuard>
        ),
    },
    {
        label: "Membership Downgrade Requests",
        key: "downgrade-requests",
        children: (
            <AdminPermissionGuard permission="memberships.view">
                <MembershipDowngradeRequestsTable />
            </AdminPermissionGuard>
        ),
    },
    {
        label: "Membership Types",
        key: "membership-types",
        children: (
            <AdminPermissionGuard permission="memberships.view">
                <MembershipTypesTable />
            </AdminPermissionGuard>
        ),
    },
]

const MembershipTabs = () => {
    const { activeTab, setActiveTab } = useQueryParamTab({
        defaultTab: "members",
        tabKeys: items.map(({ key }) => key),
    })

    return (
        <AdminPermissionGuard permission="memberships.view">
            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                type="card"
                style={{ marginBottom: 32 }}
                items={items}
            />
        </AdminPermissionGuard>
    )
}

const Page = () => (
    <Suspense fallback={null}>
        <MembershipTabs />
    </Suspense>
)

export default Page
