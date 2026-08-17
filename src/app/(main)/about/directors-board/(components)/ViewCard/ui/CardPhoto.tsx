"use client"

import { type ChangeEvent, useEffect, useState } from "react"
import styles from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/styles.module.scss"
import type { IDirectorsBoardMember } from "@/entities/DirectorsBoardMember.ts"
import api from "@/axios.ts"

import { DIRECTORS_BOARD_MEMBER_IMAGES_URL } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { isAxiosError } from "axios"
import { message } from "antd"
import type { ImagePathResponse } from "@shared/interfaces.ts"

interface Props {
    member: IDirectorsBoardMember
    editable?: boolean
    onPhotoChange?: (_photoUrl: string) => void
}

const CardPhoto = ({ member, editable = false, onPhotoChange }: Props) => {
    const [photoUrl, setPhotoUrl] = useState<string | null>(member.photo_url ?? null)
    const [isUploading, setIsUploading] = useState(false)
    const [isPhotoLoading, setIsPhotoLoading] = useState(Boolean(member.photo_url))
    const [hasPhotoError, setHasPhotoError] = useState(false)

    useEffect(() => {
        setPhotoUrl(member.photo_url ?? null)
        setIsPhotoLoading(Boolean(member.photo_url))
        setHasPhotoError(false)
    }, [member.photo_url])

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)

        try {
            setIsUploading(true)

            const res = await api.put<ImagePathResponse>(
                DIRECTORS_BOARD_MEMBER_IMAGES_URL,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } },
            )

            const newPhotoUrl = res.data.file_url

            setPhotoUrl(newPhotoUrl)
            setIsPhotoLoading(true)
            setHasPhotoError(false)
            onPhotoChange?.(newPhotoUrl)
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status === 415) {
                    message.error("Invalid content type")
                }
            }
        } finally {
            setIsUploading(false)
            e.target.value = ""
        }
    }
    const handlePhotoRemove = () => {
        setPhotoUrl(null)
        setIsPhotoLoading(false)
        setHasPhotoError(false)
        onPhotoChange?.("")
    }

    return (
        <div className={styles.photoContainer}>
            <div className={styles.photoInnerContainer}>
                {photoUrl && !hasPhotoError ? (
                    <>
                        {isPhotoLoading && <div className={styles.photoSkeleton} />}
                        <img
                            src={photoUrl}
                            alt={`${member.name} portrait`}
                            width={180}
                            height={180}
                            loading="lazy"
                            decoding="async"
                            className={isPhotoLoading ? styles.photoLoading : undefined}
                            onLoad={() => setIsPhotoLoading(false)}
                            onError={() => {
                                setIsPhotoLoading(false)
                                setHasPhotoError(true)
                            }}
                        />
                    </>
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
                        {photoUrl && (
                            <button
                                type="button"
                                className={styles.removePhotoButton}
                                onClick={handlePhotoRemove}
                                disabled={isUploading}
                            >
                                Remove photo
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default CardPhoto
