"use client"

import { message, Modal } from "antd"
import { useEffect, useRef, useState } from "react"

import styles from "./styles.module.scss"
import type { IDirectorsBoardMember } from "../../../../../../../entities/DirectorsBoardMember.ts"
import ResetModal from "./ResetModal.tsx"
import { type Content, EditorContent, useEditor } from "@tiptap/react"
import { detailViewExtensions } from "../helpers/editorExtenstions.tsx"
import EditorMenuBar from "../../../../../../../widgets/TiptapEditor/EditorMenuBar.tsx"
import { isAxiosError } from "axios"
import api from "../../../../../../../axios.ts"
import { getDirectorsBoardMemberAdminUrl } from "../../../../../../../shared/backend/adminApiUrls.ts"
import CardPhoto from "./CardPhoto.tsx"
import DetailViewHeader from "./DetailViewHeader.tsx"
import Loading from "./Loading.tsx"
import { useIsMobile } from "../../../../../../../shared/hooks/useIsMobile.ts"

interface IProps {
    open: boolean
    setOpen: (_open: boolean) => void
    member: IDirectorsBoardMember
    onSaved: (_updated: IDirectorsBoardMember) => void
    onDeleted: (_deletedCardId: number) => void
    canManageDirectorMembers: boolean
    mode: "view" | "edit"
}

const DetailView = ({
    open,
    setOpen,
    member,
    onSaved,
    onDeleted,
    canManageDirectorMembers,
    mode,
}: IProps) => {
    const [resetModalOpen, setResetModalOpen] = useState(false)
    const [content, setContent] = useState<Content>()

    const isMobile = useIsMobile()
    const [formData, setFormData] = useState({
        name: member.name,
        role: member.role,
        photo_url: member.photo_url,
    })

    const initialRef = useRef<{
        formData: typeof formData
        content: Content | undefined
    } | null>(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const isEditMode = mode === "edit"
    // Editing allowed only for users with permissions, explicitly opened in edit mode, and not on mobile.
    const editable = canManageDirectorMembers && isEditMode && !isMobile

    const editor = useEditor(
        {
            extensions: detailViewExtensions,
            content: content,
            immediatelyRender: false,
            editable: editable,
        },
        [content, editable],
    )

    const onResetModalCancel = () => {
        setResetModalOpen(true)
    }

    const onReset = () => {
        if (!initialRef.current) return
        setFormData(initialRef.current.formData)
        editor?.commands.setContent(initialRef.current.content ?? {})
        setResetModalOpen(false)
        setOpen(false)
    }

    const onClose = () => {
        if (editable) {
            setResetModalOpen(true)
        } else {
            setOpen(false)
        }
    }

    const updateForm = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }))
    }

    const handleSave = async () => {
        if (!editable) return

        try {
            setIsLoading(true)
            const data = {
                name: formData.name,
                role: formData.role,
                photo_url: formData.photo_url,
                content: editor?.getJSON(),
            }
            const response = await api.patch<IDirectorsBoardMember>(
                getDirectorsBoardMemberAdminUrl(member.id),
                data,
            )
            onSaved(response.data)
            setOpen(false)
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!editable) return

        try {
            setIsLoading(true)
            const response = await api.delete<number>(
                getDirectorsBoardMemberAdminUrl(Number(member.id)),
            )
            const deletedCardId = response.data
            onDeleted(deletedCardId)
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error)
                message.error("Something went wrong. Please try again.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (open) {
            const initialFormData = {
                name: member.name,
                role: member.role,
                photo_url: member.photo_url,
            }

            setFormData(initialFormData)
            setContent(member.content)

            initialRef.current = {
                formData: initialFormData,
                content: member.content,
            }
        }
    }, [open, member])

    useEffect(() => {
        if (open) {
            setContent(member.content)
        }
    }, [member, open])

    if (!editor) {
        return
    }

    return (
        <Modal
            open={open}
            getContainer={!editable ? false : undefined}
            onCancel={onClose}
            footer={null}
            centered={!isMobile}
        >
            <div className={styles.dataContainer}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className={styles.contentContainer}>
                        {editable && (
                            <CardPhoto
                                member={member}
                                editable={editable}
                                onPhotoChange={(url) => updateForm("photo_url", url)}
                            />
                        )}
                        <DetailViewHeader
                            editable={editable}
                            member={member}
                            role={formData.role}
                            name={formData.name}
                            onChangeRole={(value) => updateForm("role", value)}
                            onChangeName={(value) => updateForm("name", value)}
                            onFinish={handleSave}
                            onDelete={handleDelete}
                            onCancel={onResetModalCancel}
                            editor={
                                <>
                                    <EditorMenuBar editor={editor} show={editable} />
                                    <EditorContent
                                        editor={editor}
                                        className={editable ? styles.editableContent : ""}
                                    />
                                </>
                            }
                        ></DetailViewHeader>
                    </div>
                )}

                <ResetModal open={resetModalOpen} setOpen={setResetModalOpen} onReset={onReset} />
            </div>
        </Modal>
    )
}

export default DetailView
