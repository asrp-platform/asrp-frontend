"use client"

import type { CSSProperties } from "react"

import type { IUserPrivate } from "@/entities/User.ts"
import styles from "@/shared/ui/Avatar/avatar.module.scss"

interface UserAvatarViewProps {
    user: Pick<IUserPrivate, "firstname" | "lastname" | "avatar_url">
    avatarUrl?: string | null
    size?: number
}

const UserAvatarView = ({ user, avatarUrl = user.avatar_url, size }: UserAvatarViewProps) => {
    const avatarStyles: CSSProperties = size ? { width: size, height: size } : {}

    return (
        <div className={styles.avatarWrapper} style={avatarStyles}>
            {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" className={styles.avatarImage} />
            ) : (
                <div className={styles.avatarFallback}>
                    {user.firstname[0]} {user.lastname[0]}
                </div>
            )}
        </div>
    )
}

export default UserAvatarView
