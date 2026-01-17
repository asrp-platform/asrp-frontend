"use client"

import { type ChangeEvent, useEffect, useState } from "react"
import styles from "./styles.module.scss"
import type { IDirectorsBoardMember } from "../../../../../../../entities/DirectorsBoardMember.ts"
import api from "../../../../../../../axios.ts"

import { DIRECTORS_BOARD_MEMBER_IMAGES_URL } from "../../../../../../../shared/backend/adminApiUrls.ts"
import { getDirectorMemberImageUrl } from "../../../../../../../shared/backend/restApiUrls.ts"

interface ImagePathResponse {
    path: string
}

interface Props {
    member: IDirectorsBoardMember
    editable?: boolean
    onPhotoChange?: (_photoUrl: string) => void
}

const CardPhoto = ({ member, editable = false, onPhotoChange }: Props) => {
    const [photoUrl, setPhotoUrl] = useState<string | null>(member.photo_url ?? null)
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        setPhotoUrl(member.photo_url ?? null)
    }, [member.photo_url])

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)

        try {
            setIsUploading(true)

            const res = await api.post<ImagePathResponse>(
                DIRECTORS_BOARD_MEMBER_IMAGES_URL,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            )

            const newPhotoUrl = getDirectorMemberImageUrl(res.data.path)

            setPhotoUrl(newPhotoUrl)
            onPhotoChange?.(newPhotoUrl)
        } catch (error) {
            console.error("Image upload failed:", error)
        } finally {
            setIsUploading(false)
            e.target.value = ""
        }
    }

    return (
        <div className={styles.photoContainer}>
            <div className={styles.photoInnerContainer}>
                {photoUrl ? (
                    <img src={photoUrl} alt="Member photo" />
                ) : (
                    <div className={styles.placeholder}>No photo</div>
                )}

                {editable && (
                    <>
                        <input
                            type="file"
                            id={`photo-${member.id}`}
                            className={styles.photoInput}
                            onChange={handleFileChange}
                            accept="image/*"
                            disabled={isUploading}
                        />

                        <label htmlFor={`photo-${member.id}`} className={styles.photoOverlay}>
                            {isUploading ? "Uploading..." : "Change photo"}
                        </label>
                    </>
                )}
            </div>
        </div>
    )
}

export default CardPhoto
