"use client"

import styles from "./styles.module.scss";
import {Button} from "antd";
import DetailView from "./ui/DetailView.tsx";
import {useState} from "react";
import type {IDirectorsBoardMember} from "../../../../../../../entities/DirectorsBoardMember.ts";
import CardPhoto from "./ui/CardPhoto.tsx";
import {EditorContent, useEditor} from "@tiptap/react";
import {detailViewExtensions} from "./helpers/editorExtenstions.tsx";



interface IProps {
    member: IDirectorsBoardMember;
}


const ViewCard = ({member}: IProps) => {

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

    return (
        <div className={styles.cardContainer}>
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