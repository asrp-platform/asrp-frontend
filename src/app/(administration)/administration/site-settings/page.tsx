"use client"

import { Tabs } from "antd"
import { Suspense } from "react"

import { BylawsFileCard } from "@app/(administration)/administration/site-settings/ui/Bylaws.tsx"
import SponsorsManagement from "@app/(administration)/administration/site-settings/ui/SponsorsManagement"
import AdminPermissionGuard from "@/shared/ui/PermissionGuard/AdminPermissionGuard.tsx"
import { useQueryParamTab } from "@shared/hooks/useQueryParamTab.ts"

const items = [
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
]

const SiteSettingsTabs = () => {
    const { activeTab, setActiveTab } = useQueryParamTab({
        defaultTab: "bylaws",
        tabKeys: items.map(({ key }) => key),
    })

    return (
        <AdminPermissionGuard permission="legal_documents.view">
            <Tabs activeKey={activeTab} onChange={setActiveTab} type="card" items={items} />
        </AdminPermissionGuard>
    )
}

const Page = () => (
    <Suspense fallback={null}>
        <SiteSettingsTabs />
    </Suspense>
)

export default Page
