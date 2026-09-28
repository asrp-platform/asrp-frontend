"use client"

import { Tabs } from "antd"
import { Suspense } from "react"

import { ContactMessageTable } from "@app/(administration)/administration/contact-messages/(ui)/ContactMessageTable/ContactMesssageTable.tsx"
import { ContactMessageType } from "@/entities/ContactMessage.ts"
import AdminPermissionGuard from "@/shared/ui/PermissionGuard/AdminPermissionGuard.tsx"
import { useQueryParamTab } from "@shared/hooks/useQueryParamTab.ts"

const items = [
    {
        label: "Contact",
        key: "contact",
        children: <ContactMessageTable contactMessageType={ContactMessageType.Contact} />,
    },
    {
        label: "Get Involved",
        key: "get-involved",
        children: <ContactMessageTable contactMessageType={ContactMessageType.GetInvolved} />,
    },
    {
        label: "Get Involved Committees",
        key: "get-involved-committees",
        children: (
            <ContactMessageTable contactMessageType={ContactMessageType.GetInvolvedCommittees} />
        ),
    },
    {
        label: "Donations",
        key: "donations",
        children: (
            <ContactMessageTable contactMessageType={ContactMessageType.DonationSponsorship} />
        ),
    },
]

const ContactMessagesTabs = () => {
    const { activeTab, setActiveTab } = useQueryParamTab({
        defaultTab: "contact",
        tabKeys: items.map(({ key }) => key),
    })

    return (
        <AdminPermissionGuard permission="feedback.view">
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
        <ContactMessagesTabs />
    </Suspense>
)

export default Page
