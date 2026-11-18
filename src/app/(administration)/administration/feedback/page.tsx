"use client"

import { Tabs } from "antd"
import { Suspense } from "react"

import { ContactMessageTable } from "@app/(administration)/administration/feedback/(ui)/ContactMessageTable/ContactMesssageTable.tsx"
import { ContactMessageType } from "@/entities/ContactMessage.ts"
import AdminPermissionGuard from "@/shared/ui/PermissionGuard/AdminPermissionGuard.tsx"
import { useQueryParamTab } from "@shared/hooks/useQueryParamTab.ts"

import { useAdminAttentionQuery } from "@shared/backend/queries/useAdminAttentionQuery"
import AdminAttentionLabel from "@shared/ui/AdminAttentionLabel/AdminAttentionLabel"

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
    const { feedbackCounts } = useAdminAttentionQuery()
    const counts: Record<string, number | undefined> = {
        contact: feedbackCounts?.CONTACT,
        "get-involved": feedbackCounts?.GET_INVOLVED,
        "get-involved-committees": feedbackCounts?.GET_INVOLVED_COMMITTEES,
        donations: feedbackCounts?.DONATION_SPONSORSHIP,
    }
    const tabs = items.map((item) => ({
        ...item,
        label: (
            <AdminAttentionLabel tabMode count={counts[item.key]}>
                {item.label}
            </AdminAttentionLabel>
        ),
    }))
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
                items={tabs}
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
