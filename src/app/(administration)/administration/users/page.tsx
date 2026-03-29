"use client"

import { Tabs } from "antd"
import UsersTable from "./tabs/UsersTable.tsx"
import NameChangeRequestsTable from "./tabs/NameChangeRequestsTable.tsx"
import AdministratorsPermissions from "./tabs/AdministratorsPermissions.tsx"

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
            children: <NameChangeRequestsTable />,
        },
        {
            label: `Administrators & Permissions`,
            key: "administrators-permissions",
            children: <AdministratorsPermissions />,
        },
    ]

    return <Tabs defaultActiveKey="1" type="card" style={{ marginBottom: 32 }} items={items} />
}

export default Page
