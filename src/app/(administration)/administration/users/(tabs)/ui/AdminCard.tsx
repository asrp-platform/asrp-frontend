import { Card, Typography, Flex, Space, Tag, Avatar } from "antd"
import type { IUser } from "@/entities/User.ts"
import { IdcardOutlined, MailOutlined, UserOutlined } from "@ant-design/icons"
import styles from "./AdminCards.module.scss"

interface Props {
    user: IUser
}

const { Title, Text } = Typography

const getInitials = (user: IUser) => {
    return `${user.firstname[0] ?? ""}${user.lastname[0] ?? ""}`.toUpperCase()
}

const AdminCard = ({ user }: Props) => {
    return (
        <Card
            className={styles.adminCard}
            title={
                <Space size={10}>
                    <span className={styles.titleIcon}>
                        <UserOutlined />
                    </span>
                    <Title level={5} className={styles.cardTitle}>
                        User
                    </Title>
                </Space>
            }
        >
            <Flex vertical gap={16} align="center">
                <div className={styles.avatarFrame}>
                    <Avatar
                        className={styles.adminAvatar}
                        size={80}
                        src={user.avatar_url ?? undefined}
                        icon={!user.avatar_url ? <UserOutlined /> : undefined}
                    >
                        {!user.avatar_url && getInitials(user)}
                    </Avatar>
                </div>

                <Flex vertical gap={6} align="center" className={styles.userHeading}>
                    <Title level={4} className={styles.userName}>
                        {user.firstname} {user.lastname}
                    </Title>
                    <Space size={6} wrap>
                        <Tag color={user.admin ? "volcano" : "blue"}>
                            {user.admin ? "Admin" : "Member"}
                        </Tag>
                        {user.role && <Tag>{user.role}</Tag>}
                    </Space>
                </Flex>

                <div className={styles.userMetaList}>
                    <div className={styles.userMetaItem}>
                        <IdcardOutlined />
                        <Text type="secondary">ID</Text>
                        <Text strong>{user.id}</Text>
                    </div>

                    <div className={styles.userMetaItem}>
                        <MailOutlined />
                        <Text type="secondary">Email</Text>
                        <Text strong copyable className={styles.emailText}>
                            {user.email}
                        </Text>
                    </div>
                </div>
            </Flex>
        </Card>
    )
}

export default AdminCard
