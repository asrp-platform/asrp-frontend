import { useCurrentUserMembershipRequestQuery } from "../../../../../../../shared/hooks/useCurrentUserMembershipRequest.ts"

import styles from "./MembershipStatusCard.module.scss"
import PrimaryLinkOutlined from "../../../../../../../shared/ui/Buttons/PrimaryLinkOutlined/PrimaryLinkOutlined.tsx"
import ProfileInfoCard from "../../../../../../../shared/ui/Cards/ProfileInfoCard/ProfileInfoCard.tsx"
import MembershipRequestCard from "../MembershipRequestCard/MembershipRequestCard.tsx"
import Loading from "../../../../../about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import ApplyMembershipCard from "../ApplyMembershipCard/ApplyMembershipCard.tsx"

const MembershipStatusCard = () => {
    const { data: membershipRequest, isLoading: isMembershipRequestLoading } =
        useCurrentUserMembershipRequestQuery()

    if (isMembershipRequestLoading) {
        return <Loading />
    }

    // TODO: membership fetching

    // Mock data
    const membership = false

    if (membership) {
        // TODO: ActiveMembershipCard
        return (
            <ProfileInfoCard>
                <div className={styles.secondaryText}>Valid through December 31, 2026</div>

                <PrimaryLinkOutlined href="/account/membership">
                    View membership
                </PrimaryLinkOutlined>
            </ProfileInfoCard>
        )
    }

    if (!membership && membershipRequest) {
        return <MembershipRequestCard membershipRequest={membershipRequest} />
    }

    return <ApplyMembershipCard />
}

export default MembershipStatusCard
