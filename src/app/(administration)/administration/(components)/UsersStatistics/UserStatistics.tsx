"use client"

import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import type { IUserPrivate } from "@entities/User.ts"
import { ADMIN_USERS_URL } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { Card, Skeleton, Statistic, Typography } from "antd"
import { BankOutlined, CheckCircleOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons"

import styles from "./styles.module.scss"
import type { IUserMembership } from "@entities/Membership.ts"
import { MEMBERS_ADMIN_URL } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { type IPayment, PaymentStatusEnum } from "@/entities/Payments.ts"
import { PAYMENTS_ADMIN_URL } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import AccessDenied from "@shared/ui/PermissionGuard/AccessDenied.tsx"
import { useAdminPermissions } from "@shared/backend/queries/usePermissionsQuery.ts"

const { Text } = Typography

const USERS_ADMIN_QUERY_KEY = ["users-admin"]

interface IPaymentStatisticsFilters {
    status?: PaymentStatusEnum
}

const UserStatistics = () => {
    const { can, isLoading: isPermissionsLoading } = useAdminPermissions()
    const canViewUsers = can("admin.view")
    const canViewMembers = can("memberships.view")
    const canViewPayments = can("payments.view")

    const { data: users, isLoading: isUsersLoading } = useTableDataQuery<IUserPrivate>({
        url: ADMIN_USERS_URL,
        queryKey: USERS_ADMIN_QUERY_KEY,
        enabled: canViewUsers,
    })

    const { data: members, isLoading: isMembersLoading } = useTableDataQuery<IUserMembership>({
        url: MEMBERS_ADMIN_URL,
        queryKey: ["members"],
        enabled: canViewMembers,
    })

    const { data: payments, isLoading: isPaymentsLoading } = useTableDataQuery<
        IPayment,
        IPaymentStatisticsFilters
    >({
        url: PAYMENTS_ADMIN_URL,
        queryKey: ["payments-statistics", "total"],
        page: 1,
        pageSize: 1,
        enabled: canViewPayments,
    })

    const { data: succeededPayments, isLoading: isSucceededPaymentsLoading } = useTableDataQuery<
        IPayment,
        IPaymentStatisticsFilters
    >({
        url: PAYMENTS_ADMIN_URL,
        queryKey: ["payments-statistics", "succeeded"],
        page: 1,
        pageSize: 1,
        filters: {
            status: PaymentStatusEnum.SUCCEEDED,
        },
        enabled: canViewPayments,
    })

    const renderStatistic = (allowed: boolean, isLoading: boolean, value: number | undefined) => {
        if (isPermissionsLoading || isLoading) {
            return <Skeleton.Input active size="large" className={styles.valueSkeleton} />
        }

        if (!allowed) {
            return (
                <AccessDenied
                    compact
                    message="You do not have permission to view this statistic."
                />
            )
        }

        return <Statistic className={styles.statistic} value={value ?? 0} groupSeparator="," />
    }

    return (
        <section className={styles.statistics} aria-label="User statistics">
            <Card className={styles.statisticCard}>
                <div className={styles.cardHeader}>
                    <span className={`${styles.icon} ${styles.usersIcon}`}>
                        <UserOutlined />
                    </span>
                    <Text className={styles.label}>Registered users</Text>
                </div>

                {renderStatistic(canViewUsers, isUsersLoading, users?.count)}

                <Text type="secondary" className={styles.description}>
                    Total accounts created
                </Text>
            </Card>

            <Card className={styles.statisticCard}>
                <div className={styles.cardHeader}>
                    <span className={`${styles.icon} ${styles.membersIcon}`}>
                        <TeamOutlined />
                    </span>
                    <Text className={styles.label}>ASRP members</Text>
                </div>

                {renderStatistic(canViewMembers, isMembersLoading, members?.count)}

                <Text type="secondary" className={styles.description}>
                    Current membership records
                </Text>
            </Card>

            <Card className={styles.statisticCard}>
                <div className={styles.cardHeader}>
                    <span className={`${styles.icon} ${styles.paymentsIcon}`}>
                        <BankOutlined />
                    </span>
                    <Text className={styles.label}>Total payments</Text>
                </div>

                {renderStatistic(canViewPayments, isPaymentsLoading, payments?.count)}

                <Text type="secondary" className={styles.description}>
                    All payment attempts
                </Text>
            </Card>

            <Card className={styles.statisticCard}>
                <div className={styles.cardHeader}>
                    <span className={`${styles.icon} ${styles.succeededPaymentsIcon}`}>
                        <CheckCircleOutlined />
                    </span>
                    <Text className={styles.label}>Successful payments</Text>
                </div>

                {renderStatistic(
                    canViewPayments,
                    isSucceededPaymentsLoading,
                    succeededPayments?.count,
                )}

                <Text type="secondary" className={styles.description}>
                    Payments with SUCCEEDED status
                </Text>
            </Card>
        </section>
    )
}

export default UserStatistics
