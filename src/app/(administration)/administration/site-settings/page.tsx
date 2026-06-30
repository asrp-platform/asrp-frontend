"use client"

import { BylawsFileCard } from "@app/(administration)/administration/site-settings/ui/Bylaws.tsx"
import SponsorsManagement from "@app/(administration)/administration/site-settings/ui/SponsorsManagement"
import AdminPermissionGuard from "@/shared/ui/PermissionGuard/AdminPermissionGuard.tsx"
import { Tabs } from "antd"

const Page = () => {
    return (
        <AdminPermissionGuard permission="legal_documents.view">
            <Tabs
                defaultActiveKey="bylaws"
                type={"card"}
                items={[
                    {
                        key: "bylaws",
                        label: "Bylaws",
                        children: <BylawsFileCard />,
                    },
                    {
                        key: "sponsors",
                        label: "Sponsors",
                        children: <SponsorsManagement />,
                    },
                ]}
            />
        </AdminPermissionGuard>
    )
}

export default Page
