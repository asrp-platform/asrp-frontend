"use client"

import { Tabs } from "antd"
import WebinarsTable from "@app/(administration)/administration/education/(components)/WebinarsTable.tsx"

const Page = () => {
    const items = [
        {
            label: `Webinars`,
            key: "webinars",
            children: <WebinarsTable />,
        },
    ]

    return (
        <Tabs defaultActiveKey="webinars" type="card" style={{ marginBottom: 32 }} items={items} />
    )
}

export default Page
