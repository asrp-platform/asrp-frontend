"use client"

import type { IUser } from "../../../entities/User.ts"
import styles from "./avatar.module.scss"
import { type ChangeEvent, type CSSProperties, useEffect, useState } from "react"
import api from "../../../axios.ts"
import { message } from "antd"
import CircularProgress from "@mui/material/CircularProgress"
import { CURRENT_USER_AVATAR_URL } from "../../backend/rest-api-urls/currentUserUrls.ts"
import { isAxiosError } from "axios"

interface AvatarProps {
    user: IUser
    editable?: boolean
    size?: number
}

const MAX_FILE_SIZE_MB = 5

const UserAvatar = ({ user, editable = false, size }: AvatarProps) => {
    const [avatarPath, setAvatarPath] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)

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

            const res = await api.put(CURRENT_USER_AVATAR_URL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })

            setAvatarPath(res.data)

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

    const avatarStyles: CSSProperties = size ? { width: size, height: size } : {}

    useEffect(() => {
        const getAvatarUrl = async () => {
            try {
                const response = await api.get(CURRENT_USER_AVATAR_URL)
                setAvatarPath(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getAvatarUrl()
    }, [])

    return (
        <div className={styles.avatarWrapper} style={avatarStyles}>
            {avatarPath ? (
                <img src={avatarPath} alt="avatar" className={styles.avatarImage} />
            ) : (
                <div className={styles.avatarFallback}>
                    {user.firstname[0]} {user.lastname[0]}
                </div>
            )}

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
                            id="avatar-input"
                            className={styles.avatarInput}
                            onChange={handleFileChange}
                            disabled={isUploading}
                        />
                        <label htmlFor="avatar-input" className={styles.avatarLabel}>
                            Change
                        </label>
                    </div>
                </>
            )}
        </div>
    )
}

export default UserAvatar
