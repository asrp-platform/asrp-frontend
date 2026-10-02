"use client"

import { useParams, useRouter } from "next/navigation"
import { Button, Flex, Typography } from "antd"

import UserDataCard from "@app/(administration)/administration/users/[userId]/(ui)/UserDataCard.tsx"
import MembershipInformationCard from "@app/(administration)/administration/users/[userId]/(ui)/MembershipInformationCard.tsx"
import UserProfessionalProfileCard from "@app/(administration)/administration/users/[userId]/(ui)/UserProfessionalProfileCard.tsx"
import { LeftOutlined } from "@ant-design/icons"
import AdminPermissionGuard from "@shared/ui/PermissionGuard/AdminPermissionGuard.tsx"

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
            <AdminPermissionGuard permission="admin.view">
                <UserProfessionalProfileCard userId={userId} />
            </AdminPermissionGuard>

            <Title level={2}>User membership information</Title>
            <AdminPermissionGuard permission="memberships.view">
                <MembershipInformationCard userId={userId} />
            </AdminPermissionGuard>
        </Flex>
    )
}

export default Page
