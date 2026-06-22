"use client"

import { useQuery } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { Avatar, Card, Descriptions, Divider, Result, Space, Tag, Typography } from "antd"
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons"

import api from "@/axios.ts"
import type { IUser } from "@entities/User.ts"
import { getAdminUsersUrl } from "@shared/backend/restApiUrls/admin/adminApiUrls.ts"
import Loading from "@app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"

const { Title, Text } = Typography

interface IProps {
    userId: string
}

const getFullName = (user: IUser): string => {
    return [user.firstname, user.middlename, user.lastname, user.suffix, user.credentials]
        .filter(Boolean)
        .join(" ")
}

const getInitials = (user: IUser): string => {
    return `${user.firstname[0] ?? ""}${user.lastname[0] ?? ""}`.toUpperCase()
}

const formatDate = (value: string | null): string => {
    if (!value) {
        return "—"
    }

    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value))
}

const UserDataCard = ({ userId }: IProps) => {
    const {
        data: user,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["users", userId],
        queryFn: async () => {
            const response = await api.get<IUser>(getAdminUsersUrl(userId))
            return response.data
        },
        staleTime: 1000 * 60 * 5,
        retry: false,
    })

    if (isLoading) {
        return <Loading />
    }

    const status = isAxiosError(error) ? error.response?.status : undefined

    if (isError && status === 404) {
        return (
            <Result status="404" title="404" subTitle={`User with ID "${userId}" was not found`} />
        )
    }

    if (isError) {
        return (
            <Result
                status="error"
                title="Unable to load user"
                subTitle={
                    isAxiosError(error) && !error.response
                        ? "Network error. Check your internet connection and try again."
                        : "Something went wrong. Please try again later."
                }
            />
        )
    }

    if (!user) {
        return null
    }

    const fullName = getFullName(user)

    const location = [user.city, user.state, user.country].filter(Boolean).join(", ")

    const telegramUsername = user.telegram_username?.replace("@", "")

    return (
        <Card title="User profile" variant="outlined">
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

                        {user.pending ? (
                            <Tag color="orange">Registration incomplete</Tag>
                        ) : (
                            <Tag color="green">Registration completed</Tag>
                        )}
                    </Space>
                </Space>
            </Space>

            <Divider />

            <Descriptions
                title="Contact information"
                bordered
                size="small"
                column={{ xs: 1, md: 2 }}
            >
                <Descriptions.Item label="Email">
                    <Space>
                        <MailOutlined />
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                    </Space>
                </Descriptions.Item>

                <Descriptions.Item label="Phone">
                    {user.phone_number ? (
                        <Space>
                            <PhoneOutlined />
                            <a href={`tel:${user.phone_number}`}>{user.phone_number}</a>
                        </Space>
                    ) : (
                        "—"
                    )}
                </Descriptions.Item>

                <Descriptions.Item label="Telegram">
                    {telegramUsername ? (
                        <a
                            href={`https://t.me/${telegramUsername}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            @{telegramUsername}
                        </a>
                    ) : (
                        "—"
                    )}
                </Descriptions.Item>

                <Descriptions.Item label="Location">{location || "—"}</Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions
                title="Professional information"
                bordered
                size="small"
                column={{ xs: 1, md: 2 }}
            >
                <Descriptions.Item label="Institution">{user.institution || "—"}</Descriptions.Item>

                <Descriptions.Item label="Role">{user.role || "—"}</Descriptions.Item>

                <Descriptions.Item label="Languages spoken">
                    {user.languages_spoken || "—"}
                </Descriptions.Item>

                <Descriptions.Item label="Professional interests">
                    {user.professional_interests || "—"}
                </Descriptions.Item>

                <Descriptions.Item label="Description" span={2}>
                    {user.description || "—"}
                </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions
                title="Account information"
                bordered
                size="small"
                column={{ xs: 1, md: 2 }}
            >
                <Descriptions.Item label="Created at">
                    {formatDate(user.created_at)}
                </Descriptions.Item>

                <Descriptions.Item label="Last password change">
                    {formatDate(user.last_password_change)}
                </Descriptions.Item>

                <Descriptions.Item label="Admin access">
                    {user.admin ? <Tag color="purple">Granted</Tag> : <Tag>Not granted</Tag>}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    )
}

export default UserDataCard
