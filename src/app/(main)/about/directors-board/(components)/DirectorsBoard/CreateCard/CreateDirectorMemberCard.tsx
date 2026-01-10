"use client";

import { useState, type ChangeEvent } from "react";
import { Image } from "lucide-react";
import {Button, Form, Input} from "antd";

import type { ImagePathResponse, IValidationError } from "../../../../../../../shared/types/interfaces.ts";
import { getDirectorMemberImageUrl } from "../../../../../../../shared/backend/restApiUrls.ts";
import {
    DIRECTORS_BOARD_ADMIN_URL,
    DIRECTORS_BOARD_MEMBER_IMAGES_URL,
} from "../../../../../../../shared/backend/adminApiUrls.ts";
import type { IContent } from "../../../../../../../entities/DirectorsBoardMember.ts";
import { isAxiosError } from "axios";

import api from "../../../../../../../axios.ts";
import styles from "./styles.module.scss";
import ResetModal from "../ViewCard/ui/ResetModal.tsx";
import AddDirectorMember from "./ui/AddDirectorMember.tsx";


const CreateDirectorMemberCard = () => {
    const [form] = Form.useForm();

    const [createMode, setCreateMode] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [content, setContent] = useState<IContent>({ blocks: [] });

    const [open, setOpen] = useState<boolean>(false);


    const showModal = () => {
        setOpen(true);
    }

    const resetForm = () => {
        setCreateMode(false);
        setUploadedImageUrl(null);
        setContent({ blocks: [] });
        form.resetFields();
    };


    const handleReset = () => {
        showModal();
    };

    const handleSubmit = async (values: { name: string; role: string }) => {
        const payload = {
            ...values,
            content,
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

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await api.post<ImagePathResponse>(
                DIRECTORS_BOARD_MEMBER_IMAGES_URL,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setUploadedImageUrl(getDirectorMemberImageUrl(res.data.path));
        } catch (error) {
            // TODO: Нормальная обработка ошибок
            console.error("Image upload failed:", error);
        } finally {
            e.target.value = "";
        }
    };

    if (!createMode) {
        return <AddDirectorMember setCreateMode={setCreateMode} />
    }

    return (
        <div className={styles.createCardActive}>
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

                <div className={styles.photoInputContainer}>
                    <input
                        type="file"
                        id="photo"
                        className={styles.photoInput}
                        onChange={handleFileChange}
                    />

                    {uploadedImageUrl ?
                        <img className={styles.photo} src={uploadedImageUrl} alt="" /> :
                        <label htmlFor="photo" className={styles.photoLabel}>
                            <Image width={32} height={32} />
                        </label>
                    }
                </div>

                <Form.Item
                    name="name"
                    rules={[{ required: true, message: "Please enter name" }]}
                >
                    <Input
                        className={styles.nameInput}
                        placeholder="Enter name..."
                    />
                </Form.Item>

                <div className={styles.buttonContainer}>
                    <Button htmlType="submit" type={"primary"}>Submit</Button>
                    <Button htmlType="button" onClick={handleReset} danger>Reset</Button>
                </div>

                <ResetModal open={open} setOpen={setOpen} resetForm={resetForm} />
            </Form>
        </div>
    );
};

export default CreateDirectorMemberCard;
