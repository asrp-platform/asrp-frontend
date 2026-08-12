"use client"

import type { IUserPrivate } from "@/entities/User.ts"
import styles from "@/shared/ui/Avatar/avatar.module.scss"
import { type ChangeEvent, useEffect, useId, useState } from "react"
import api from "@/axios.ts"
import { message } from "antd"
import CircularProgress from "@mui/material/CircularProgress"
import { CURRENT_USER_AVATAR_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import { isAxiosError } from "axios"
import UserAvatarView from "@/shared/ui/Avatar/UserAvatarView.tsx"
import { CURRENT_USER_QUERY_KEY } from "@shared/backend/queries/useCurrentUserQuery.ts"
import { useQueryClient } from "@tanstack/react-query"

interface AvatarProps {
    user: IUserPrivate
    editable?: boolean
    size?: number
}

const MAX_FILE_SIZE_MB = 5

const UserAvatar = ({ user, editable = false, size }: AvatarProps) => {
    const avatarInputId = useId()
    const queryClient = useQueryClient()
    const [avatarUrl, setAvatarUrl] = useState<string | null>(user.avatar_url)
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        setAvatarUrl(user.avatar_url)
    }, [user.avatar_url])

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith("image/")) {
            message.error("Only image files are allowed")
            return
        }

        if (file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
            message.error(`File must be smaller than ${MAX_FILE_SIZE_MB}MB`)
            return
        }

        const formData = new FormData()
        formData.append("file", file)

        try {
            setIsUploading(true)

            const res = await api.put<string>(CURRENT_USER_AVATAR_URL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })

            setAvatarUrl(res.data)
            queryClient.setQueryData<IUserPrivate | undefined>(
                CURRENT_USER_QUERY_KEY,
                (currentUser) =>
                    currentUser ? { ...currentUser, avatar_url: res.data } : currentUser,
            )

            message.success("Avatar updated successfully")
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                const backendMessage = error.response?.data?.detail || error.response?.data?.message
                message.error(backendMessage || "Failed to upload avatar")
            } else {
                message.error("Unexpected error occurred")
            }
        } finally {
            setIsUploading(false)
            e.target.value = ""
        }
    }

    return (
        <div className={styles.editableAvatarWrapper}>
            <UserAvatarView user={user} avatarUrl={avatarUrl} size={size} />

            {editable && (
                <>
                    {isUploading && (
                        <div className={styles.loadingOverlay}>
                            <CircularProgress size={40} />
                        </div>
                    )}

                    <div className={styles.avatarOverlay}>
                        <input
                            type="file"
                            accept="image/*"
                            id={avatarInputId}
                            className={styles.avatarInput}
                            onChange={handleFileChange}
                            disabled={isUploading}
                        />
                        <label htmlFor={avatarInputId} className={styles.avatarLabel}>
                            Change
                        </label>
                    </div>
                </>
            )}
        </div>
    )
}

export default UserAvatar
