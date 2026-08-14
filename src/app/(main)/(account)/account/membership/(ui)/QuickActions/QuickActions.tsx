import ProfileInfoCard from "@/shared/ui/Cards/ProfileInfoCard/ProfileInfoCard"
import DowngradeMembership from "@app/(main)/(account)/account/membership/(ui)/DowngradeMembership/DowngradeMembership.tsx"

import styles from "./QuickActions.module.scss"
import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"
import { useState } from "react"
import api from "@/axios.ts"
import { CURRENT_USER_MEMBERSHIP_RENEW_REQUEST_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import type { PaymentCheckoutResponse } from "@shared/interfaces.ts"
import { isAxiosError } from "axios"
import { message } from "antd"

interface QuickActionsProps {
    variant: "active" | "expired"
}

const QuickActions = ({ variant }: QuickActionsProps) => {
    const isExpired = variant === "expired"

    const [isRenewLoading, setIsRenewLoading] = useState(false)

    const handleRenew = async () => {
        try {
            setIsRenewLoading(true)
            const response = await api.post<PaymentCheckoutResponse>(
                CURRENT_USER_MEMBERSHIP_RENEW_REQUEST_URL,
            )
            window.location.href = response.data.checkout_session_url
        } catch (error) {
            if (isAxiosError(error)) {
                if (!error.response) {
                    message.error("Could not connect to the server. Please try again.")
                    return
                }
                const errorMessage: string = error.response?.data.detail
                message.error(errorMessage || "Could not renew membership")
            }
        } finally {
            setIsRenewLoading(false)
        }
    }

    return (
        <ProfileInfoCard>
            <h3>Quick actions</h3>
            <div className={styles.actions}>
                <CustomButton onClick={handleRenew} loading={isRenewLoading} variant={"primary"}>
                    Renew membership
                </CustomButton>
                {!isExpired && <DowngradeMembership />}
                <CustomButton variant={"secondary"}>Download confirmation</CustomButton>
            </div>
        </ProfileInfoCard>
    )
}

export default QuickActions
