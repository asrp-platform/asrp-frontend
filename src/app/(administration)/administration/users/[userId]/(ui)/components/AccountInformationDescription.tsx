import type { IUser } from "@entities/User.ts"
import { Alert, Descriptions, Space, Tag } from "antd"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"

type IProps = {
    user: IUser
}

const AccountInformationDescription = ({ user }: IProps) => {
    return (
        <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
            {user.banned && (
                <Alert
                    type="error"
                    showIcon
                    title="This user is banned"
                    description={user.ban_reason || "No reason provided"}
                />
            )}

            <Descriptions
                title="Account information"
                bordered
                size="small"
                column={{ xs: 1, md: 2 }}
            >
                <Descriptions.Item label="Created at">
                    {formatDatetime(user.created_at)}
                </Descriptions.Item>

                <Descriptions.Item label="Last password change">
                    {formatDatetime(user.last_password_change)}
                </Descriptions.Item>

                <Descriptions.Item label="Admin access">
                    {user.admin ? <Tag color="purple">Granted</Tag> : <Tag>Not granted</Tag>}
                </Descriptions.Item>

                <Descriptions.Item label="Ban status">
                    {user.banned ? (
                        <Tag color="red">Banned</Tag>
                    ) : (
                        <Tag color="green">Not banned</Tag>
                    )}
                </Descriptions.Item>

                {user.banned && (
                    <>
                        <Descriptions.Item label="Ban reason">
                            {user.ban_reason || "No reason provided"}
                        </Descriptions.Item>
                    </>
                )}
            </Descriptions>
        </Space>
    )
}

export default AccountInformationDescription
