import ProfileInfoCard from "@shared/ui/Cards/ProfileInfoCard/ProfileInfoCard.tsx"
import styles from "@app/(main)/(account)/account/(shared)/MembershipRequestCard/MembershipRequestCard.module.scss"
import { type IMembershipRequest, MembershipRequestStatusEnum } from "@entities/Membership.ts"
import { isAxiosError } from "axios"
import { message } from "antd"
import api from "@/axios.ts"
import { CURRENT_USER_RETRY_MEMBERSHIP_REQUEST_PAYMENT_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import { useState } from "react"
import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"
import ReapplyMembershipButton from "@features/ReapplyMembershipButton/ReapplyMembershipButton.tsx"
import type { PaymentCheckoutResponse } from "@shared/types/interfaces.ts"

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

        case MembershipRequestStatusEnum.PAYMENT_PENDING:
            return {
                label: "Payment pending",
                description: "We are waiting for your payment confirmation.",
                tone: "warning",
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
    const [isRetrying, setIsRetrying] = useState(false)

    const membershipStatus = getMembershipStatus(membershipRequest.status)

    const canRetryPayment = [
        MembershipRequestStatusEnum.PAYMENT_FAILED,
        MembershipRequestStatusEnum.PAYMENT_PENDING,
    ].includes(membershipRequest.status)

    const canReapply = membershipRequest.status === MembershipRequestStatusEnum.REJECTED

    const handleRetryPayment = async () => {
        try {
            setIsRetrying(true)
            const response = await api.post<PaymentCheckoutResponse>(
                CURRENT_USER_RETRY_MEMBERSHIP_REQUEST_PAYMENT_URL,
            )
            window.location.href = response.data.checkout_session_url
        } catch (error) {
            if (isAxiosError(error)) {
                message.error(error.message)
            }
        } finally {
            setIsRetrying(false)
        }
    }

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

            {membershipRequest.status === MembershipRequestStatusEnum.REJECTED && (
                <div className={styles.mutedText}>
                    <strong>Admin comment:</strong> {membershipRequest.admin_comment}
                </div>
            )}
            {canReapply && <ReapplyMembershipButton />}

            {canRetryPayment && (
                <CustomButton variant={"primary"} loading={isRetrying} onClick={handleRetryPayment}>
                    Retry payment
                </CustomButton>
            )}
        </ProfileInfoCard>
    )
}

export default MembershipRequestCard
