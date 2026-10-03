"use client"

import { Tabs } from "antd"
import { Suspense } from "react"

import LegalDocuments from "@app/(administration)/administration/site-settings/ui/LegalDocuments.tsx"
import SponsorsManagement from "@app/(administration)/administration/site-settings/ui/SponsorsManagement"
import AdminPermissionGuard from "@/shared/ui/PermissionGuard/AdminPermissionGuard.tsx"
import { useQueryParamTab } from "@shared/hooks/useQueryParamTab.ts"

const items = [
    {
        key: "legal-documents",
        label: "Legal Documents",
        children: (
            <AdminPermissionGuard permission="legal_documents.view">
                <LegalDocuments />
            </AdminPermissionGuard>
        ),
    },
    {
        key: "sponsors",
        label: "Sponsors",
        children: (
            <AdminPermissionGuard permission="legal_documents.view">
                <SponsorsManagement />
            </AdminPermissionGuard>
        ),
    },
]

const SiteSettingsTabs = () => {
    const { activeTab, setActiveTab } = useQueryParamTab({
        defaultTab: "legal-documents",
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
