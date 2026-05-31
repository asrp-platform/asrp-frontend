"use client"

import { Tabs } from "antd"
<<<<<<< HEAD
import AdminPermissionGuard from "@/shared/ui/PermissionGuard/AdminPermissionGuard.tsx"
import UsersTable from "@app/(administration)/administration/users/(tabs)/UsersTable.tsx"
import NameChangeRequestsTable from "@app/(administration)/administration/users/(tabs)/NameChangeRequestsTable.tsx"
import AdministratorsPermissions from "@app/(administration)/administration/users/(tabs)/AdministratorsPermissions.tsx"
=======
import UsersTable from "@/app/(administration)/administration/users/tabs/UsersTable.tsx"
import NameChangeRequestsTable from "@/app/(administration)/administration/users/tabs/NameChangeRequestsTable.tsx"
import AdministratorsPermissions from "@/app/(administration)/administration/users/tabs/AdministratorsPermissions.tsx"
import AdminPermissionGuard from "@/shared/ui/PermissionGuard/AdminPermissionGuard.tsx"
>>>>>>> 1da83e1 (Feature: add AdminPermissionGuard component (#33))

const Page = () => {
    const items = [
        {
            label: `Users`,
            key: "users",
            children: <UsersTable />,
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
