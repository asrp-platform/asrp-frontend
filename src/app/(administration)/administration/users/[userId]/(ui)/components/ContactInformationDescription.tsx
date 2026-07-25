import type { IUserPrivate } from "@entities/User.ts"
import { MailOutlined, PhoneOutlined } from "@ant-design/icons"
import { Space } from "antd"

import ProfileFieldList from "@app/(administration)/administration/users/[userId]/(ui)/components/ProfileFieldList.tsx"

type IProps = {
    user: IUserPrivate
}

const ContactInformationDescription = ({ user }: IProps) => {
    const location = [user.city, user.state, user.country].filter(Boolean).join(", ")
    const telegramUsername = user.telegram_username?.replace("@", "")

    return (
        <ProfileFieldList
            title="Contact information"
            variant="contact"
            fields={[
                {
                    label: "Email",
                    value: (
                        <Space>
                            <MailOutlined />
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                        </Space>
                    ),
                },
                {
                    label: "Phone",
                    value: user.phone_number ? (
                        <Space>
                            <PhoneOutlined />
                            <a href={`tel:${user.phone_number}`}>{user.phone_number}</a>
                        </Space>
                    ) : null,
                },
                {
                    label: "Telegram",
                    value: telegramUsername ? (
                        <a
                            href={`https://t.me/${telegramUsername}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            @{telegramUsername}
                        </a>
                    ) : null,
                },
                {
                    label: "Location",
                    value: location,
                },
            ]}
        />
    )
}

export default ContactInformationDescription
