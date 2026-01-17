"use client";

import { useState } from "react";
import {Button, Form, Input} from "antd";

import type { IValidationError } from "../../../../../../shared/types/interfaces.ts";
import {
    DIRECTORS_BOARD_ADMIN_URL,
} from "../../../../../../shared/backend/adminApiUrls.ts";
import { isAxiosError } from "axios";

import api from "../../../../../../axios.ts";
import styles from "./styles.module.scss";
import ResetModal from "../ViewCard/ui/ResetModal.tsx";
import AddDirectorMember from "./ui/AddDirectorMember.tsx";
import {EditorContent, useEditor} from "@tiptap/react";
import {detailViewExtensions} from "../ViewCard/helpers/editorExtenstions.tsx";
import EditorMenuBar from "../../../../../../widgets/TiptapEditor/EditorMenuBar.tsx";
import PhotoInput from "./ui/PhotoInput.tsx";


const CreateDirectorMemberCard = () => {
    const [form] = Form.useForm();

    const [createMode, setCreateMode] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const editor = useEditor({
        extensions: detailViewExtensions,
        immediatelyRender: false,
        editable: true,
        content: ""
    });


    const showModal = () => {
        setOpen(true);
    }

    const reset = () => {
        setCreateMode(false);
        setUploadedImageUrl(null);
        form.resetFields();
    };


    const handleReset = () => {
        showModal();
    };

    const handleSubmit = async (values: { name: string; role: string }) => {
        const payload = {
            ...values,
            content: editor?.getJSON(),
            photo_url: uploadedImageUrl,
        };

        try {
            await api.post(DIRECTORS_BOARD_ADMIN_URL, payload);
            window.location.reload();
        } catch (error) {
            if (isAxiosError(error) && error.response?.status === 422) {
                const backendErrors: IValidationError[] =
                    error.response.data.detail.errors;

                form.setFields(
                    backendErrors.map((err) => ({
                        name: err.field.split("."), // поддержка вложенных
                        errors: [err.message],
                    }))
                );
            } else {
                console.error(error);
            }
        }
    };

    if (!createMode ) {
        return <AddDirectorMember setCreateMode={setCreateMode} />
    }

    if (!editor) {
        return
    }

    return (
        <div className={styles.createCardActive}>
            <PhotoInput setUploadedImageUrl={setUploadedImageUrl} uploadedImageUrl={uploadedImageUrl} />
            <Form
                form={form}
                layout="vertical"
                className={styles.createCardForm}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="role"
                    rules={[{ required: true, message: "Please enter role" }]}
                >
                    <Input
                        className={styles.roleInput}
                        placeholder="Enter role..."
                    />
                </Form.Item>

                <Form.Item
                    name="name"
                    rules={[{ required: true, message: "Please enter name" }]}
                >
                    <Input
                        className={styles.nameInput}
                        placeholder="Enter name..."
                    />
                </Form.Item>

                <EditorMenuBar editor={editor} />
                <EditorContent editor={editor} className={styles.editorContent}/>

                <div className={styles.buttonContainer}>
                    <Button htmlType="submit" type={"primary"}>Submit</Button>
                    <Button htmlType="button" onClick={handleReset} danger>Reset</Button>
                </div>

                <ResetModal open={open} setOpen={setOpen} onReset={reset} />
            </Form>
        </div>
    );
};

export default CreateDirectorMemberCard;
