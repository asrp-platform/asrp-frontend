import type { IUser } from "@entities/User.ts"
import { Avatar, Space, Tag, Typography } from "antd"
import { UserOutlined } from "@ant-design/icons"

type IProps = {
    user: IUser
}

const getInitials = (user: IUser): string => {
    return `${user.firstname[0] ?? ""}${user.lastname[0] ?? ""}`.toUpperCase()
}

const getFullName = (user: IUser): string => {
    return [user.firstname, user.middlename, user.lastname, user.suffix, user.credentials]
        .filter(Boolean)
        .join(" ")
}

const { Title, Text } = Typography

const MainInformation = ({ user }: IProps) => {
    const fullName = getFullName(user)

    return (
        <Space align="center" size="large">
            <Avatar
                size={80}
                src={user.avatar_url ?? undefined}
                icon={!user.avatar_url ? <UserOutlined /> : undefined}
            >
                {!user.avatar_url && getInitials(user)}
            </Avatar>

            <Space orientation="vertical" size={4}>
                <Title level={3} style={{ margin: 0 }}>
                    {fullName}
                </Title>

                {user.preferred_name && (
                    <Text type="secondary">Preferred name: {user.preferred_name}</Text>
                )}

                <Text type="secondary">User ID: {user.id}</Text>

                <Space wrap>
                    {user.admin && <Tag color="purple">Administrator</Tag>}
                    {user.banned && <Tag color="red">Banned</Tag>}

                    {user.pending ? (
                        <Tag color="orange">Registration incomplete</Tag>
                    ) : (
                        <Tag color="green">Registration completed</Tag>
                    )}
                </Space>
            </Space>
        </Space>
    )
}

export default MainInformation
