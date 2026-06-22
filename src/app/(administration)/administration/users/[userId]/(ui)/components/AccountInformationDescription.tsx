import type { IUser } from "@entities/User.ts"
import { Descriptions, Tag } from "antd"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"

type IProps = {
    user: IUser
}

const AccountInformationDescription = ({ user }: IProps) => {
    return (
        <Descriptions title="Account information" bordered size="small" column={{ xs: 1, md: 2 }}>
            <Descriptions.Item label="Created at">
                {formatDatetime(user.created_at)}
            </Descriptions.Item>

            <Descriptions.Item label="Last password change">
                {formatDatetime(user.last_password_change)}
            </Descriptions.Item>

            <Descriptions.Item label="Admin access">
                {user.admin ? <Tag color="purple">Granted</Tag> : <Tag>Not granted</Tag>}
            </Descriptions.Item>
        </Descriptions>
    )
}

export default AccountInformationDescription
