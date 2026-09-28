"use client"

import { EditorContent, useEditor, type JSONContent } from "@tiptap/react"
import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { ImageIcon, LoaderCircle } from "lucide-react"
import { message, Progress } from "antd"

import { createEditorExtensions } from "@app/(main)/about/directors-board/(components)/ViewCard/helpers/editorExtenstions.tsx"
import api from "@/axios.ts"
import { CASE_OF_THE_MONTH_IMAGES_URL } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"
import type { ImagePathResponse } from "@shared/interfaces.ts"
import EditorMenuBar from "@widgets/TiptapEditor/EditorMenuBar.tsx"

import styles from "./CaseContentEditor.module.scss"

const caseEditorExtensions = createEditorExtensions([2, 3, 4, 5], { image: true })
const emptyDocument: JSONContent = {
    type: "doc",
    content: [{ type: "paragraph" }],
}

interface IProps {
    value?: JSONContent
    onChange?: (value: JSONContent) => void
    placeholder?: string
    disabled?: boolean
}

const CaseContentEditor = ({ value, onChange, placeholder, disabled = false }: IProps) => {
    const imageInputRef = useRef<HTMLInputElement>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const editor = useEditor({
        extensions: caseEditorExtensions,
        immediatelyRender: false,
        editable: !disabled,
        content: value ?? emptyDocument,
        onUpdate: ({ editor: currentEditor }) => onChange?.(currentEditor.getJSON()),
    })

    useEffect(() => {
        if (!editor || !value) return

        const currentContent = JSON.stringify(editor.getJSON())
        const nextContent = JSON.stringify(value)

        if (currentContent !== nextContent) {
            editor.commands.setContent(value)
        }
    }, [editor, value])

    useEffect(() => {
        editor?.setEditable(!disabled)
    }, [disabled, editor])

    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        event.target.value = ""

        if (!file) return
        if (!file.type.startsWith("image/")) {
            message.error("Please choose an image file")
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            message.error("Content image must be smaller than 5 MB")
            return
        }

        const formData = new FormData()
        formData.append("file", file)
        setIsUploading(true)
        setUploadProgress(0)

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

            editor
                ?.chain()
                .focus()
                .insertContent({
                    type: "image",
                    attrs: {
                        src: response.data.file_url,
                        objectKey: response.data.object_key,
                        alt: file.name,
                        title: file.name,
                        width: "100%",
                    },
                })
                .run()
        } catch (error) {
            handleApiError({
                error,
                statusMessages: {
                    413: "This image is too large to upload.",
                    415: "This image format is not supported.",
                },
            })
        } finally {
            setIsUploading(false)
        }
    }

    if (!editor) return null

    return (
        <div className={styles.editor}>
            <div className={styles.toolbar}>
                <EditorMenuBar
                    editor={editor}
                    show={!disabled}
                    extendOptions={(currentEditor) => [
                        {
                            icon: isUploading ? (
                                <LoaderCircle className={styles.inlineLoader} width={18} />
                            ) : (
                                <ImageIcon width={18} />
                            ),
                            title: "Upload image",
                            onClick: () => imageInputRef.current?.click(),
                            disabled: disabled || isUploading,
                        },
                        ...(["50%", "75%", "100%"] as const).map((width) => ({
                            icon: (
                                <span className={styles.imageSizeLabel}>
                                    {width.replace("%", "")}
                                </span>
                            ),
                            title: `Set selected image width to ${width}`,
                            onClick: () =>
                                currentEditor
                                    .chain()
                                    .focus()
                                    .updateAttributes("image", { width })
                                    .run(),
                            disabled: disabled || !currentEditor.isActive("image"),
                            pressed:
                                currentEditor.isActive("image") &&
                                (currentEditor.getAttributes("image").width ?? "100%") === width,
                        })),
                    ]}
                />
            </div>
            <input
                ref={imageInputRef}
                className={styles.input}
                type="file"
                hidden
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={handleImageChange}
                disabled={disabled || isUploading}
            />
            {isUploading && (
                <div className={styles.uploadProgress}>
                    <span>Uploading image…</span>
                    <Progress percent={uploadProgress} size="small" />
                </div>
            )}
            <EditorContent
                editor={editor}
                className={styles.editorContent}
                data-placeholder={placeholder}
            />
        </div>
    )
}

export default CaseContentEditor
