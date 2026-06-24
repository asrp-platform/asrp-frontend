import type { IUserMembership } from "@entities/Membership.ts"
import PrimaryLinkOutlined from "@shared/ui/Buttons/PrimaryLinkOutlined/PrimaryLinkOutlined.tsx"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"
import { Alert } from "antd"

import styles from "./MembershipStatusAlert.module.scss"

interface IProps {
    membership: IUserMembership
    variant?: "full" | "compact"
}

const MembershipSuspended = ({ membership, variant = "full" }: IProps) => {
    const isCompact = variant === "compact"

    return (
        <Alert
            showIcon
            type="warning"
            title={<span className={styles.title}>Membership is suspended</span>}
            description={
                <div
                    className={
                        isCompact
                            ? `${styles.description} ${styles.compactDescription}`
                            : styles.description
                    }
                >
                    <span>
                        {isCompact
                            ? "Your ASRP membership is currently suspended."
                            : "Your ASRP membership is currently suspended. Some membership benefits and account membership actions may be unavailable until the suspension is lifted."}
                    </span>

                    {!isCompact && (
                        <>
                            {membership.suspended_at && (
                                <span>
                                    <b>Suspended at:</b> {formatDatetime(membership.suspended_at)}
                                </span>
                            )}
                            {membership.suspended_until && (
                                <span>
                                    <b>Suspended until:</b>{" "}
                                    {formatDatetime(membership.suspended_until)}
                                </span>
                            )}
                            {membership.suspension_reason && (
                                <span>
                                    <b>Reason:</b> {membership.suspension_reason}
                                </span>
                            )}
                            <span>
                                If you have questions about this suspension, please contact ASRP
                                support for assistance.
                            </span>
                        </>
                    )}

                    {isCompact && (
                        <div className={styles.actions}>
                            <PrimaryLinkOutlined href="/account/membership">
                                View membership
                            </PrimaryLinkOutlined>
                        </div>
                    )}
                </div>
            }
            className={styles.alert}
        />
    )
}

export default MembershipSuspended
