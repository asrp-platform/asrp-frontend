"use client"

import { useEffect, useState, type ChangeEvent, type ReactNode } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { Button, Col, ConfigProvider, Flex, Form, Input, message, Modal, Row, Switch } from "antd"
import { EditorContent, useEditor, type JSONContent } from "@tiptap/react"
import { Heading2, ImagePlus, LoaderCircle, MapPin, X } from "lucide-react"

import { createEditorExtensions } from "@app/(main)/about/directors-board/(components)/ViewCard/helpers/editorExtenstions.tsx"
import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"
import EditorMenuBar from "@widgets/TiptapEditor/EditorMenuBar.tsx"
import type { News } from "@entities/News.ts"
import {
    getNewsDetailAdminUrl,
    NEWS_ADMIN_URL,
    NEWS_IMAGES_ADMIN_URL,
} from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { clearFormErrors, handleApiError } from "@shared/helpers/formsHelpers.ts"
import { useQueryClient } from "@tanstack/react-query"

import styles from "./styles.module.scss"
import api from "@/axios"
import type { ImagePathResponse } from "@shared/interfaces.ts"

const newsEditorExtensions = createEditorExtensions([1, 2, 3, 4, 5])
const MAX_COVER_SIZE = 5 * 1024 * 1024

interface CreateNewsFormValues {
    title: string
    cover_key: string | null
    body: JSONContent
    when: string | null
    where: string | null
    is_published: boolean
}

interface IProps {
    news?: News
    renderTrigger?: (openModal: () => void) => ReactNode
}

const CreateNews = ({ news, renderTrigger }: IProps) => {
    const [form] = Form.useForm<CreateNewsFormValues>()
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null)
    const [coverName, setCoverName] = useState<string | null>(null)
    const [isCoverUploading, setIsCoverUploading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const isEditing = Boolean(news)

    const editor = useEditor({
        extensions: newsEditorExtensions,
        immediatelyRender: false,
        editable: true,
        content: "",
        onUpdate: ({ editor: currentEditor }) => {
            form.setFieldValue("body", currentEditor.getJSON())
        },
    })

    useEffect(() => {
        return () => {
            if (coverPreviewUrl?.startsWith("blob:")) URL.revokeObjectURL(coverPreviewUrl)
        }
    }, [coverPreviewUrl])

    useEffect(() => {
        if (!news || !editor) return

        form.setFieldsValue({
            title: news.title,
            cover_key: news.cover_key,
            body: news.body,
            when: news.when,
            where: news.where,
            is_published: news.is_published,
        })
        editor.commands.setContent(news.body)
        setCoverPreviewUrl(news.cover_url)
    }, [editor, form, news])

    if (!editor) return null

    const removeCover = () => {
        setCoverPreviewUrl(null)
        setCoverName(null)
        form.setFieldValue("cover_key", null)
    }

    const handleCoverChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        event.target.value = ""

        if (!file) return
        if (!file.type.startsWith("image/")) {
            message.error("Please choose an image file")
            return
        }
        if (file.size > MAX_COVER_SIZE) {
            message.error("Cover image must be smaller than 5 MB")
            return
        }

        const formData = new FormData()
        formData.append("file", file)

        const localPreviewUrl = URL.createObjectURL(file)
        setCoverPreviewUrl(localPreviewUrl)
        setCoverName(file.name)
        setIsCoverUploading(true)

        try {
            const response = await api.post<ImagePathResponse>(NEWS_IMAGES_ADMIN_URL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            form.setFieldValue("cover_key", response.data.object_key)
        } catch (error) {
            form.setFieldValue("cover_key", news?.cover_key ?? null)
            setCoverPreviewUrl(news?.cover_url ?? null)
            setCoverName(null)
            handleApiError({
                error,
                statusMessages: { 415: "This image format is not supported." },
            })
        } finally {
            setIsCoverUploading(false)
        }
    }

    const closeModal = () => {
        setOpen(false)
    }

    const handleFinish = async (values: CreateNewsFormValues) => {
        const payload: CreateNewsFormValues = {
            ...values,
            cover_key: values.cover_key || null,
            body: editor.getJSON(),
            when: values.when || null,
            where: values.where || null,
        }

        clearFormErrors(form)
        setIsSubmitting(true)

        try {
            if (news) {
                await api.patch(getNewsDetailAdminUrl(news.id), payload)
            } else {
                await api.post(NEWS_ADMIN_URL, payload)
            }

            await queryClient.invalidateQueries({ queryKey: ["news"] })
            setOpen(false)
            message.success(isEditing ? "News updated successfully." : "News created successfully.")

            if (!news) {
                form.resetFields()
                editor.commands.clearContent()
                removeCover()
            }
        } catch (error) {
            handleApiError({ error, form })
        } finally {
            setIsSubmitting(false)
        }
    }

    const defaultTrigger = (
        <CustomButton
            onClick={() => setOpen(true)}
            variant="primary-filled"
            className={styles.triggerButton}
        >
            <Flex gap={5} align="center">
                <PlusOutlined />
                <span className={styles.createNewsButtonText}>Create Post</span>
            </Flex>
        </CustomButton>
    )

    return (
        <>
            {renderTrigger ? renderTrigger(() => setOpen(true)) : defaultTrigger}

            <Modal
                title={
                    <h2 className={styles.formTitle}>
                        {isEditing ? "Edit news post" : "Create new post"}
                    </h2>
                }
                open={open}
                onCancel={closeModal}
                closable={!isSubmitting}
                mask={!isSubmitting}
                footer={null}
                width={760}
                className={styles.modal}
            >
                <p className={styles.formSubtitle}>
                    Add the details readers need, then publish immediately or save as a draft.
                </p>

                <Form<CreateNewsFormValues>
                    form={form}
                    layout="vertical"
                    initialValues={{
                        cover_key: null,
                        body: editor.getJSON(),
                        when: null,
                        where: null,
                        is_published: false,
                    }}
                    onFinish={handleFinish}
                    className={styles.form}
                >
                    <Form.Item name="cover_key" hidden>
                        <Input />
                    </Form.Item>

                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>Main information</h3>
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: "Title is required" }]}
                        >
                            <Input size="large" placeholder="Enter a clear, descriptive title" />
                        </Form.Item>

                        <div className={styles.coverField}>
                            <div className={styles.fieldHeader}>
                                <span className={styles.fieldLabel}>Cover image</span>
                                <span className={styles.fieldHint}>Recommended ratio: 16:9</span>
                            </div>

                            <div className={styles.coverPreview}>
                                {coverPreviewUrl ? (
                                    <img src={coverPreviewUrl} alt="News cover preview" />
                                ) : (
                                    <div className={styles.coverPlaceholder}>
                                        <ImagePlus size={34} strokeWidth={1.6} />
                                        <strong>Add a cover image</strong>
                                        <span>PNG, JPG or WebP · up to 5 MB</span>
                                    </div>
                                )}

                                <label
                                    className={styles.coverUploadButton}
                                    htmlFor="news-cover-input"
                                >
                                    <ImagePlus size={17} />
                                    {coverPreviewUrl ? "Replace cover" : "Choose image"}
                                </label>
                                <input
                                    id="news-cover-input"
                                    className={styles.coverInput}
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={handleCoverChange}
                                    disabled={isCoverUploading || isSubmitting}
                                />

                                {coverPreviewUrl && (
                                    <Button
                                        className={styles.removeCoverButton}
                                        type="text"
                                        shape="circle"
                                        icon={<X size={18} />}
                                        aria-label="Remove cover"
                                        onClick={removeCover}
                                        disabled={isCoverUploading}
                                    />
                                )}
                                {isCoverUploading && (
                                    <div className={styles.coverLoader}>
                                        <LoaderCircle size={30} />
                                        <span>Uploading cover…</span>
                                    </div>
                                )}
                            </div>
                            {coverName && <span className={styles.coverName}>{coverName}</span>}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>Event details</h3>
                        <Row gutter={16}>
                            <Col xs={24} sm={12}>
                                <Form.Item name="when" label="When">
                                    <Input size="large" placeholder="e.g. September 18, 6:00 PM" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item name="where" label="Where">
                                    <Input
                                        size="large"
                                        prefix={<MapPin size={16} />}
                                        placeholder="Venue or online"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </section>

                    <section className={styles.section}>
                        <h3 className={styles.sectionTitle}>Article</h3>
                        <Form.Item
                            name="body"
                            label="Content"
                            getValueProps={() => ({})}
                            rules={[
                                {
                                    validator: () =>
                                        editor.isEmpty
                                            ? Promise.reject(new Error("Content is required"))
                                            : Promise.resolve(),
                                },
                            ]}
                        >
                            <div className={styles.editorShell}>
                                <EditorMenuBar
                                    editor={editor}
                                    extendOptions={(currentEditor) => [
                                        {
                                            icon: <Heading2 width={18} />,
                                            title: "Heading 2",
                                            onClick: () =>
                                                currentEditor
                                                    .chain()
                                                    .focus()
                                                    .toggleHeading({ level: 2 })
                                                    .run(),
                                            pressed: currentEditor.isActive("heading", {
                                                level: 2,
                                            }),
                                        },
                                    ]}
                                />
                                <EditorContent editor={editor} className={styles.editorContent} />
                            </div>
                        </Form.Item>
                    </section>

                    <div className={styles.publishRow}>
                        <div>
                            <span className={styles.publishTitle}>Publish news</span>
                            <p className={styles.publishDescription}>
                                Make this post visible to readers immediately.
                            </p>
                        </div>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Switch: {
                                        colorPrimary: "#ff4d4f",
                                        colorPrimaryHover: "#ff7875",
                                    },
                                },
                            }}
                        >
                            <Form.Item name="is_published" valuePropName="checked" noStyle>
                                <Switch />
                            </Form.Item>
                        </ConfigProvider>
                    </div>

                    <div className={styles.actions}>
                        <CustomButton
                            onClick={closeModal}
                            variant="secondary"
                            className={styles.actionButton}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </CustomButton>
                        <CustomButton
                            htmlType="submit"
                            variant="primary-filled"
                            className={styles.actionButton}
                            loading={isSubmitting}
                            disabled={isCoverUploading}
                        >
                            {!isSubmitting && <PlusOutlined />}
                            {isEditing ? "Save changes" : "Create news"}
                        </CustomButton>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default CreateNews
