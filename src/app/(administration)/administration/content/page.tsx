"use client"

import { Tabs, Typography } from "antd"
import { Suspense } from "react"

import CaseOfTheMonthTab from "@app/(administration)/administration/content/(tabs)/CaseOfTheMonthTab/CaseOfTheMonthTab.tsx"
import NewsAndEventsTab from "@app/(administration)/administration/content/(tabs)/NewsAndEventsTab/NewsAndEventsTab.tsx"
import WebinarsTab from "@app/(administration)/administration/content/(tabs)/WebinarsTab/WebinarsTab.tsx"
import { useQueryParamTab } from "@shared/hooks/useQueryParamTab.ts"
import AdminPermissionGuard from "@shared/ui/PermissionGuard/AdminPermissionGuard.tsx"

const tabsItems = [
    {
        key: "webinars",
        label: "Webinars",
        children: (
            <AdminPermissionGuard permission="webinars.view">
                <WebinarsTab />
            </AdminPermissionGuard>
        ),
    },
    {
        key: "news-and-events",
        label: "News & Events",
        children: (
            <AdminPermissionGuard permission="news.view">
                <NewsAndEventsTab />
            </AdminPermissionGuard>
        ),
    },
    {
        key: "case-of-the-month",
        label: "Case of the Month",
        children: (
            <AdminPermissionGuard permission="case_of_the_month.view">
                <CaseOfTheMonthTab />
            </AdminPermissionGuard>
        ),
    },
]

const ContentTabs = () => {
    const { activeTab, setActiveTab } = useQueryParamTab({
        defaultTab: "webinars",
        tabKeys: tabsItems.map(({ key }) => key),
    })

    return (
        <>
            <Typography.Title level={2}>Content</Typography.Title>
            <Tabs onChange={setActiveTab} activeKey={activeTab} type="card" items={tabsItems} />
        </>
    )
}

const Page = () => (
    <Suspense fallback={null}>
        <ContentTabs />
    </Suspense>
)

export default Page
