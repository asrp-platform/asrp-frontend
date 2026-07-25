"use client"

import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import type { IUser } from "@entities/User.ts"
import { ADMIN_USERS_URL } from "@shared/backend/restApiUrls/admin/adminApiUrls.ts"
import { Card, Skeleton, Statistic, Typography } from "antd"
import { TeamOutlined, UserOutlined } from "@ant-design/icons"

import styles from "./styles.module.scss"
import type { IUserMembership } from "@entities/Membership.ts"
import { MEMBERS_ADMIN_URL } from "@shared/backend/restApiUrls/admin/membershipsAdminUrls.ts"

const { Text } = Typography

const USERS_ADMIN_QUERY_KEY = ["users-admin"]

const UserStatistics = () => {
    const { data: users, isLoading: isUsersLoading } = useTableDataQuery<IUser>({
        url: ADMIN_USERS_URL,
        queryKey: USERS_ADMIN_QUERY_KEY,
    })

    const { data: members, isLoading: isMembersLoading } = useTableDataQuery<IUserMembership>({
        url: MEMBERS_ADMIN_URL,
        queryKey: ["members"],
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
        </section>
    )
}

export default UserStatistics
