import { MembershipRequestStatusEnum } from "@entities/Membership.ts"
import { Tag } from "antd"

interface IProps {
    status: MembershipRequestStatusEnum
}

const MembershipRequestStatusTag = ({ status }: IProps) => {
    switch (status) {
        case MembershipRequestStatusEnum.APPROVED:
            return <Tag color="green">Approved</Tag>
        case MembershipRequestStatusEnum.REJECTED:
            return <Tag color="red">Rejected</Tag>
        case MembershipRequestStatusEnum.PAID:
            return <Tag color="blue">Paid</Tag>
        case MembershipRequestStatusEnum.PAYMENT_PENDING:
            return <Tag color="gold">Payment pending</Tag>
        case MembershipRequestStatusEnum.PAYMENT_FAILED:
            return <Tag color="red">Payment failed</Tag>
        default:
            return <Tag>{status}</Tag>
    }
}

export default MembershipRequestStatusTag
