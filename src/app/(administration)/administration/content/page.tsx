"use client"

import { Tabs, Typography } from "antd"

import CaseOfTheMonthTab from "@app/(administration)/administration/content/CaseOfTheMonthTab.tsx"
import WebinarsTable from "@app/(administration)/administration/content/(components)/WebinarsTable.tsx"
import NewsTable from "@app/(administration)/administration/content/NewsTable.tsx"
import newsStyles from "@app/(administration)/administration/content/styles.module.scss"

const NewsAndEventsTab = () => (
    <section className={newsStyles.page}>
        <header className={newsStyles.header}>
            <div>
                <span className={newsStyles.eyebrow}>Content management</span>
                <h1>News &amp; Events</h1>
                <p>Review publication status, find articles and open their public pages.</p>
            </div>
        </header>
        <NewsTable />
    </section>
)

const Page = () => {
    const items = [
        {
            key: "education",
            label: "Education",
            children: <WebinarsTable />,
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
