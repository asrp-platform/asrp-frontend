"use client"

import ProfileInfoCard from "@shared/ui/Cards/ProfileInfoCard/ProfileInfoCard.tsx"
import type { IUserMembership } from "@entities/Membership.ts"
import PrimaryLinkOutlined from "@shared/ui/Buttons/PrimaryLinkOutlined/PrimaryLinkOutlined.tsx"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"
import MembershipTypeTag from "@shared/ui/Tags/MembershipTypeTag/MembershipTypeTag.tsx"

import styles from "./MembershipStatus.module.scss"

interface IProps {
    membership: IUserMembership
}

const MembershipStatus = ({ membership }: IProps) => {
    const isExpired = !membership.is_active

    return (
        <ProfileInfoCard className={isExpired ? styles.expiredCard : undefined}>
            <div className={styles.header}>
                <h3>Membership status</h3>
                <MembershipTypeTag type={membership.membership_type.type} />
            </div>

            <span className={isExpired ? styles.expiredStatus : styles.activeStatus}>
                {isExpired ? "Expired membership" : "Active membership"}
            </span>

            <span className={styles.description}>
                {isExpired ? "Expired on" : "Valid through"}{" "}
                {formatDatetime(membership.expires_at, ["hour", "minute"])}
            </span>

            <PrimaryLinkOutlined href="/account/membership">View membership</PrimaryLinkOutlined>
        </ProfileInfoCard>
    )
}

export default MembershipStatus
