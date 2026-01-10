"use client"

import {Button, Input, Modal, Typography} from "antd";
import {useEffect, useMemo, useState} from "react";

import styles from "./styles.module.scss"
import {useAuth} from "../../../../../../../../context/AuthProvider.tsx";
import type {IDirectorsBoardMember} from "../../../../../../../../entities/DirectorsBoardMember.ts";
import ResetModal from "./ResetModal.tsx";
import {type Content, EditorContent, useEditor} from "@tiptap/react";
import {detailViewExtensions} from "../helpers/editorExtenstions.tsx";
import EditorMenuBar from "../../../../../../../../widgets/TiptapEditor/EditorMenuBar.tsx";


const { Title } = Typography;


interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    member: IDirectorsBoardMember;
}


const DetailView = ({open, setOpen, member}: IProps) => {

    const {user} = useAuth();

    const [resetModalOpen, setResetModalOpen] = useState(false);
    const [content, setContent] = useState<Content>();

    const [role, setRole] = useState<string>(member.role);
    const [name, setName] = useState<string>(member.name);

    const editable = useMemo(() => {
        if (!user) {
            return false;
        }
        return user?.stuff
    }, [user])

    const editor = useEditor({
        extensions: detailViewExtensions,
        content: content,
        immediatelyRender: false,
        editable: editable,
    }, [content, editable]);

    const onCancel = () => {
        setResetModalOpen(true);
    }

    const onReset = () => {
        setResetModalOpen(false);
        setOpen(false);
    }

    const onClose = () => {
        if (editable) {
            setResetModalOpen(true);
        } else {
            setOpen(false)
        }
    }

    const onSave = () => {
        console.log(editor?.getJSON())
    }


    useEffect(() => {
        if (open) {
            setContent(member.content);
        }
    }, [member, open]);


    if (!editor) {
        return;
    }

    return (
        <Modal
            open={open}
            getContainer={false}
            onCancel={onClose}
            footer={null}
            centered
        >
            <div className={styles.dataContainer}>


                <div className={styles.contentContainer}>



                    { editable ?
                        <div>
                            <Title level={2}>Role</Title>
                            <Input value={member.role} onChange={(e) => setRole(e.target.value)} />
                            <Title className={styles.inputTitle} level={3}>Name</Title>
                            <Input value={member.name} onChange={(e) => setName(e.target.value)} />
                        </div>:
                        <div>
                            <h2 className={styles.cardTitle}>{member.role}</h2>
                            <h3 className={styles.nameTitle}>{member.name}</h3>
                        </div>
                    }

                    { editable && <div className={styles.menuBarContainer}>
                        <EditorMenuBar editor={editor} />
                    </div> }
                    <EditorContent editor={editor} className={editable ? styles.editableContent : ""} />

                    { editable && <div className={styles.buttonContainer}>
                        <Button htmlType={"button"} onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType={"button"} onClick={onSave}>
                            Save
                        </Button>
                    </div> }
                </div>
                <ResetModal open={resetModalOpen} setOpen={setResetModalOpen} onReset={onReset}/>

            </div>
        </Modal>
    );
};

export default DetailView;