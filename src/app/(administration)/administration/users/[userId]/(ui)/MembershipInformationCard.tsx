"use client"

import { useQuery } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { Card, Empty, Result, Space, Tag } from "antd"

import api from "@/axios.ts"
import type { IUserMembership } from "@entities/Membership.ts"
import { MEMBERS_ADMIN_URL } from "@shared/backend/restApiUrls/admin/membershipsAdminUrls.ts"
import type { IPaginatedBackendResponse } from "@shared/types/interfaces.ts"
import Loading from "@app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import MembershipStatusTag from "@app/(administration)/administration/membership/(tabs)/MembersTable/MembershipStatusTag.tsx"
import MembershipTypeTag from "@shared/ui/Tags/MembershipTypeTag/MembershipTypeTag.tsx"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"
import AdminPermissionGuard from "@shared/ui/PermissionGuard/AdminPermissionGuard.tsx"
import ProfileFieldList, {
    type IProfileField,
} from "@app/(administration)/administration/users/[userId]/(ui)/components/ProfileFieldList.tsx"
import styles from "@app/(administration)/administration/users/[userId]/(ui)/styles.module.scss"

type IProps = {
    userId: string
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

const getMembershipOverviewItems = (membership: IUserMembership): IProfileField[] => [
    {
        label: "Membership ID",
        value: membership.id,
    },
    {
        label: "Status",
        value: <MembershipStatusTag membership={membership} />,
    },
    {
        label: "Type",
        value: <MembershipTypeTag type={membership.membership_type.type} />,
    },
    {
        label: "Expires at",
        value: renderDate(membership.expires_at),
    },
    {
        label: "Created at",
        value: renderDate(membership.created_at),
    },
    {
        label: "Updated at",
        value: renderDate(membership.updated_at),
    },
]

const getMembershipTypeItems = (membership: IUserMembership): IProfileField[] => [
    {
        label: "Name",
        value: membership.membership_type.name,
    },
    {
        label: "Price",
        value: formatMoney(membership.membership_type.price_usd),
    },
    {
        label: "Duration",
        value: `${membership.membership_type.duration} days`,
    },
    {
        label: "Purchasable",
        value: renderBooleanTag(membership.membership_type.is_purchasable),
    },
    {
        label: "Description",
        value: membership.membership_type.description || EMPTY_VALUE,
        wide: true,
    },
]

const getMembershipRestrictionItems = (membership: IUserMembership): IProfileField[] => [
    {
        label: "Terminated",
        value: renderBooleanTag(membership.terminated, "Terminated", "Not terminated"),
    },
    {
        label: "Terminated at",
        value: renderDate(membership.terminated_at),
    },
    {
        label: "Termination reason",
        value: membership.termination_reason || EMPTY_VALUE,
        wide: true,
    },
    {
        label: "Suspended",
        value: renderBooleanTag(membership.is_suspended, "Suspended", "Not suspended"),
    },
    {
        label: "Suspended until",
        value: renderDate(membership.suspended_until),
    },
    {
        label: "Suspended at",
        value: renderDate(membership.suspended_at),
    },
    {
        label: "Suspension reason",
        value: membership.suspension_reason || EMPTY_VALUE,
        wide: true,
    },
]

const getMembershipReferenceItems = (membership: IUserMembership): IProfileField[] => [
    {
        label: "Membership request ID",
        value: membership.membership_request_id,
    },
    {
        label: "Membership type ID",
        value: membership.membership_type_id,
    },
    {
        label: "User ID",
        value: membership.user_id,
    },
    {
        label: "User email",
        value: membership.user.email,
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
            <Card className={styles.profileCard}>
                {!membership ? (
                    <Empty description="This user does not have a membership yet" />
                ) : (
                    <Space direction="vertical" size={24} style={{ width: "100%" }}>
                        <ProfileFieldList
                            title="Membership overview"
                            variant="membership"
                            fields={getMembershipOverviewItems(membership)}
                        />

                        <ProfileFieldList
                            title="Membership type"
                            variant="membershipType"
                            fields={getMembershipTypeItems(membership)}
                        />

                        <ProfileFieldList
                            title="Restrictions"
                            variant="restrictions"
                            fields={getMembershipRestrictionItems(membership)}
                        />

                        <ProfileFieldList
                            title="References"
                            variant="references"
                            fields={getMembershipReferenceItems(membership)}
                        />
                    </Space>
                )}
            </Card>
        </AdminPermissionGuard>
    )
}

export default MembershipInformationCard
