"use client"

import styles from "./styles.module.scss"
import ProfileHeaderSection from "../(shared)/ProfileHeaderSection.tsx"
import UserAvatar from "../../../../../shared/ui/Avatar/UserAvatar.tsx"
import { useCurrentUserQuery } from "../../../../../shared/backend/queries/useCurrentUserQuery.ts"
import Loading from "../../../about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import MembershipStatusCard from "./ui/MembershipCard/MembershipStatusCard.tsx"
import QuickActionsCard from "./ui/QuickActions/QuickActionsCard.tsx"
import ProfileInfoCard from "../../../../../shared/ui/Cards/ProfileInfoCard/ProfileInfoCard.tsx"

const Page = () => {
    const { data: user, isLoading: isUserLoading } = useCurrentUserQuery()

    if (isUserLoading) {
        return <Loading />
    }

    if (!user) {
        return
    }

    return (
        <div className={styles.container}>
            <ProfileHeaderSection
                title="Dashboard"
                subtitle="Manage your ASRP membership and account information."
            />

            <MembershipStatusCard />
            <QuickActionsCard />

            <ProfileInfoCard>
                <h2 className={styles.cardTitle}>Profile summary</h2>
                <div className={styles.profileRow}>
                    <UserAvatar user={user} editable size={120} />
                    <div className={styles.profileInfo}>
                        <div className={styles.primaryText}>
                            {user.firstname} {user.lastname}
                        </div>
                        <div className={styles.mutedText}>{user.email}</div>
                        <div className={styles.mutedText}>Academic Medical Center</div>
                        <span className={styles.roleBadge}>Member</span>
                    </div>
                </div>
            </ProfileInfoCard>
        </div>
    )
}

export default Page
