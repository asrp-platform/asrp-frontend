import type { IUser } from "@entities/User.ts"
import { Descriptions, Space } from "antd"
import { MailOutlined, PhoneOutlined } from "@ant-design/icons"

type IProps = {
    user: IUser
}

const ContactInformationDescription = ({ user }: IProps) => {
    const location = [user.city, user.state, user.country].filter(Boolean).join(", ")
    const telegramUsername = user.telegram_username?.replace("@", "")

    return (
        <Descriptions title="Contact information" bordered size="small" column={{ xs: 1, md: 2 }}>
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
                    <a href={`https://t.me/${telegramUsername}`} target="_blank" rel="noreferrer">
                        @{telegramUsername}
                    </a>
                ) : (
                    "—"
                )}
            </Descriptions.Item>

            <Descriptions.Item label="Location">{location || "—"}</Descriptions.Item>
        </Descriptions>
    )
}

export default ContactInformationDescription
