import ProfileInfoCard from "@/shared/ui/Cards/ProfileInfoCard/ProfileInfoCard"

import styles from "./MembershipBenefits.module.scss"
import PrimaryLinkOutlined from "@shared/ui/Buttons/PrimaryLinkOutlined/PrimaryLinkOutlined.tsx"

const MembershipBenefits = () => {
    return (
        <ProfileInfoCard>
            <h3>Membership benefits</h3>
            <ul className={styles.benefitsList}>
                <li>Access to ASRP educational content and events</li>
                <li>Member-only communications and announcements</li>
                <li>Eligibility for committees and leadership roles</li>
            </ul>
            <PrimaryLinkOutlined href="/account/member-directory">
                Member directory
            </PrimaryLinkOutlined>
        </ProfileInfoCard>
    )
}

export default MembershipBenefits
