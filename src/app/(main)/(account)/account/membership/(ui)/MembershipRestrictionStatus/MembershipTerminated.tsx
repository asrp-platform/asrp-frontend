import type { IUserMembership } from "@entities/Membership.ts"
import PrimaryLinkOutlined from "@shared/ui/Buttons/PrimaryLinkOutlined/PrimaryLinkOutlined.tsx"
import { Alert } from "antd"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"

import styles from "./MembershipStatusAlert.module.scss"

interface IProps {
    membership: IUserMembership
    variant?: "full" | "compact"
}

const MembershipTerminated = ({ membership, variant = "full" }: IProps) => {
    const isCompact = variant === "compact"

    return (
        <Alert
            showIcon
            type="error"
            title={<span className={styles.title}>Membership is terminated</span>}
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
                            ? "Your ASRP membership has been permanently terminated."
                            : "Your ASRP membership has been permanently terminated. Membership benefits and account membership actions are no longer available."}
                    </span>

                    {!isCompact && (
                        <>
                            {membership.terminated_at && (
                                <span>
                                    <b>Terminated at:</b> {formatDatetime(membership.terminated_at)}
                                </span>
                            )}
                            {membership.termination_reason && (
                                <span>
                                    <b>Reason:</b> {membership.termination_reason}
                                </span>
                            )}
                            <span>
                                If you believe this is a mistake, please contact ASRP support for
                                assistance.
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

export default MembershipTerminated
