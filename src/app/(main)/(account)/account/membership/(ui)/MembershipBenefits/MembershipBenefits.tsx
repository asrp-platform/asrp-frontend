import ProfileInfoCard from "@/shared/ui/Cards/ProfileInfoCard/ProfileInfoCard"
import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"

import styles from "./MembershipBenefits.module.scss"

const MembershipBenefits = () => {
    return (
        <ProfileInfoCard>
            <h3>Membership benefits</h3>
            <ul className={styles.benefitsList}>
                <li>Access to ASRP educational content and events</li>
                <li>Member-only communications and announcements</li>
                <li>Eligibility for committees and leadership roles</li>
            </ul>
            <CustomButton variant={"primary"}>Member directory</CustomButton>
        </ProfileInfoCard>
    )
}

export default MembershipBenefits
