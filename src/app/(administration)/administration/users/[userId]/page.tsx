"use client"

import { useParams, useRouter } from "next/navigation"
import { Button, Flex, Typography } from "antd"

import UserDataCard from "@app/(administration)/administration/users/[userId]/(ui)/UserDataCard.tsx"
import MembershipInformationCard from "@app/(administration)/administration/users/[userId]/(ui)/MembershipInformationCard.tsx"
import UserProfessionalProfileCard from "@app/(administration)/administration/users/[userId]/(ui)/UserProfessionalProfileCard.tsx"
import { LeftOutlined } from "@ant-design/icons"

const { Title } = Typography

const Page = () => {
    const { userId } = useParams<{ userId: string }>()

    const router = useRouter()

    return (
        <Flex vertical gap={24}>
            <Flex justify={"space-between"} align={"center"}>
                <Title level={2}>User profile</Title>
                <Button onClick={() => router.back()} icon={<LeftOutlined />}>
                    Back
                </Button>
            </Flex>
            <UserDataCard userId={userId} />

            <Title level={2}>User professional profile</Title>
            <UserProfessionalProfileCard userId={userId} />

            <Title level={2}>User membership information</Title>
            <MembershipInformationCard userId={userId} />
        </Flex>
    )
}

export default Page
