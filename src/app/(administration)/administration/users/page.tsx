"use client"

import { Tabs } from "antd"
import { Suspense } from "react"

import AdminPermissionGuard from "@/shared/ui/PermissionGuard/AdminPermissionGuard.tsx"
import AdministratorsPermissions from "@app/(administration)/administration/users/(tabs)/AdministratorsPermissions.tsx"
import NameChangeRequestsTable from "@app/(administration)/administration/users/(tabs)/NameChangeRequestsTable.tsx"
import UsersTable from "@app/(administration)/administration/users/(tabs)/UsersTable.tsx"
import { useQueryParamTab } from "@shared/hooks/useQueryParamTab.ts"

import { useAdminAttentionQuery } from "@shared/backend/queries/useAdminAttentionQuery"
import AdminAttentionLabel from "@shared/ui/AdminAttentionLabel/AdminAttentionLabel"

const items = [
    {
        label: "Users",
        key: "users",
        children: (
            <AdminPermissionGuard permission="admin.view">
                <UsersTable />
            </AdminPermissionGuard>
        ),
    },
    {
        label: "Name change requests",
        key: "name-changes",
        children: (
            <AdminPermissionGuard permission="name_change_requests.view">
                <NameChangeRequestsTable />
            </AdminPermissionGuard>
        ),
    },
    {
        label: "Administrators & Permissions",
        key: "administrators-permissions",
        children: (
            <AdminPermissionGuard permission="permissions.view">
                <AdministratorsPermissions />
            </AdminPermissionGuard>
        ),
    },
]

const UsersTabs = () => {
    const { nameChangeCount } = useAdminAttentionQuery()
    const counts: Record<string, number | undefined> = { "name-changes": nameChangeCount }
    const tabs = items.map((item) => ({
        ...item,
        label: <AdminAttentionLabel count={counts[item.key]}>{item.label}</AdminAttentionLabel>,
    }))
    const { activeTab, setActiveTab } = useQueryParamTab({
        defaultTab: "users",
        tabKeys: items.map(({ key }) => key),
    })

    return (
        <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            type="card"
            style={{ marginBottom: 32 }}
            items={tabs}
        />
    )
}

const Page = () => (
    <Suspense fallback={null}>
        <UsersTabs />
    </Suspense>
)

export default Page
