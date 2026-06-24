"use client"

import { useParams } from "next/navigation"
import { Flex, Typography } from "antd"

import UserDataCard from "@app/(administration)/administration/users/[userId]/(ui)/UserDataCard.tsx"
import MembershipInformationCard from "@app/(administration)/administration/users/[userId]/(ui)/MembershipInformationCard.tsx"

const { Title } = Typography

const Page = () => {
    const { userId } = useParams<{ userId: string }>()

    return (
        <Flex vertical gap={24}>
            <Title level={2}>User profile</Title>
            <UserDataCard userId={userId} />

            <Title level={2}>User membership information</Title>
            <MembershipInformationCard userId={userId} />
        </Flex>
    )
}

export default Page
