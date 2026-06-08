import ProfileInfoCard from "@/shared/ui/Cards/ProfileInfoCard/ProfileInfoCard"
import PrimaryLinkOutlined from "@shared/ui/Buttons/PrimaryLinkOutlined/PrimaryLinkOutlined.tsx"
import DowngradeMembership from "@app/(main)/(account)/account/membership/(ui)/DowngradeMembership/DowngradeMembership.tsx"

import styles from "./QuickActions.module.scss"

interface QuickActionsProps {
    variant: "active" | "expired"
}

const QuickActions = ({ variant }: QuickActionsProps) => {
    const isExpired = variant === "expired"

    return (
        <ProfileInfoCard>
            <h3>Quick actions</h3>
            <div className={styles.actions}>
                <PrimaryLinkOutlined href="/account/membership/renew">
                    Renew membership
                </PrimaryLinkOutlined>
                {!isExpired && <DowngradeMembership />}
            </div>
        </ProfileInfoCard>
    )
}

export default QuickActions
