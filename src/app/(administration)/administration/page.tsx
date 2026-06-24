"use client"

import HearAboutStatistics from "@app/(administration)/administration/(components)/HearAboutStatistics/HearAboutStatistics.tsx"
import { Divider, Typography } from "antd"

const { Title } = Typography

const Page = () => {
    return (
        <>
            <Title level={2}>Dashboard</Title>
            <Divider />
            <HearAboutStatistics />
        </>
    )
}

export default Page
