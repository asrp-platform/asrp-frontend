"use client"

import styles from "@/app/(main)/(account)/account/dashboard/ui/QuickActions/QuickActionsCard.module.scss"
import PrimaryLinkOutlined from "@/shared/ui/Buttons/PrimaryLinkOutlined/PrimaryLinkOutlined.tsx"
import SecondaryLinkOutlined from "@/shared/ui/Buttons/SecondaryLinkOutilned/SecondaryLinkOutlined.tsx"
import ProfileInfoCard from "@/shared/ui/Cards/ProfileInfoCard/ProfileInfoCard.tsx"

const QuickActionsCard = () => {
    return (
        <ProfileInfoCard>
            <h2 className={styles.cardTitle}>Quick actions</h2>
            <div className={styles.actionsRow}>
                <PrimaryLinkOutlined href="/account/profile">Edit profile</PrimaryLinkOutlined>
                <SecondaryLinkOutlined href="/account/payments">
                    Payment history
                </SecondaryLinkOutlined>
                <SecondaryLinkOutlined href="/account/communication-preferences">
                    Communication preferences
                </SecondaryLinkOutlined>
            </div>
        </ProfileInfoCard>
    )
}

export default QuickActionsCard
