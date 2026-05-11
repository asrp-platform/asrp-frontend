"use client"

import PrimaryLinkOutlined from "@/shared/ui/Buttons/PrimaryLinkOutlined/PrimaryLinkOutlined.tsx"
import ProfileInfoCard from "@/shared/ui/Cards/ProfileInfoCard/ProfileInfoCard.tsx"

import styles from "./NoMembershipCard.module.scss"

const NoMembershipCard = () => {
    return (
        <ProfileInfoCard className={styles.card}>
            <div className={styles.content}>
                <div className={styles.textContent}>
                    <h2 className={styles.title}>You do not have an active membership yet</h2>

                    <p className={styles.description}>
                        Your ASRP membership has not been created yet. Submit a membership
                        application to access member benefits and manage your membership status from
                        this page.
                    </p>

                    <div className={styles.actions}>
                        <PrimaryLinkOutlined href="/membership/become-member">
                            Apply for membership
                        </PrimaryLinkOutlined>
                    </div>
                </div>
            </div>
        </ProfileInfoCard>
    )
}

export default NoMembershipCard
