"use client"

import { useState } from "react"
import { Button, Card, Divider, Modal, message } from "antd"

import styles from "./styles.module.scss"
import type { IUser } from "../../../../../../entities/User.ts"
import PersonalInfoForm from "../(forms)/PersonalInfoForm.tsx"
import ProfessionalInfoForm from "../(forms)/ProfessionalInfoForm.tsx"
import UserAvatar from "../../../../../../shared/ui/Avatar/UserAvatar.tsx"
import api from "../../../../../../axios.ts"
import { CURRENT_USER_AVATAR_URL } from "../../../../../../shared/backend/currentUserUrls.ts"

interface IProps {
    user: IUser
}

const UserProfileCard = ({ user }: IProps) => {
    const [isDeletingAvatar, setIsDeletingAvatar] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()

    const deleteAvatar = async () => {
        setIsDeletingAvatar(true)

        try {
            await api.delete(CURRENT_USER_AVATAR_URL)
            messageApi.success("Avatar deleted successfully")
        } catch (error) {
            console.error(error)
            messageApi.error("Failed to delete avatar")
        } finally {
            setIsDeletingAvatar(false)
        }
    }

    const handleDeleteAvatarClick = () => {
        Modal.confirm({
            title: "Delete avatar?",
            content: "This action cannot be undone.",
            okText: "Delete",
            cancelText: "Cancel",
            okButtonProps: {
                danger: true,
                loading: isDeletingAvatar,
            },
            async onOk() {
                await deleteAvatar()
            },
        })
    }

    return (
        <>
            {contextHolder}

            <Card className={styles.card}>
                <div className={styles.avatarContainer}>
                    <div className={styles.avatarInnerContainer}>
                        <UserAvatar user={user} editable size={120} />
                        <Button
                            danger
                            loading={isDeletingAvatar}
                            disabled={isDeletingAvatar}
                            onClick={handleDeleteAvatarClick}
                        >
                            Delete Avatar
                        </Button>
                    </div>
                </div>

                <PersonalInfoForm user={user} />
                <Divider />
                <ProfessionalInfoForm user={user} />
            </Card>
        </>
    )
}

export default UserProfileCard
