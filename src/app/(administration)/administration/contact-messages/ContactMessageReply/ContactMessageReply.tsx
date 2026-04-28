"use client"

import { useState } from "react"
import { Button, Modal, type FormProps, Input, message, Form } from "antd"
import TextArea from "antd/es/input/TextArea"
import api from "../../../../../axios"
import { getReplyUrl } from "../../../../../shared/backend/rest-api-urls/admin/adminApiUrls"
import { isAxiosError } from "axios"
import type { IBackendErrorResponse } from "../../../../../shared/types/interfaces"

interface ReplyFormValues {
    subject: string
    answerMessage: string
}

const ContactMessageReplyModal = ({ messageId }: { messageId: number }) => {
    const [form] = Form.useForm()

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const onFinish: FormProps<ReplyFormValues>["onFinish"] = async (values) => {
        try {
            setIsSubmitting(true)
            await api.post(getReplyUrl(messageId), {
                subject: values.subject,
                answer_message: values.answerMessage,
            })
            message.success("Your reply has been sent successfully.")
            form.resetFields()
            setIsModalOpen(false)
        } catch (error) {
            if (isAxiosError(error)) {
                const errorResponse = error.response?.data as IBackendErrorResponse | undefined

                if (!errorResponse) {
                    message.error("An unknown error occurred. Please try again.")
                    return
                }

                const errorResponseDetail = errorResponse.detail

                if (error.response?.status === 422) {
                    if (typeof errorResponseDetail !== "string") {
                        const fieldErrors = errorResponseDetail.errors.map((error) => ({
                            name: error.field,
                            errors: [error.message],
                        }))
                        form.setFields(fieldErrors)
                    }
                } else if (error.response?.status === 500) {
                    message.error("Something went wrong. Please try again.")
                }
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleOpenModal = () => setIsModalOpen(true)

    const handleCloseModal = () => setIsModalOpen(false)

    return (
        <>
            <Button type="primary" size="small" onClick={handleOpenModal}>
                Reply
            </Button>
            <Modal title="Reply text" open={isModalOpen} onCancel={handleCloseModal} footer={null}>
                <div>
                    <Form
                        name="replyForm"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                        form={form}
                    >
                        <Form.Item<ReplyFormValues>
                            name="subject"
                            rules={[{ required: true, message: "Please enter message subject!" }]}
                        >
                            <Input placeholder="Subject *" />
                        </Form.Item>
                        <Form.Item<ReplyFormValues>
                            name="answerMessage"
                            rules={[{ required: true, message: "Please enter your reply!" }]}
                        >
                            <TextArea placeholder="Message *" rows={6} cols={40} />
                        </Form.Item>

                        <div>
                            <Button type="primary" htmlType="submit" loading={isSubmitting} block>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    )
}

export default ContactMessageReplyModal
