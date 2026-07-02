"use client"

import { Tabs } from "antd"
import { ContactMessageTable } from "@app/(administration)/administration/contact-messages/(ui)/ContactMessageTable/ContactMesssageTable.tsx"
import { ContactMessageType } from "@/entities/ContactMessage.ts"

const Page = () => {
    const items = [
        {
            label: `Contact`,
            key: "contact",
            children: <ContactMessageTable contactMessageType={ContactMessageType.Contact} />,
        },
        {
            label: `Get Involved`,
            key: "get-involved",
            children: <ContactMessageTable contactMessageType={ContactMessageType.GetInvolved} />,
        },
        {
            label: `Get Involved Committees`,
            key: "get-involved-committees",
            children: (
                <ContactMessageTable
                    contactMessageType={ContactMessageType.GetInvolvedCommittees}
                />
            ),
        },
        {
            label: `Donations`,
            key: "donations",
            children: (
                <ContactMessageTable contactMessageType={ContactMessageType.DonationSponsorship} />
            ),
        },
    ]

    return <Tabs defaultActiveKey="1" type="card" style={{ marginBottom: 32 }} items={items} />
}

export default Page
