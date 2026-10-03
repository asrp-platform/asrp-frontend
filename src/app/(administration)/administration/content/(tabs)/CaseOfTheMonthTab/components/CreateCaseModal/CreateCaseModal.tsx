"use client"

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, DatePicker, Flex, Form, Input, Modal, Select } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

import type { CaseOfTheMonth } from "@entities/CaseOfTheMonth.ts"
import type { CaseTag } from "@entities/CaseOfTheMonth.ts"

import CaseContentEditor from "../CaseContentEditor/CaseContentEditor.tsx"
import CaseCoverUpload from "../CaseCoverUpload/CaseCoverUpload.tsx"
import VirtualSlidesList from "../VirtualSlidesList/VirtualSlidesList.tsx"
import type { CaseOfTheMonthForm, CaseOfTheMonthFormValues } from "../../types.ts"

import styles from "./CreateCaseModal.module.scss"

interface IProps {
    open: boolean
    tags: CaseTag[]
    caseItem?: CaseOfTheMonth | null
    submitting: boolean
    onCancel: () => void
    onSubmit: (values: CaseOfTheMonthFormValues, form: CaseOfTheMonthForm) => void
    canCreate: boolean
    canUpdate: boolean
}

const hasEditorText = (value?: CaseOfTheMonthFormValues["history"]) =>
    Boolean(
        value?.content?.some((node) =>
            node.content?.some((contentNode) => contentNode.text?.trim()),
        ),
    )

const emptyDocument = { type: "doc" as const, content: [{ type: "paragraph" as const }] }

const CreateCaseModal = ({
    open,
    tags,
    caseItem,
    submitting,
    onCancel,
    onSubmit,
    canCreate,
    canUpdate,
}: IProps) => {
    const [form] = Form.useForm<CaseOfTheMonthFormValues>()
    const [coverUploading, setCoverUploading] = useState(false)
    const isEditing = Boolean(caseItem)
    const isBusy = submitting || coverUploading

    useEffect(() => {
        if (!open) {
            form.resetFields()
            return
        }

        form.setFieldsValue({
            title: caseItem?.title ?? "",
            cover_key: caseItem?.cover_key ?? null,
            history: caseItem?.history ?? emptyDocument,
            case_findings: caseItem?.case_findings ?? emptyDocument,
            publication_month: caseItem ? dayjs(caseItem.publication_month) : undefined,
            virtual_slides: caseItem?.virtual_slides ?? [],
            questions: caseItem?.questions.length ? caseItem.questions : [""],
            answer: caseItem?.answer ?? emptyDocument,
            tag_ids: caseItem?.tags.map((tag) => tag.id) ?? [],
        })
    }, [caseItem, form, open])

    return (
        <Modal
            title={isEditing ? `Edit case: ${caseItem?.title}` : "Create case of the month"}
            open={open}
            width="60vw"
            footer={null}
            onCancel={onCancel}
            closable={!isBusy}
            mask={{ closable: !isBusy }}
            destroyOnHidden
        >
            <Form<CaseOfTheMonthFormValues>
                form={form}
                layout="vertical"
                disabled={isBusy}
                onFinish={(values) => onSubmit(values, form)}
            >
                <Form.Item name="cover_key" hidden>
                    <Input />
                </Form.Item>

                <div className={styles.mainFields}>
                    <Form.Item
                        className={styles.titleField}
                        label="Title"
                        name="title"
                        rules={[{ required: true, whitespace: true, message: "Enter a title" }]}
                    >
                        <Input maxLength={255} placeholder="Case title" />
                    </Form.Item>

                    <Form.Item
                        className={styles.publicationMonthField}
                        label="Publication month"
                        name="publication_month"
                        rules={[{ required: true, message: "Select a publication month" }]}
                    >
                        <DatePicker
                            picker="month"
                            format="MMMM YYYY"
                            className={styles.fullWidth}
                        />
                    </Form.Item>

                    <Form.Item className={styles.tagsField} label="Tags" name="tag_ids">
                        <Select
                            mode="multiple"
                            allowClear
                            options={tags.map((tag) => ({ value: tag.id, label: tag.name }))}
                            placeholder="Select case tags"
                            maxTagCount="responsive"
                        />
                    </Form.Item>
                </div>

                <CaseCoverUpload
                    open={open}
                    coverKey={caseItem?.cover_key}
                    coverUrl={caseItem?.cover_url}
                    disabled={isBusy}
                    onUploadingChange={setCoverUploading}
                />

                <Form.Item
                    label="Clinical presentation and history"
                    name="history"
                    rules={[
                        {
                            validator: (_, value) =>
                                hasEditorText(value)
                                    ? Promise.resolve()
                                    : Promise.reject(
                                          new Error("Add clinical presentation and history"),
                                      ),
                        },
                    ]}
                >
                    <CaseContentEditor
                        disabled={isBusy}
                        placeholder="Describe the clinical presentation and history"
                    />
                </Form.Item>

                <Form.Item
                    label="Case findings"
                    name="case_findings"
                    rules={[
                        {
                            validator: (_, value) =>
                                hasEditorText(value)
                                    ? Promise.resolve()
                                    : Promise.reject(new Error("Add case findings")),
                        },
                    ]}
                >
                    <CaseContentEditor disabled={isBusy} placeholder="Describe the case findings" />
                </Form.Item>

                <VirtualSlidesList />

                <Form.Item label="Questions" required>
                    <Form.List name="questions">
                        {(fields, { add, remove }) => (
                            <div className={styles.questions}>
                                {fields.map((field, index) => (
                                    <Flex key={field.key} gap={8} align="start">
                                        <Form.Item
                                            {...field}
                                            className={styles.question}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Enter a question",
                                                },
                                            ]}
                                        >
                                            <Input placeholder={`Question ${index + 1}`} />
                                        </Form.Item>
                                        <Button
                                            type="text"
                                            danger
                                            icon={<MinusCircleOutlined />}
                                            aria-label={`Remove question ${index + 1}`}
                                            disabled={fields.length === 1}
                                            onClick={() => remove(field.name)}
                                        />
                                    </Flex>
                                ))}
                                <Button type="dashed" icon={<PlusOutlined />} onClick={() => add()}>
                                    Add question
                                </Button>
                            </div>
                        )}
                    </Form.List>
                </Form.Item>

                <Form.Item
                    label="Answer"
                    name="answer"
                    rules={[
                        {
                            validator: (_, value) =>
                                hasEditorText(value)
                                    ? Promise.resolve()
                                    : Promise.reject(new Error("Add an answer")),
                        },
                    ]}
                >
                    <CaseContentEditor
                        disabled={isBusy}
                        placeholder="Write the answer to the case"
                    />
                </Form.Item>

                <Flex justify="flex-end" gap={8}>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={submitting}
                        disabled={isEditing ? !canUpdate : !canCreate}
                    >
                        {isEditing ? "Save changes" : "Create case"}
                    </Button>
                </Flex>
            </Form>
        </Modal>
    )
}

export default CreateCaseModal
