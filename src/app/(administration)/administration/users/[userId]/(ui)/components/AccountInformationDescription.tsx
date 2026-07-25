import type { IUserPrivate } from "@entities/User.ts"
import { Alert, Space, Tag } from "antd"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"

import ProfileFieldList from "@app/(administration)/administration/users/[userId]/(ui)/components/ProfileFieldList.tsx"

type IProps = {
    user: IUserPrivate
}

const AccountInformationDescription = ({ user }: IProps) => {
    return (
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            {user.banned && (
                <Alert
                    type="error"
                    showIcon
                    message="This user is banned"
                    description={user.ban_reason || "No reason provided"}
                />
            )}

            <ProfileFieldList
                title="Account information"
                variant="account"
                fields={[
                    {
                        label: "Created at",
                        value: formatDatetime(user.created_at),
                    },
                    {
                        label: "Last password change",
                        value: formatDatetime(user.last_password_change),
                    },
                    {
                        label: "Admin access",
                        value: user.admin ? (
                            <Tag color="purple">Granted</Tag>
                        ) : (
                            <Tag>Not granted</Tag>
                        ),
                    },
                    {
                        label: "Ban status",
                        value: user.banned ? (
                            <Tag color="red">Banned</Tag>
                        ) : (
                            <Tag color="green">Not banned</Tag>
                        ),
                    },
                    ...(user.banned
                        ? [
                              {
                                  label: "Ban reason",
                                  value: user.ban_reason || "No reason provided",
                                  wide: true,
                              },
                          ]
                        : []),
                ]}
            />
        </Space>
    )
}

export default AccountInformationDescription
