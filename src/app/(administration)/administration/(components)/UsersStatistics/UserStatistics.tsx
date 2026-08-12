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

const { Text } = Typography

const USERS_ADMIN_QUERY_KEY = ["users-admin"]

interface IPaymentStatisticsFilters {
    status?: PaymentStatusEnum
}

const UserStatistics = () => {
    const { data: users, isLoading: isUsersLoading } = useTableDataQuery<IUserPrivate>({
        url: ADMIN_USERS_URL,
        queryKey: USERS_ADMIN_QUERY_KEY,
    })

    const { data: members, isLoading: isMembersLoading } = useTableDataQuery<IUserMembership>({
        url: MEMBERS_ADMIN_URL,
        queryKey: ["members"],
    })

    const { data: payments, isLoading: isPaymentsLoading } = useTableDataQuery<
        IPayment,
        IPaymentStatisticsFilters
    >({
        url: PAYMENTS_ADMIN_URL,
        queryKey: ["payments-statistics", "total"],
        page: 1,
        pageSize: 1,
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
    })

    return (
        <section className={styles.statistics} aria-label="User statistics">
            <Card className={styles.statisticCard}>
                <div className={styles.cardHeader}>
                    <span className={`${styles.icon} ${styles.usersIcon}`}>
                        <UserOutlined />
                    </span>
                    <Text className={styles.label}>Registered users</Text>
                </div>

                {isUsersLoading ? (
                    <Skeleton.Input active size="large" className={styles.valueSkeleton} />
                ) : (
                    <Statistic
                        className={styles.statistic}
                        value={users?.count ?? 0}
                        groupSeparator=","
                    />
                )}

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

                {isMembersLoading ? (
                    <Skeleton.Input active size="large" className={styles.valueSkeleton} />
                ) : (
                    <Statistic
                        className={styles.statistic}
                        value={members?.count ?? 0}
                        groupSeparator=","
                    />
                )}

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

                {isPaymentsLoading ? (
                    <Skeleton.Input active size="large" className={styles.valueSkeleton} />
                ) : (
                    <Statistic
                        className={styles.statistic}
                        value={payments?.count ?? 0}
                        groupSeparator=","
                    />
                )}

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

                {isSucceededPaymentsLoading ? (
                    <Skeleton.Input active size="large" className={styles.valueSkeleton} />
                ) : (
                    <Statistic
                        className={styles.statistic}
                        value={succeededPayments?.count ?? 0}
                        groupSeparator=","
                    />
                )}

                <Text type="secondary" className={styles.description}>
                    Payments with SUCCEEDED status
                </Text>
            </Card>
        </section>
    )
}

export default UserStatistics
