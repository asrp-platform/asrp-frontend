import { type ChangeEvent } from "react"
import styles from "@/app/(main)/about/directors-board/(components)/CreateCard/ui/UI.module.scss"
import api from "@/axios.ts"
import type { ImagePathResponse } from "@/shared/types/interfaces.ts"
import { DIRECTORS_BOARD_MEMBER_IMAGES_URL } from "@/shared/backend/rest-api-urls/admin/adminApiUrls.ts"

import { Image } from "lucide-react"
import { isAxiosError } from "axios"
import { message } from "antd"

interface IProps {
    setUploadedImageUrl: (_photo_url: string | null) => void
    uploadedImageUrl: string | null
}

const PhotoInput = ({ setUploadedImageUrl, uploadedImageUrl }: IProps) => {
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)

        try {
            const res = await api.put<ImagePathResponse>(
                DIRECTORS_BOARD_MEMBER_IMAGES_URL,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } },
            )
            setUploadedImageUrl(res.data.path)
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status === 415) {
                    message.error("Invalid content type")
                }
            }
        } finally {
            e.target.value = ""
        }
    }

    return (
        <div className={styles.photoInputContainer}>
            <div className={styles.photoContainer}>
                {uploadedImageUrl ? (
                    <img
                        className={styles.uploadedImage}
                        src={uploadedImageUrl}
                        alt="Member photo"
                    />
                ) : (
                    <div className={styles.placeholder}>
                        <Image width={32} height={32} />
                    </div>
                )}
            </div>
            <input
                type="file"
                id="photo-input"
                className={styles.photoInput}
                onChange={handleFileChange}
                accept="image/*"
            />
            <label htmlFor="photo-input" className={styles.photoOverlay}>
                Change photo
            </label>
        </div>
    )
}

export default PhotoInput
