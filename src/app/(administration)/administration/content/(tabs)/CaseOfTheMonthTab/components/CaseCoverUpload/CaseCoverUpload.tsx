"use client"

import { PlusOutlined } from "@ant-design/icons"
import { Form, Progress, message } from "antd"
import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type KeyboardEvent,
    type MouseEvent,
} from "react"
import { X } from "lucide-react"

import api from "@/axios.ts"
import { CASE_OF_THE_MONTH_IMAGES_URL } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"
import type { ImagePathResponse } from "@shared/interfaces.ts"

import styles from "./CaseCoverUpload.module.scss"

const MAX_COVER_SIZE = 5 * 1024 * 1024
const ACCEPTED_COVER_TYPES = "image/png,image/jpeg,image/webp,image/gif"

interface IProps {
    open: boolean
    coverKey?: string | null
    coverUrl?: string | null
    disabled?: boolean
    onUploadingChange?: (isUploading: boolean) => void
}

const CaseCoverUpload = ({
    open,
    coverKey,
    coverUrl,
    disabled = false,
    onUploadingChange,
}: IProps) => {
    const form = Form.useFormInstance()
    const inputRef = useRef<HTMLInputElement>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)

    useEffect(() => {
        if (open) {
            setPreviewUrl(coverUrl ?? null)
            setFileName(null)
            form.setFieldValue("cover_key", coverKey ?? null)
        } else {
            setPreviewUrl(null)
            setFileName(null)
            setIsUploading(false)
            setUploadProgress(0)
        }
    }, [coverKey, coverUrl, form, open])

    useEffect(
        () => () => {
            if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl)
        },
        [previewUrl],
    )

    const openFilePicker = () => {
        if (!disabled && !isUploading) inputRef.current?.click()
    }

    const handleZoneKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            openFilePicker()
        }
    }

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        event.target.value = ""

        if (!file) return
        if (!file.type.startsWith("image/")) {
            message.error("Please choose an image file")
            return
        }
        if (file.size > MAX_COVER_SIZE) {
            message.error("Cover image must be smaller than 5 MB")
            return
        }

        const localPreviewUrl = URL.createObjectURL(file)
        setPreviewUrl(localPreviewUrl)
        setFileName(file.name)
        setIsUploading(true)
        onUploadingChange?.(true)
        setUploadProgress(0)

        const formData = new FormData()
        formData.append("file", file)

        try {
            const response = await api.post<ImagePathResponse>(
                CASE_OF_THE_MONTH_IMAGES_URL,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    timeout: 60_000,
                    onUploadProgress: ({ loaded, total }) => {
                        if (total) setUploadProgress(Math.round((loaded / total) * 100))
                    },
                },
            )

            form.setFieldValue("cover_key", response.data.object_key)
        } catch (error) {
            form.setFieldValue("cover_key", coverKey ?? null)
            setPreviewUrl(coverUrl ?? null)
            setFileName(null)
            handleApiError({
                error,
                statusMessages: {
                    413: "This image is too large to upload.",
                    415: "This image format is not supported.",
                },
            })
        } finally {
            setIsUploading(false)
            onUploadingChange?.(false)
        }
    }

    const removeCover = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        form.setFieldValue("cover_key", null)
        setPreviewUrl(null)
        setFileName(null)
    }

    return (
        <Form.Item label="Cover image · optional">
            <div
                className={styles.uploadZone}
                role="button"
                tabIndex={0}
                aria-label="Upload cover image"
                onClick={openFilePicker}
                onKeyDown={handleZoneKeyDown}
            >
                {previewUrl ? (
                    <img className={styles.preview} src={previewUrl} alt="Case cover preview" />
                ) : (
                    <div className={styles.placeholder}>
                        <PlusOutlined />
                        <span>Upload cover image</span>
                    </div>
                )}

                <input
                    ref={inputRef}
                    className={styles.input}
                    type="file"
                    accept={ACCEPTED_COVER_TYPES}
                    onChange={handleFileChange}
                    disabled={disabled || isUploading}
                />

                {previewUrl && (
                    <button
                        type="button"
                        className={styles.removeButton}
                        aria-label="Remove cover image"
                        onClick={removeCover}
                        disabled={disabled || isUploading}
                    >
                        <X size={18} />
                    </button>
                )}

                {isUploading && (
                    <div className={styles.loader}>
                        <Progress type="circle" percent={uploadProgress} size={58} />
                        <span>Uploading cover…</span>
                    </div>
                )}
            </div>
            {fileName && !isUploading && <span className={styles.fileName}>{fileName}</span>}
        </Form.Item>
    )
}

export default CaseCoverUpload
