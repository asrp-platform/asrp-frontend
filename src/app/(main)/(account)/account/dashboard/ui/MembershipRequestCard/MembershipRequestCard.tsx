import ProfileInfoCard from "../../../../../../../shared/ui/Cards/ProfileInfoCard/ProfileInfoCard.tsx"
import styles from "./MembershipRequestCard.module.scss"
import {
    type IMembershipRequest,
    MembershipRequestStatusEnum,
} from "../../../../../../../entities/Membership.ts"

type MembershipStatusMeta = {
    label: string
    description?: string
    tone: "success" | "approved" | "danger" | "neutral" | "warning" | "expired"
}

const getMembershipStatus = (
    membershipRequestStatus: MembershipRequestStatusEnum,
): MembershipStatusMeta => {
    switch (membershipRequestStatus) {
        case MembershipRequestStatusEnum.PAID:
            return {
                label: "Paid",
                description: "Your payment has been received. Please, wait for the approval.",
                tone: "success",
            }

        case MembershipRequestStatusEnum.APPROVED:
            return {
                label: "Approved",
                description: "Your membership is active.",
                tone: "approved",
            }

        case MembershipRequestStatusEnum.REJECTED:
            return {
                label: "Rejected",
                description: "Your membership request was rejected.",
                tone: "danger",
            }

        case MembershipRequestStatusEnum.SUBMITTED:
            return {
                label: "Submitted",
                description: "Your request has been submitted and is under review.",
                tone: "neutral",
            }

        case MembershipRequestStatusEnum.PAYMENT_PENDING:
            return {
                label: "Payment pending",
                description: "We are waiting for your payment confirmation.",
                tone: "warning",
            }

        case MembershipRequestStatusEnum.PAYMENT_EXPIRED:
            return {
                label: "Payment expired",
                description: "Your payment session expired. Please try again.",
                tone: "expired",
            }

        case MembershipRequestStatusEnum.PAYMENT_FAILED:
            return {
                label: "Payment failed",
                description: "We could not confirm your payment.",
                tone: "danger",
            }

        default:
            return {
                label: "Unknown status",
                description: "Please contact support if this persists.",
                tone: "neutral",
            }
    }
}

interface IProps {
    membershipRequest: IMembershipRequest
}

const MembershipRequestCard = ({ membershipRequest }: IProps) => {
    const membershipStatus = getMembershipStatus(membershipRequest.status)

    return (
        <ProfileInfoCard>
            <div className={styles.statusRow}>
                <span
                    className={`${styles.statusBadge} ${styles[`statusBadge_${membershipStatus.tone}`]}`}
                >
                    {membershipStatus.label}
                </span>
            </div>

            <div className={styles.primaryText}>{membershipStatus.label}</div>

            {membershipStatus.description && (
                <div className={styles.mutedText}>{membershipStatus.description}</div>
            )}
        </ProfileInfoCard>
    )
}

export default MembershipRequestCard
