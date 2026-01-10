"use client"

import {Modal} from "antd";
import {useEffect, useRef, useState} from "react";

import styles from "./styles.module.scss"
import {useAuth} from "../../../../../../../../context/AuthProvider.tsx";
import type {IDirectorsBoardMember} from "../../../../../../../../entities/DirectorsBoardMember.ts";
import ResetModal from "./ResetModal.tsx";
import {type Content, EditorContent, useEditor} from "@tiptap/react";
import {detailViewExtensions} from "../helpers/editorExtenstions.tsx";
import EditorMenuBar from "../../../../../../../../widgets/TiptapEditor/EditorMenuBar.tsx";
import {isAxiosError} from "axios";
import api from "../../../../../../../../axios.ts";
import {
    getDirectorsBoardMemberAdminUrl
} from "../../../../../../../../shared/backend/adminApiUrls.ts";
import CardPhoto from "./CardPhoto.tsx";
import DetailViewHeader from "./DetailViewHeader.tsx";
import Loading from "./Loading.tsx";


interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    member: IDirectorsBoardMember;
    onSaved: (updated: IDirectorsBoardMember) => void;
}


const DetailView = ({open, setOpen, member, onSaved}: IProps) => {

    const {user} = useAuth();

    const [resetModalOpen, setResetModalOpen] = useState(false);
    const [content, setContent] = useState<Content>();

    const [formData, setFormData] = useState({
        name: member.name,
        role: member.role,
        photo_url: member.photo_url,
    })

    const initialRef = useRef<{
        formData: typeof formData
        content: Content | undefined
    } | null>(null)

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const editable = Boolean(user?.stuff)

    const editor = useEditor({
        extensions: detailViewExtensions,
        content: content,
        immediatelyRender: false,
        editable: editable,
    }, [content, editable]);

    const onResetModalCancel = () => {
        setResetModalOpen(true);
    }

    const onReset = () => {
        if (!initialRef.current) return

        // 1. Откат формы
        setFormData(initialRef.current.formData)

        // 2. Откат editor
        editor?.commands.setContent(initialRef.current.content ?? {})

        // 3. Закрываем модалку
        setResetModalOpen(false)
        setOpen(false)
    }

    const onClose = () => {
        if (editable) {
            setResetModalOpen(true);
        } else {
            setOpen(false)
        }
    }

    const updateForm = (key: string, value: string) => {
        setFormData((prev) => ({...prev, [key]: value}))
    }

    const onSave = async () => {
        try {
            setIsLoading(true);
            const data = {
                name: formData.name,
                role: formData.role,
                photo_url: formData.photo_url,
                content: editor?.getJSON(),
            }
            const response = await api.patch<IDirectorsBoardMember>(getDirectorsBoardMemberAdminUrl(member.id), data)
            onSaved(response.data);
            setOpen(false);
        } catch (e) {
            if (isAxiosError(e)) {

            }
        } finally {
            setIsLoading(false);
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
    }, [open])


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

                {isLoading ? <Loading /> : <div className={styles.contentContainer}>

                    <CardPhoto member={member} editable={editable} onPhotoChange={(url) => updateForm("photo_url", url)}/>
                    <DetailViewHeader
                        editable={editable}
                        member={member}
                        role={formData.role}
                        name={formData.name}
                        onChangeRole={value => updateForm("role", value)}
                        onChangeName={value => updateForm("name", value)}
                        onFinish={onSave}
                        onCancel={onResetModalCancel}
                        editor={
                            <>
                                <EditorMenuBar editor={editor} show={editable}/>
                                <EditorContent editor={editor} className={editable ? styles.editableContent : ""}/></>
                        }
                    >
                    </DetailViewHeader>


                </div>}

                <ResetModal open={resetModalOpen} setOpen={setResetModalOpen} onReset={onReset}/>

            </div>
        </Modal>
    );
};

export default DetailView;