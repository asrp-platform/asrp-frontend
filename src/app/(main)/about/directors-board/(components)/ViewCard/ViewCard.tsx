"use client"

import {type DragEvent, useMemo} from "react";
import {useState} from "react";

import {Button} from "antd";
import {EditorContent, useEditor} from "@tiptap/react";

import CardPhoto from "./ui/CardPhoto.tsx";
import DetailView from "./ui/DetailView.tsx";
import {detailViewExtensions} from "./helpers/editorExtenstions.tsx";
import type {IDirectorsBoardMember} from "../../../../../../entities/DirectorsBoardMember.ts";
import styles from "./styles.module.scss";
import {getPreviewContent} from "./helpers/getPreviewContent.ts";


interface IProps {
    member: IDirectorsBoardMember;
    directorMembers: IDirectorsBoardMember[];
    setDirectorMembers: (memberList: IDirectorsBoardMember[]) => void;
    draggingCard: IDirectorsBoardMember | null;
    setDraggingCard: (newDragging: IDirectorsBoardMember | null) => void;
    draggable?: boolean
}


const ViewCard = ({
                      member,
                      directorMembers,
                      setDirectorMembers,
                      draggingCard,
                      setDraggingCard,
                      draggable = false,
}: IProps) => {

    // Used for updating view card after sending patch request via detail view
    const [currentMember, setCurrentMember] = useState<IDirectorsBoardMember>(member);
    const [detailOpen, setDetailOpen] = useState(false);

    const [isDragOver, setIsDragOver] = useState<boolean>(false);

    const previewContent = useMemo(() => {
        return getPreviewContent(currentMember.content, 4);
    }, [currentMember]);

    const cardClasses = useMemo(() => {
        return `
            ${styles.cardContainer}
            ${draggable ? styles.draggable : ""}
            ${isDragOver ? styles.dragOver : ""}
        `;
    }, [draggable, isDragOver]);


    const editor = useEditor({
        extensions: detailViewExtensions,
        content: previewContent,
        immediatelyRender: false,
        editable: false,
    }, [previewContent]);

    const onSaved = (updatedMemberData: IDirectorsBoardMember) => {
        setCurrentMember(updatedMemberData);
        editor?.commands.setContent(updatedMemberData.content);
    }

    const dragStartHandler = (member: IDirectorsBoardMember) => {
        setDraggingCard(member);
    }

    const dragOverHandler = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const dragEnterHandler = (
        member: IDirectorsBoardMember
    ) => {
        if (draggingCard?.id === member.id) return;
        setIsDragOver(true);
    };

    const dragLeaveHandler = () => {
        setIsDragOver(false);
    }

    const dropHandler = (event: DragEvent<HTMLDivElement>, member: IDirectorsBoardMember) => {
        // На какую карточку сбрасываем текущую (currentMember)
        event.preventDefault();

        setDirectorMembers(directorMembers.map((c => {
            if (c.id === member.id) {
                return {...c, order: draggingCard!.order};
            }
            if (c.id === draggingCard?.id) {
                return {...c, order: member.order};
            }
            return c;
        })));
        setDraggingCard(null)
        setIsDragOver(false);
    }

    return (
        <div className={cardClasses}
             draggable={draggable}
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
            <DetailView open={detailOpen} setOpen={setDetailOpen} member={currentMember} onSaved={onSaved} />
        </div>
    );
};

export default ViewCard;