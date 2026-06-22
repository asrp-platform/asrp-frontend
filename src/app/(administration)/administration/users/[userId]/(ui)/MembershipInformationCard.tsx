"use client"

import { useQuery } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import type { ReactNode } from "react"
import { Card, Descriptions, Divider, Empty, Result, Tag } from "antd"

import api from "@/axios.ts"
import type { IUserMembership } from "@entities/Membership.ts"
import { MEMBERS_ADMIN_URL } from "@shared/backend/restApiUrls/admin/membershipsAdminUrls.ts"
import type { IPaginatedBackendResponse } from "@shared/types/interfaces.ts"
import Loading from "@app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import MembershipStatusTag from "@app/(administration)/administration/membership/(tabs)/MembersTable/MembershipStatusTag.tsx"
import MembershipTypeTag from "@shared/ui/Tags/MembershipTypeTag/MembershipTypeTag.tsx"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"
import AdminPermissionGuard from "@shared/ui/PermissionGuard/AdminPermissionGuard.tsx"

type IProps = {
    userId: string
}

type DescriptionItem = {
    key: string
    label: string
    children: ReactNode
    span?: number
}

const EMPTY_VALUE = "N/A"

const formatMoney = (value: number | string) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(Number(value))
}

const renderBooleanTag = (value: boolean, trueLabel = "Yes", falseLabel = "No") => {
    return value ? <Tag color="green">{trueLabel}</Tag> : <Tag>{falseLabel}</Tag>
}

const renderDate = (value: string | null | undefined) => {
    return formatDatetime(value) || EMPTY_VALUE
}

const getMembershipOverviewItems = (membership: IUserMembership): DescriptionItem[] => [
    {
        key: "id",
        label: "Membership ID",
        children: membership.id,
    },
    {
        key: "status",
        label: "Status",
        children: <MembershipStatusTag membership={membership} />,
    },
    {
        key: "type",
        label: "Type",
        children: <MembershipTypeTag type={membership.membership_type.type} />,
    },
    {
        key: "expires_at",
        label: "Expires at",
        children: renderDate(membership.expires_at),
    },
    {
        key: "created_at",
        label: "Created at",
        children: renderDate(membership.created_at),
    },
    {
        key: "updated_at",
        label: "Updated at",
        children: renderDate(membership.updated_at),
    },
]

const getMembershipTypeItems = (membership: IUserMembership): DescriptionItem[] => [
    {
        key: "membership_type_name",
        label: "Name",
        children: membership.membership_type.name,
    },
    {
        key: "membership_type_price",
        label: "Price",
        children: formatMoney(membership.membership_type.price_usd),
    },
    {
        key: "membership_type_duration",
        label: "Duration",
        children: `${membership.membership_type.duration} days`,
    },
    {
        key: "membership_type_purchasable",
        label: "Purchasable",
        children: renderBooleanTag(membership.membership_type.is_purchasable),
    },
    {
        key: "membership_type_description",
        label: "Description",
        children: membership.membership_type.description || EMPTY_VALUE,
        span: 2,
    },
]

const getMembershipRestrictionItems = (membership: IUserMembership): DescriptionItem[] => [
    {
        key: "terminated",
        label: "Terminated",
        children: renderBooleanTag(membership.terminated, "Terminated", "Not terminated"),
    },
    {
        key: "terminated_at",
        label: "Terminated at",
        children: renderDate(membership.terminated_at),
    },
    {
        key: "termination_reason",
        label: "Termination reason",
        children: membership.termination_reason || EMPTY_VALUE,
        span: 2,
    },
    {
        key: "suspended",
        label: "Suspended",
        children: renderBooleanTag(membership.is_suspended, "Suspended", "Not suspended"),
    },
    {
        key: "suspended_until",
        label: "Suspended until",
        children: renderDate(membership.suspended_until),
    },
    {
        key: "suspended_at",
        label: "Suspended at",
        children: renderDate(membership.suspended_at),
    },
    {
        key: "suspension_reason",
        label: "Suspension reason",
        children: membership.suspension_reason || EMPTY_VALUE,
    },
]

const getMembershipReferenceItems = (membership: IUserMembership): DescriptionItem[] => [
    {
        key: "membership_request_id",
        label: "Membership request ID",
        children: membership.membership_request_id,
    },
    {
        key: "membership_type_id",
        label: "Membership type ID",
        children: membership.membership_type_id,
    },
    {
        key: "user_id",
        label: "User ID",
        children: membership.user_id,
    },
    {
        key: "user_email",
        label: "User email",
        children: membership.user.email,
    },
]

const MembershipInformationCard = ({ userId }: IProps) => {
    const {
        data: membership,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["admin-user-membership", userId],
        queryFn: async () => {
            const response = await api.get<IPaginatedBackendResponse<IUserMembership>>(
                MEMBERS_ADMIN_URL,
                {
                    params: {
                        user_id: userId,
                        page: 1,
                        page_size: 1,
                    },
                },
            )
            return response.data.data[0] ?? null
        },
        staleTime: 1000 * 60 * 5,
        retry: false,
    })

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return (
            <Result
                status="error"
                title="Unable to load membership"
                subTitle={
                    isAxiosError(error) && !error.response
                        ? "Network error. Check your internet connection and try again."
                        : "Something went wrong. Please try again later."
                }
            />
        )
    }

    return (
        <AdminPermissionGuard permission="memberships.view">
            <Card>
                {!membership ? (
                    <Empty description="This user does not have a membership yet" />
                ) : (
                    <>
                        <Descriptions
                            title="Membership overview"
                            bordered
                            size="small"
                            column={{ xs: 1, md: 2 }}
                            items={getMembershipOverviewItems(membership)}
                        />
                        <Divider />

                        <Descriptions
                            title="Membership type"
                            bordered
                            size="small"
                            column={{ xs: 1, md: 2 }}
                            items={getMembershipTypeItems(membership)}
                        />
                        <Divider />

                        <Descriptions
                            title="Restrictions"
                            bordered
                            size="small"
                            column={{ xs: 1, md: 2 }}
                            items={getMembershipRestrictionItems(membership)}
                        />
                        <Divider />

                        <Descriptions
                            title="References"
                            bordered
                            size="small"
                            column={{ xs: 1, md: 2 }}
                            items={getMembershipReferenceItems(membership)}
                        />
                    </>
                )}
            </Card>
        </AdminPermissionGuard>
    )
}

export default MembershipInformationCard
