"use client";

import { useState, type ChangeEvent } from "react";
import { CirclePlus, Image } from "lucide-react";
import { Form, Input } from "antd";

import styles from "./styles.module.scss";
import api from "../../../../../../axios.ts";
import type { ImagePathResponse, IValidationError } from "../../../../../../shared/types/interfaces.ts";
import { getDirectorMemberImageUrl } from "../../../../../../shared/backend/restApiUrls.ts";
import {
    DIRECTORS_BOARD_ADMIN_URL,
    DIRECTORS_BOARD_MEMBER_IMAGES_URL,
} from "../../../../../../shared/backend/adminApiUrls.ts";

import ContentEditor from "../Editors/ContentEditor.tsx";
import type { IContent } from "../../../../../../entities/DirectorsBoardMember.ts";
import { isAxiosError } from "axios";

const CreateDirectorMemberCard = () => {
    const [form] = Form.useForm();

    const [createMode, setCreateMode] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [content, setContent] = useState<IContent>({ blocks: [] });

    const handleReset = () => {
        setCreateMode(false);
        setUploadedImageUrl(null);
        setContent({ blocks: [] });
        form.resetFields();
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

                // 🔥 Маппинг backend → antd Form
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
            console.error("Image upload failed:", error);
        } finally {
            e.target.value = "";
        }
    };

    if (!createMode) {
        return (
            <div
                className={styles.createCard}
                onClick={() => setCreateMode(true)}
            >
                <CirclePlus width={32} height={32} className={styles.addMemberIcon} />
            </div>
        );
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
                    <label htmlFor="photo" className={styles.photoLabel}>
                        {uploadedImageUrl ? (
                            <img src={uploadedImageUrl} alt="" />
                        ) : (
                            <Image width={32} height={32} />
                        )}
                    </label>
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

                <ContentEditor value={content} onChange={setContent} />

                <div className={styles.buttonContainer}>
                    <button className={styles.submitButton} type="submit">
                        Submit
                    </button>
                    <button
                        className={styles.resetButton}
                        type="button"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
            </Form>
        </div>
    );
};

export default CreateDirectorMemberCard;
