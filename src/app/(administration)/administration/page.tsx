"use client"

import HearAboutStatistics from "@app/(administration)/administration/(components)/HearAboutStatistics/HearAboutStatistics.tsx"
import { Divider, Flex, Typography } from "antd"
import UserStatistics from "@app/(administration)/administration/(components)/UsersStatistics/UserStatistics.tsx"

const { Title } = Typography

const Page = () => {
    return (
        <>
            <Title level={2}>Dashboard</Title>
            <Divider />

            <Flex gap={16} wrap="wrap" align="flex-start">
                <HearAboutStatistics />
                <UserStatistics />
            </Flex>
        </>
    )
}

export default Page
