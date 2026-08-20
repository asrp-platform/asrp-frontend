"use client"

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
    Button,
    Col,
    DatePicker,
    Flex,
    Form,
    Input,
    message,
    Modal,
    Popconfirm,
    Row,
    Select,
    Switch,
} from "antd"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { useEffect, useState } from "react"
import { Archive, ArchiveRestore, Trash2 } from "lucide-react"

import api from "@/axios.ts"
import type { IWebinar } from "@entities/News.ts"
import { getWebinarDetailAdminUrl } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"

import styles from "./EditWebinarModal.module.scss"
import { WEBINAR_LANGUAGE_OPTIONS, WEBINAR_TIMEZONE_OPTIONS } from "@shared/options.ts"

dayjs.extend(utc)
dayjs.extend(timezone)

const BUNNY_VIDEO_ID_PATTERN =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

interface IProps {
    open: boolean
    webinar: IWebinar
    onClose: () => void
}

interface IFormValues {
    title: string
    description?: string
    learning_objectives: string[]
    speaker_name: string
    speaker_description?: string
    join_link?: string
    registration_link?: string
    bunny_video_id?: string
    starts_at: Dayjs
    location?: string
    member_only: boolean
    timezone: string
    language?: string
}

const EditWebinarModal = ({ open, webinar, onClose }: IProps) => {
    const [form] = Form.useForm<IFormValues>()
    const [openedAt] = useState(() => Date.now())
    const queryClient = useQueryClient()
    const selectedTimezone = Form.useWatch("timezone", form) as string | undefined
    const memberOnly = Form.useWatch("member_only", form) as boolean | undefined
    const isPast = new Date(webinar.ends_at || webinar.starts_at).getTime() <= openedAt

    const invalidateWebinars = async () => {
        await Promise.all([
            queryClient.invalidateQueries({ queryKey: ["admin-webinars"] }),
            queryClient.invalidateQueries({ queryKey: ["upcomingWebinars"] }),
            queryClient.invalidateQueries({ queryKey: ["pastWebinars"] }),
            queryClient.invalidateQueries({ queryKey: ["webinar", webinar.slug] }),
        ])
    }

    useEffect(() => {
        if (!open) return

        form.setFieldsValue({
            title: webinar.title,
            description: webinar.description,
            learning_objectives: webinar.learning_objectives,
            speaker_name: webinar.speaker_name,
            speaker_description: webinar.speaker_description ?? undefined,
            join_link: webinar.join_link ?? undefined,
            registration_link: webinar.registration_link ?? undefined,
            bunny_video_id: webinar.bunny_video_id ?? undefined,
            starts_at: dayjs.utc(webinar.starts_at).tz(webinar.timezone),
            location: webinar.location ?? undefined,
            member_only: webinar.member_only,
            timezone: webinar.timezone,
            language: webinar.language ?? undefined,
        })
    }, [form, open, webinar])

    const updateMutation = useMutation({
        mutationFn: async (values: IFormValues) => {
            await api.patch(getWebinarDetailAdminUrl(webinar.id), {
                ...values,
                title: values.title.trim(),
                description: values.description?.trim() || null,
                learning_objectives: values.learning_objectives ?? [],
                speaker_name: values.speaker_name.trim(),
                speaker_description: values.speaker_description?.trim() || null,
                join_link: values.join_link?.trim() || null,
                registration_link: values.member_only
                    ? null
                    : values.registration_link?.trim() || null,
                bunny_video_id: values.bunny_video_id?.trim() || null,
                starts_at: values.starts_at.tz(values.timezone, true).toISOString(),
                location: values.location?.trim() || null,
                language: values.language || null,
            })
        },
        onSuccess: async () => {
            await invalidateWebinars()
            message.success("Webinar updated successfully.")
            onClose()
        },
        onError: (error: unknown) => handleApiError({ error, form }),
    })

    const archiveMutation = useMutation({
        mutationFn: async (archived: boolean) => {
            await api.patch(getWebinarDetailAdminUrl(webinar.id), { archived })
        },
        onSuccess: async (_, archived) => {
            await invalidateWebinars()
            message.success(
                archived ? "Webinar archived successfully." : "Webinar restored successfully.",
            )
            onClose()
        },
        onError: (error: unknown) => handleApiError({ error }),
    })

    const deleteMutation = useMutation({
        mutationFn: async () => {
            await api.delete(getWebinarDetailAdminUrl(webinar.id))
        },
        onSuccess: async () => {
            await invalidateWebinars()
            message.success("Webinar deleted successfully.")
            onClose()
        },
        onError: (error: unknown) => handleApiError({ error }),
    })

    const isPending =
        updateMutation.isPending || archiveMutation.isPending || deleteMutation.isPending

    const closeModal = () => {
        if (isPending) return
        form.resetFields()
        onClose()
    }

    return (
        <Modal
            title={`Edit webinar: ${webinar.title}`}
            open={open}
            width={820}
            footer={null}
            closable={!isPending}
            maskClosable={!isPending}
            destroyOnHidden
            onCancel={closeModal}
        >
            <Form<IFormValues>
                form={form}
                layout="vertical"
                disabled={isPending}
                onFinish={(values) => updateMutation.mutate(values)}
            >
                <div className={styles.grid}>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            { required: true, whitespace: true, message: "Please enter a title" },
                            { min: 2, message: "Title must contain at least 2 characters" },
                        ]}
                    >
                        <Input maxLength={255} />
                    </Form.Item>

                    <Form.Item label="Language" name="language">
                        <Select
                            allowClear
                            options={[...WEBINAR_LANGUAGE_OPTIONS]}
                            placeholder="Select a language"
                        />
                    </Form.Item>
                </div>

                <Form.Item label="Description" name="description">
                    <Input.TextArea rows={4} showCount />
                </Form.Item>

                <Form.Item label="Learning objectives">
                    <Form.List name="learning_objectives">
                        {(fields, { add, remove }) => (
                            <div className={styles.objectives}>
                                {fields.map((field, index) => (
                                    <div className={styles.objective} key={field.key}>
                                        <Form.Item
                                            {...field}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Enter a learning objective",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input
                                                placeholder={`Learning objective ${index + 1}`}
                                            />
                                        </Form.Item>
                                        <Button
                                            type="text"
                                            danger
                                            icon={<MinusCircleOutlined />}
                                            aria-label={`Remove learning objective ${index + 1}`}
                                            onClick={() => remove(field.name)}
                                        />
                                    </div>
                                ))}
                                <Button
                                    type="dashed"
                                    icon={<PlusOutlined />}
                                    disabled={fields.length >= 10}
                                    onClick={() => add()}
                                >
                                    Add objective
                                </Button>
                            </div>
                        )}
                    </Form.List>
                </Form.Item>

                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Speaker name"
                            name="speaker_name"
                            rules={[
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Please enter a speaker name",
                                },
                                { min: 2, message: "Name must contain at least 2 characters" },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Speaker description"
                            name="speaker_description"
                            rules={[
                                {
                                    min: 2,
                                    message: "Description must contain at least 2 characters",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Timezone"
                            name="timezone"
                            rules={[{ required: true, message: "Please select a timezone" }]}
                        >
                            <Select
                                showSearch
                                optionFilterProp="label"
                                options={[...WEBINAR_TIMEZONE_OPTIONS]}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Start date and time"
                            name="starts_at"
                            extra="The time is interpreted in the selected timezone."
                            rules={[{ required: true, message: "Please select a start time" }]}
                        >
                            <DatePicker
                                showTime
                                format="MMMM D, YYYY h:mm A"
                                className={styles.fullWidth}
                                disabled={!selectedTimezone}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item label="Location" name="location">
                            <Input maxLength={255} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Join link"
                            name="join_link"
                            rules={[{ type: "url", message: "Please enter a valid URL" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                {memberOnly === false && (
                    <Form.Item
                        label="External registration link"
                        name="registration_link"
                        extra="Public webinars use an external registration form. Joining remains available to everyone."
                        rules={[{ type: "url", message: "Please enter a valid URL" }]}
                    >
                        <Input placeholder="https://forms.google.com/..." />
                    </Form.Item>
                )}

                <Form.Item
                    label="Bunny video ID"
                    name="bunny_video_id"
                    rules={[
                        {
                            pattern: BUNNY_VIDEO_ID_PATTERN,
                            message: "Please enter a valid Bunny Stream video ID",
                        },
                    ]}
                >
                    <Input maxLength={36} />
                </Form.Item>

                <div className={styles.memberOnly}>
                    <div>
                        <strong>Members only</strong>
                        <p>Restrict registration and playback to active ASRP members.</p>
                    </div>
                    <Form.Item name="member_only" valuePropName="checked" noStyle>
                        <Switch />
                    </Form.Item>
                </div>

                <Flex justify="space-between" className={styles.actions}>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button type="primary" htmlType="submit" loading={updateMutation.isPending}>
                        Save changes
                    </Button>
                </Flex>
            </Form>

            {isPast && (
                <section className={styles.dangerZone}>
                    <div>
                        <strong>Webinar management</strong>
                        <p>
                            {webinar.archived
                                ? "Restore this webinar to the public past webinars list."
                                : "Archive this webinar to hide it from the public past webinars list."}
                        </p>
                    </div>
                    <Flex gap={10} wrap="wrap">
                        <Popconfirm
                            title={webinar.archived ? "Restore webinar?" : "Archive webinar?"}
                            description={
                                webinar.archived
                                    ? "The webinar will appear in the public archive again."
                                    : "The webinar will be hidden from the public archive."
                            }
                            okText={webinar.archived ? "Restore" : "Archive"}
                            onConfirm={() => archiveMutation.mutate(!webinar.archived)}
                        >
                            <Button
                                icon={
                                    webinar.archived ? (
                                        <ArchiveRestore size={16} />
                                    ) : (
                                        <Archive size={16} />
                                    )
                                }
                                loading={archiveMutation.isPending}
                                disabled={isPending && !archiveMutation.isPending}
                            >
                                {webinar.archived ? "Unarchive webinar" : "Archive webinar"}
                            </Button>
                        </Popconfirm>

                        <Popconfirm
                            title="Delete webinar permanently?"
                            description="This action cannot be undone."
                            okText="Delete"
                            okButtonProps={{ danger: true }}
                            onConfirm={() => deleteMutation.mutate()}
                        >
                            <Button
                                danger
                                icon={<Trash2 size={16} />}
                                loading={deleteMutation.isPending}
                                disabled={isPending && !deleteMutation.isPending}
                            >
                                Delete webinar
                            </Button>
                        </Popconfirm>
                    </Flex>
                </section>
            )}
        </Modal>
    )
}

export default EditWebinarModal
