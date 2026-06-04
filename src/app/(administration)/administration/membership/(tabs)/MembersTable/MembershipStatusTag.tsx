import type { IUserMembership } from "@entities/Membership.ts"
import { Tag, Tooltip } from "antd"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"

interface MembershipStatusTagProps {
    membership: IUserMembership
}

const renderTooltipTitle = (details: Array<string | null | false>) => {
    const visibleDetails = details.filter((detail): detail is string => Boolean(detail))

    if (!visibleDetails.length) {
        return null
    }

    return (
        <div>
            {visibleDetails.map((detail) => (
                <div key={detail}>{detail}</div>
            ))}
        </div>
    )
}

const MembershipStatusTag = ({ membership }: MembershipStatusTagProps) => {
    if (membership.terminated) {
        return (
            <Tooltip
                title={renderTooltipTitle([
                    membership.terminated_at &&
                        `Terminated at: ${formatDatetime(membership.terminated_at)}`,
                    membership.termination_reason && `Reason: ${membership.termination_reason}`,
                ])}
            >
                <Tag color="red">Terminated</Tag>
            </Tooltip>
        )
    }

    if (membership.is_suspended) {
        return (
            <Tooltip
                title={renderTooltipTitle([
                    membership.suspended_at &&
                        `Suspended at: ${formatDatetime(membership.suspended_at)}`,
                    membership.suspended_until &&
                        `Suspended until: ${formatDatetime(membership.suspended_until)}`,
                    membership.suspension_reason && `Reason: ${membership.suspension_reason}`,
                ])}
            >
                <Tag color="gold">Suspended</Tag>
            </Tooltip>
        )
    }

    if (membership.is_active) {
        return <Tag color="green">Active</Tag>
    }

    return <Tag>Inactive</Tag>
}

export default MembershipStatusTag
