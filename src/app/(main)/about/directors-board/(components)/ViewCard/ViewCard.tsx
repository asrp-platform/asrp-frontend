"use client"

import type {DragEvent} from "react";
import {useState} from "react";

import {Button} from "antd";
import {EditorContent, useEditor} from "@tiptap/react";

import CardPhoto from "./ui/CardPhoto.tsx";
import DetailView from "./ui/DetailView.tsx";
import {detailViewExtensions} from "./helpers/editorExtenstions.tsx";
import type {IDirectorsBoardMember} from "../../../../../../entities/DirectorsBoardMember.ts";
import styles from "./styles.module.scss";


interface IProps {
    member: IDirectorsBoardMember;
    directorMembers: IDirectorsBoardMember[];
    setDirectorMembers: (memberList: IDirectorsBoardMember[]) => void;
    draggingCard: IDirectorsBoardMember | null;
    setDraggingCard: (newDragging: IDirectorsBoardMember | null) => void;
}


const ViewCard = ({
                      member,
                      directorMembers,
                      setDirectorMembers,
                      draggingCard,
                      setDraggingCard,
}: IProps) => {

    // Used for updating view card after sending patach request via detail view
    const [currentMember, setCurrentMember] = useState<IDirectorsBoardMember>(member);
    const [detailOpen, setDetailOpen] = useState(false);


    const editor = useEditor({
        extensions: detailViewExtensions,
        content: member.content,
        immediatelyRender: false,
        editable: false,
    }, [member.content]);

    const onSaved = (updatedMemberData: IDirectorsBoardMember) => {
        setCurrentMember(updatedMemberData);
        editor?.commands.setContent(updatedMemberData.content);
    }

    const dragStartHandler = (member: IDirectorsBoardMember) => {
        setDraggingCard(member);
    }


    const dragEndHandler = (event: DragEvent<HTMLDivElement>) => {
        event.currentTarget.style.background = "white";
    }

    const dragOverHandler = (event: DragEvent<HTMLDivElement>, member: IDirectorsBoardMember) => {
        if (draggingCard?.id === member.id) return;

        event.preventDefault();
        event.currentTarget.style.background = "lightgray";
    }


    const dropHandler = (event: DragEvent<HTMLDivElement>, member: IDirectorsBoardMember) => {
        // На какую карточку сбрасываем текущую (currentMember)
        event.preventDefault();


        console.log(draggingCard);


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
    }

    return (
        <div className={styles.cardContainer}
             draggable={true}
             onDragStart={() => dragStartHandler(member)}
             onDragOver={(event) => dragOverHandler(event, member)}
             onDrop={(event) => dropHandler(event, member)}
             onDragEnd={(event) => dragEndHandler(event)}
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