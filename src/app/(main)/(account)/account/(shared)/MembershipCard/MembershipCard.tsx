"use client"

import clsx from "clsx"

import styles from "./MembershipCard.module.scss"
import PrimaryLinkOutlined from "@/shared/ui/Buttons/PrimaryLinkOutlined/PrimaryLinkOutlined.tsx"
import ProfileInfoCard from "@/shared/ui/Cards/ProfileInfoCard/ProfileInfoCard.tsx"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"
import MembershipTypeTag from "@shared/ui/Tags/MembershipTypeTag/MembershipTypeTag.tsx"
import type { IUserMembership } from "@entities/Membership.ts"
import DowngradeMembership from "@app/(main)/(account)/account/membership/(ui)/DowngradeMembership/DowngradeMembership.tsx"

interface IProps {
    membership: IUserMembership
    variant?: "compact" | "detailed"
    className?: string
}

const MembershipCard = ({ membership, variant = "compact", className }: IProps) => {
    const isExpired = !membership.is_active
    const isDetailed = variant === "detailed"

    return (
        <ProfileInfoCard
            className={clsx(
                styles.membershipInfoCard,
                isExpired && styles.expiredMembershipInfoCard,
                isDetailed && styles.detailedMembershipInfoCard,
                className,
            )}
        >
            <div className={styles.content}>
                <div>
                    <div
                        className={clsx(
                            styles.secondaryText,
                            isExpired && styles.expiredSecondaryText,
                        )}
                    >
                        {isExpired
                            ? `Expired on ${formatDatetime(membership.expires_at, ["hour", "minute"])}`
                            : `Valid through ${formatDatetime(membership.expires_at, ["hour", "minute"])}`}
                    </div>

                    <div className={styles.tagRow}>
                        <MembershipTypeTag type={membership.membership_type.type} />

                        {isExpired && <span className={styles.expiredTag}>Expired</span>}
                    </div>

                    {isExpired && (
                        <p className={styles.expiredDescription}>
                            Your membership is no longer active. Renew your membership to restore
                            access to member benefits.
                        </p>
                    )}
                </div>

                <div className={styles.actions}>
                    {isExpired && (
                        <PrimaryLinkOutlined href="/account/membership/renew">
                            Renew membership
                        </PrimaryLinkOutlined>
                    )}

                    {variant === "compact" && (
                        <PrimaryLinkOutlined href="/account/membership">
                            View membership
                        </PrimaryLinkOutlined>
                    )}

                    {variant === "detailed" && <DowngradeMembership />}
                </div>
            </div>

            {isDetailed && (
                <div className={styles.details}>
                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Membership type</span>
                        <span className={styles.detailValue}>
                            {membership.membership_type.name}
                        </span>
                    </div>

                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Status</span>
                        <span
                            className={clsx(
                                styles.detailValue,
                                isExpired && styles.expiredDetailValue,
                            )}
                        >
                            {isExpired ? "Expired" : "Active"}
                        </span>
                    </div>

                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Expiration date</span>
                        <span className={styles.detailValue}>
                            {formatDatetime(membership.expires_at, ["hour", "minute"])}
                        </span>
                    </div>

                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Membership ID</span>
                        <span className={styles.detailValue}>#{membership.id}</span>
                    </div>

                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Created date</span>
                        <span className={styles.detailValue}>
                            {formatDatetime(membership.created_at, ["hour", "minute"])}
                        </span>
                    </div>

                    <div className={styles.detailItem}>
                        <span className={styles.detailLabel}>Last updated</span>
                        <span className={styles.detailValue}>
                            {formatDatetime(membership.updated_at, ["hour", "minute"])}
                        </span>
                    </div>
                </div>
            )}
        </ProfileInfoCard>
    )
}

export default MembershipCard
