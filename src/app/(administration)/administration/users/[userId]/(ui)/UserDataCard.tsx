"use client"

import { useQuery } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { Card, Divider, Flex, Result } from "antd"

import api from "@/axios.ts"
import type { IUserPrivate } from "@entities/User.ts"
import { getAdminUserUrl } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import Loading from "@app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import ProfessionalInformationDescription from "@app/(administration)/administration/users/[userId]/(ui)/components/ProfessionalInformationDescription.tsx"
import ContactInformationDescription from "@app/(administration)/administration/users/[userId]/(ui)/components/ContactInformationDescription.tsx"
import AccountInformationDescription from "@app/(administration)/administration/users/[userId]/(ui)/components/AccountInformationDescription.tsx"
import MainInformation from "@app/(administration)/administration/users/[userId]/(ui)/components/MainInformation.tsx"
import AdminPermissionGuard from "@shared/ui/PermissionGuard/AdminPermissionGuard.tsx"
import UserActions from "@app/(administration)/administration/users/[userId]/(ui)/components/UserActions.tsx"

interface IProps {
    userId: string
}

const UserDataCard = ({ userId }: IProps) => {
    const {
        data: user,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["users", userId],
        queryFn: async () => {
            const response = await api.get<IUserPrivate>(getAdminUserUrl(userId))
            return response.data
        },
        staleTime: 1000 * 60 * 5,
        retry: false,
    })

    if (isLoading) {
        return <Loading />
    }

    const status = isAxiosError(error) ? error.response?.status : undefined

    if (isError && status === 404) {
        return (
            <Result status="404" title="404" subTitle={`User with ID "${userId}" was not found`} />
        )
    }

    if (isError) {
        return (
            <Result
                status="error"
                title="Unable to load user"
                subTitle={
                    isAxiosError(error) && !error.response
                        ? "Network error. Check your internet connection and try again."
                        : "Something went wrong. Please try again later."
                }
            />
        )
    }

    if (!user) {
        return null
    }

    return (
        // TODO: permissions="users.view"
        <AdminPermissionGuard permission="admin.view">
            <Card>
                <Flex justify={"space-between"}>
                    <MainInformation user={user} />
                    <UserActions user={user} />
                </Flex>
                <Divider />

                <ContactInformationDescription user={user} />
                <Divider />

                <ProfessionalInformationDescription user={user} />
                <Divider />

                <AccountInformationDescription user={user} />
            </Card>
        </AdminPermissionGuard>
    )
}

export default UserDataCard
