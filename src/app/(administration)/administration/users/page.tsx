"use client"

import { Tabs } from "antd"
import AdminPermissionGuard from "@/shared/ui/PermissionGuard/AdminPermissionGuard.tsx"
import UsersTable from "@app/(administration)/administration/users/(tabs)/UsersTable.tsx"
import NameChangeRequestsTable from "@app/(administration)/administration/users/(tabs)/NameChangeRequestsTable.tsx"
import AdministratorsPermissions from "@app/(administration)/administration/users/(tabs)/AdministratorsPermissions.tsx"

const Page = () => {
    const items = [
        {
            label: `Users`,
            key: "users",
            children: (
                <AdminPermissionGuard permission="admin.view">
                    <UsersTable />
                </AdminPermissionGuard>
            ),
        },
        {
            label: `Name change requests`,
            key: "name-changes",
            children: (
                <AdminPermissionGuard permission="name_change_requests.view">
                    <NameChangeRequestsTable />
                </AdminPermissionGuard>
            ),
        },
        {
            label: `Administrators & Permissions`,
            key: "administrators-permissions",
            children: (
                <AdminPermissionGuard permission="permissions.view">
                    <AdministratorsPermissions />
                </AdminPermissionGuard>
            ),
        },
    ]

    return <Tabs defaultActiveKey="1" type="card" style={{ marginBottom: 32 }} items={items} />
}

export default Page
