"use client"

import { Tabs, Typography } from "antd"

import CaseOfTheMonthTab from "@app/(administration)/administration/content/(tabs)/CaseOfTheMonthTab/CaseOfTheMonthTab.tsx"
import NewsAndEventsTab from "@app/(administration)/administration/content/(tabs)/NewsAndEventsTab/NewsAndEventsTab.tsx"
import WebinarsTab from "@app/(administration)/administration/content/(tabs)/WebinarsTab/WebinarsTab.tsx"

const Page = () => {
    const items = [
        {
            key: "education",
            label: "Education",
            children: <WebinarsTab />,
        },
        {
            key: "news-and-events",
            label: "News & Events",
            children: <NewsAndEventsTab />,
        },
        {
            key: "case-of-the-month",
            label: "Case of the Month",
            children: <CaseOfTheMonthTab />,
        },
    ]

    return (
        <>
            <Typography.Title level={2}>Content</Typography.Title>
            <Tabs defaultActiveKey="education" type="card" items={items} />
        </>
    )
}

export default Page
