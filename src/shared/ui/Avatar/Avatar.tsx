"use client"

import type { IUser } from "../../../entities/User.ts"
import styles from "./avatar.module.scss"
import { getAvatarUrl, putUserAvatarUrl } from "../../backend/restApiUrls.ts"
import { type ChangeEvent, useState } from "react"
import api from "../../../axios.ts"
import type { ImagePathResponse } from "../../types/interfaces.ts"
import { message } from "antd"
import CircularProgress from "@mui/material/CircularProgress"
import axios from "axios"

interface AvatarProps {
    user: IUser
    editable?: boolean
}

const MAX_FILE_SIZE_MB = 5

const Avatar = ({ user, editable = false }: AvatarProps) => {
    const [avatarPath, setAvatarPath] = useState<string | null>(user.avatar_path ?? null)
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

            const res = await api.put<ImagePathResponse>(putUserAvatarUrl(user.id), formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })

            setAvatarPath(res.data.path)

            message.success("Avatar updated successfully")
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
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

    if (!editable) {
        if (avatarPath) {
            return (
                <img
                    src={`${getAvatarUrl(avatarPath)}?v=${Date.now()}`}
                    alt="avatar"
                    className={styles.avatarImage}
                />
            )
        }

        return (
            <div className={styles.avatarFallback}>
                {user.firstname[0]} {user.lastname[0]}
            </div>
        )
    }

    return (
        <div className={styles.avatarWrapper}>
            {avatarPath ? (
                <img
                    src={`${getAvatarUrl(avatarPath)}?v=${Date.now()}`}
                    alt="avatar"
                    className={styles.avatarImage}
                />
            ) : (
                <div className={styles.avatarFallback}>
                    {user.firstname[0]} {user.lastname[0]}
                </div>
            )}

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
        </div>
    )
}

export default Avatar
