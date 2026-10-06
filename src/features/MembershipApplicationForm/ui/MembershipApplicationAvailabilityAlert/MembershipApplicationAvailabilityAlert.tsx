import { Alert } from "antd"

import type { IUserMembership, IMembershipRequest } from "@entities/Membership.ts"
import { MembershipRequestStatusEnum } from "@entities/Membership.ts"
import SecondaryLinkOutlined from "@shared/ui/Buttons/SecondaryLinkOutilned/SecondaryLinkOutlined.tsx"
import styles from "./MembershipApplicationAvailabilityAlert.module.scss"

type Props = {
    membership?: IUserMembership
    membershipRequest?: IMembershipRequest
}

const MembershipApplicationAvailabilityAlert = ({ membership, membershipRequest }: Props) => {
    if (membership) {
        return (
            <div className={styles.availabilityAlert}>
                <Alert
                    type="success"
                    showIcon
                    title="You already have an active membership."
                    description="Your membership is active, so a new membership application cannot be submitted right now."
                />
            </div>
        )
    }

    if (!membershipRequest) {
        return null
    }

    if (membershipRequest.status === MembershipRequestStatusEnum.PAYMENT_PENDING) {
        return (
            <div className={styles.availabilityAlert}>
                <Alert
                    type="warning"
                    showIcon
                    title="Your membership payment is pending."
                    description={
                        <div className={styles.descriptionContent}>
                            <p>You can retry the payment from your personal dashboard.</p>
                            <SecondaryLinkOutlined href="/account/dashboard">
                                Go to dashboard
                            </SecondaryLinkOutlined>
                        </div>
                    }
                />
            </div>
        )
    }

    if (membershipRequest.status === MembershipRequestStatusEnum.PAID) {
        return (
            <div className={styles.availabilityAlert}>
                <Alert
                    type="info"
                    showIcon
                    title="Your membership application is awaiting approval."
                    description="Your payment has been received. Please wait while your membership is reviewed and confirmed."
                />
            </div>
        )
    }

    if (membershipRequest.status === MembershipRequestStatusEnum.REJECTED) {
        return (
            <div className={styles.availabilityAlert}>
                <Alert
                    type="error"
                    showIcon
                    title="Your membership application was rejected."
                    description={
                        <div className={styles.descriptionContent}>
                            <p>
                                You can review your membership status and submit a new application
                                from your personal dashboard.
                            </p>
                            <SecondaryLinkOutlined href="/account/dashboard">
                                Go to dashboard
                            </SecondaryLinkOutlined>
                        </div>
                    }
                />
            </div>
        )
    }

    return null
}

export default MembershipApplicationAvailabilityAlert
