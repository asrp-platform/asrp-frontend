import ProfileInfoCard from "@/shared/ui/Cards/ProfileInfoCard/ProfileInfoCard.tsx"
import styles from "@/app/(main)/(account)/account/dashboard/ui/ApplyMembershipCard/ApplyMembershipCard.module.scss"
import PrimaryLinkOutlined from "@/shared/ui/Buttons/PrimaryLinkOutlined/PrimaryLinkOutlined.tsx"

const ApplyMembershipCard = () => {
    return (
        <ProfileInfoCard>
            <div className={styles.cardBody}>
                <div className={styles.cardTitle}>Not a member yet</div>
                <div className={styles.mutedText}>
                    Submit your membership request to get started.
                </div>
            </div>
            <div>
                <PrimaryLinkOutlined href="/membership/become-member">
                    Apply for membership
                </PrimaryLinkOutlined>
            </div>
        </ProfileInfoCard>
    )
}

export default ApplyMembershipCard
