"use client"

import { PlusOutlined } from "@ant-design/icons"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button, Card, Empty, Flex, Form, Input, message, Modal, Popconfirm, Spin, Tag } from "antd"
import { useEffect, useState } from "react"

import api from "@/axios.ts"
import type { CaseTag } from "@entities/CaseOfTheMonth.ts"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"
import {
    CASE_OF_THE_MONTH_TAGS_URL,
    getCaseTagByIdUrl,
} from "@shared/backend/restApiUrls/adminApiUrls.ts"
import type { IPaginatedBackendResponse } from "@shared/interfaces.ts"

import styles from "./CaseOfTheMonth.module.scss"

type CaseTagsResponse = CaseTag[] | IPaginatedBackendResponse<CaseTag>

interface CreateCaseTagFormValues {
    name: string
}

const CASE_TAGS_QUERY_KEY = ["admin-case-of-the-month-tags"]

const CaseOfTheMonthTab = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [editingTag, setEditingTag] = useState<CaseTag | null>(null)
    const [form] = Form.useForm<CreateCaseTagFormValues>()
    const [editForm] = Form.useForm<CreateCaseTagFormValues>()
    const queryClient = useQueryClient()

    const tagsQuery = useQuery({
        queryKey: CASE_TAGS_QUERY_KEY,
        queryFn: async () => {
            const response = await api.get<CaseTagsResponse>(CASE_OF_THE_MONTH_TAGS_URL)
            return Array.isArray(response.data) ? response.data : response.data.data
        },
    })

    const createTagMutation = useMutation({
        mutationFn: async ({ name }: CreateCaseTagFormValues) => {
            const response = await api.post<CaseTag>(CASE_OF_THE_MONTH_TAGS_URL, {
                name: name.trim(),
            })
            return response.data
        },
        onSuccess: () => {
            message.success("Case tag created")
            form.resetFields()
            setIsCreateModalOpen(false)
            queryClient.invalidateQueries({ queryKey: CASE_TAGS_QUERY_KEY })
        },
        onError: (error) => handleApiError({ error, form }),
    })

    const updateTagMutation = useMutation({
        mutationFn: async ({ id, name }: CreateCaseTagFormValues & { id: number }) => {
            const response = await api.patch<CaseTag>(getCaseTagByIdUrl(id), {
                name: name.trim(),
            })
            return response.data
        },
        onSuccess: () => {
            message.success("Case tag updated")
            editForm.resetFields()
            setEditingTag(null)
            queryClient.invalidateQueries({ queryKey: CASE_TAGS_QUERY_KEY })
        },
        onError: (error) => handleApiError({ error, form: editForm }),
    })

    const deleteTagMutation = useMutation({
        mutationFn: async (tagId: number) => {
            await api.delete(getCaseTagByIdUrl(tagId))
        },
        onSuccess: () => {
            message.success("Case tag deleted")
            editForm.resetFields()
            setEditingTag(null)
            queryClient.invalidateQueries({ queryKey: CASE_TAGS_QUERY_KEY })
        },
        onError: (error) => handleApiError({ error }),
    })

    useEffect(() => {
        if (editingTag) {
            editForm.setFieldsValue({ name: editingTag.name })
        } else {
            editForm.resetFields()
        }
    }, [editForm, editingTag])

    const handleModalClose = () => {
        if (createTagMutation.isPending) return

        form.resetFields()
        setIsCreateModalOpen(false)
    }

    const handleEditModalClose = () => {
        if (updateTagMutation.isPending || deleteTagMutation.isPending) return

        editForm.resetFields()
        setEditingTag(null)
    }

    return (
        <div className={styles.caseOfMonthTab}>
            <Card className={styles.casesCard} title="Cases">
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="The cases table will be added here."
                />
            </Card>

            <Card
                className={styles.tagsCard}
                title="Case tags"
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        Add tag
                    </Button>
                }
            >
                <Spin spinning={tagsQuery.isLoading}>
                    {tagsQuery.data?.length ? (
                        <Flex gap={8} wrap="wrap">
                            {tagsQuery.data.map((tag) => (
                                <Tag
                                    key={tag.id}
                                    role="button"
                                    tabIndex={0}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setEditingTag(tag)}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter" || event.key === " ") {
                                            event.preventDefault()
                                            setEditingTag(tag)
                                        }
                                    }}
                                >
                                    {tag.name}
                                </Tag>
                            ))}
                        </Flex>
                    ) : (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="No case tags yet"
                        />
                    )}
                </Spin>
            </Card>

            <Modal
                title="Create case tag"
                open={isCreateModalOpen}
                footer={null}
                onCancel={handleModalClose}
                closable={!createTagMutation.isPending}
                destroyOnHidden
            >
                <Form
                    form={form}
                    layout="vertical"
                    disabled={createTagMutation.isPending}
                    onFinish={(values) => createTagMutation.mutate(values)}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            { required: true, whitespace: true, message: "Enter a tag name" },
                            { max: 255, message: "Tag name must be 255 characters or fewer" },
                        ]}
                    >
                        <Input placeholder="For example, Breast pathology" maxLength={255} />
                    </Form.Item>

                    <Flex justify="flex-end" gap={8}>
                        <Button onClick={handleModalClose}>Cancel</Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={createTagMutation.isPending}
                        >
                            Create tag
                        </Button>
                    </Flex>
                </Form>
            </Modal>

            <Modal
                title="Edit case tag"
                open={Boolean(editingTag)}
                footer={null}
                onCancel={handleEditModalClose}
                closable={!updateTagMutation.isPending && !deleteTagMutation.isPending}
                destroyOnHidden
            >
                <Form
                    form={editForm}
                    layout="vertical"
                    disabled={updateTagMutation.isPending || deleteTagMutation.isPending}
                    onFinish={(values) => {
                        if (!editingTag) return

                        updateTagMutation.mutate({ ...values, id: editingTag.id })
                    }}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            { required: true, whitespace: true, message: "Enter a tag name" },
                            { max: 255, message: "Tag name must be 255 characters or fewer" },
                        ]}
                    >
                        <Input maxLength={255} />
                    </Form.Item>

                    <Flex justify="space-between" align="center" gap={8}>
                        <Popconfirm
                            title="Delete this case tag?"
                            description="This action cannot be undone."
                            okText="Delete"
                            okButtonProps={{ danger: true }}
                            cancelText="Cancel"
                            onConfirm={() => {
                                if (editingTag) deleteTagMutation.mutate(editingTag.id)
                            }}
                        >
                            <Button danger loading={deleteTagMutation.isPending}>
                                Delete
                            </Button>
                        </Popconfirm>

                        <Flex gap={8}>
                            <Button onClick={handleEditModalClose}>Cancel</Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={updateTagMutation.isPending}
                            >
                                Save
                            </Button>
                        </Flex>
                    </Flex>
                </Form>
            </Modal>
        </div>
    )
}

export default CaseOfTheMonthTab
