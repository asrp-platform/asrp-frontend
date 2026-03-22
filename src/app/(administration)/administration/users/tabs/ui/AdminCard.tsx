import { Card, Typography, Flex, Space } from "antd"
import type { IUser } from "../../../../../../entities/User.ts"
import { UserOutlined } from "@ant-design/icons"
import UserAvatar from "../../../../../../shared/ui/Avatar/UserAvatar.tsx"

interface Props {
    user: IUser
}

const { Title, Text } = Typography

const AdminCard = ({ user }: Props) => {
    return (
        <Card
            style={{ minWidth: 320 }}
            title={
                <Space>
                    <UserOutlined />
                    <Title level={5} style={{ margin: 0 }}>
                        User
                    </Title>
                </Space>
            }
        >
            <Flex vertical gap={8}>
                <UserAvatar user={user} size={120} />

                <Text>
                    <b>ID:</b> {user.id}
                </Text>

                <Text>
                    <b>Name:</b> {user.firstname} {user.lastname}
                </Text>

                <Text>
                    <b>Email:</b> {user.email}
                </Text>

                <Text>
                    <b>Role:</b> {user.role}
                </Text>

                <Text>
                    <b>Institution:</b> {user.institution}
                </Text>
            </Flex>
        </Card>
    )
}

export default AdminCard
