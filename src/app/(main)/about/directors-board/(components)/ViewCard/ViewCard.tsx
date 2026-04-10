"use client"

import { type DragEvent, useMemo } from "react"
import { useState } from "react"

import { Button } from "antd"
import { EditorContent, useEditor } from "@tiptap/react"

import CardPhoto from "./ui/CardPhoto.tsx"
import DetailView from "./ui/DetailView.tsx"
import { detailViewExtensions } from "./helpers/editorExtenstions.tsx"
import type { IDirectorsBoardMember } from "../../../../../../entities/DirectorsBoardMember.ts"
import styles from "./styles.module.scss"
import { getPreviewContent } from "./helpers/getPreviewContent.ts"
import api from "../../../../../../axios.ts"
import { DIRECTORS_BOARD_MEMBER_REORDER_URL } from "../../../../../../shared/backend/adminApiUrls.ts"

interface IProps {
    member: IDirectorsBoardMember
    directorMembers: IDirectorsBoardMember[]
    setDirectorMembers: (_memberList: IDirectorsBoardMember[]) => void
    draggingCard: IDirectorsBoardMember | null
    setDraggingCard: (_newDragging: IDirectorsBoardMember | null) => void
    canEdit?: boolean
}

const ViewCard = ({
    member,
    directorMembers,
    setDirectorMembers,
    draggingCard,
    setDraggingCard,
    canEdit = false,
}: IProps) => {
    // Used for updating view card after sending patch request via detail view
    const [currentMember, setCurrentMember] = useState<IDirectorsBoardMember>(member)
    const [detailOpen, setDetailOpen] = useState(false)

    const [isDragOver, setIsDragOver] = useState<boolean>(false)

    const previewContent = useMemo(() => {
        return getPreviewContent(currentMember.content, 3)
    }, [currentMember])

    const cardClasses = useMemo(() => {
        return `
            ${styles.cardContainer}
            ${canEdit ? styles.draggable : ""}
            ${isDragOver ? styles.dragOver : ""}
        `
    }, [canEdit, isDragOver])

    const editor = useEditor(
        {
            extensions: detailViewExtensions,
            content: previewContent,
            immediatelyRender: false,
            editable: false,
        },
        [previewContent],
    )

    const onSaved = (updatedMemberData: IDirectorsBoardMember) => {
        setCurrentMember(updatedMemberData)
        editor?.commands.setContent(updatedMemberData.content)
    }

    const onDeleted = (deletedCardId: number) => {
        setDirectorMembers(directorMembers.filter((member) => member.id !== deletedCardId))
        setDetailOpen(false)
    }

    const dragStartHandler = (member: IDirectorsBoardMember) => {
        setDraggingCard(member)
    }

    const dragOverHandler = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const dragEnterHandler = (member: IDirectorsBoardMember) => {
        if (draggingCard?.id === member.id) return
        setIsDragOver(true)
    }

    const dragLeaveHandler = () => {
        setIsDragOver(false)
    }

    const dropHandler = async (event: DragEvent<HTMLDivElement>, member: IDirectorsBoardMember) => {
        event.preventDefault()

        if (!draggingCard) return

        const updatedMembers = directorMembers.map((c) => {
            if (c.id === member.id) {
                return { ...c, order: draggingCard.order }
            }
            if (c.id === draggingCard.id) {
                return { ...c, order: member.order }
            }
            return c
        })

        setDirectorMembers(updatedMembers)
        setDraggingCard(null)
        setIsDragOver(false)

        const payload = updatedMembers
            .map((m) => ({
                id: m.id,
                order: m.order,
            }))
            .sort((a, b) => a.order - b.order)

        try {
            await api.put(DIRECTORS_BOARD_MEMBER_REORDER_URL, payload)
        } catch (error) {
            console.error("Reorder failed", error)
            setDirectorMembers(directorMembers)
        }
    }

    return (
        <div
            className={cardClasses}
            draggable={canEdit}
            onDragStart={() => dragStartHandler(member)}
            onDragOver={(event) => dragOverHandler(event)}
            onDrop={(event) => dropHandler(event, member)}
            onDragEnter={() => dragEnterHandler(member)}
            onDragLeave={dragLeaveHandler}
        >
            <h2 className={styles.cardTitle}>{currentMember.role}</h2>
            <CardPhoto member={currentMember} />
            <h3 className={styles.nameTitle}>{currentMember.name}</h3>
            <EditorContent editor={editor} className={styles.boardEditor} />
            <Button danger htmlType="button" onClick={() => setDetailOpen(true)}>
                Read more
            </Button>
            <DetailView
                open={detailOpen}
                setOpen={setDetailOpen}
                member={currentMember}
                onSaved={onSaved}
                onDeleted={onDeleted}
                canEdit={canEdit}
            />
        </div>
    )
}

export default ViewCard
