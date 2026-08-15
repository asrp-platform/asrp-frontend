"use client"

import { useState } from "react"
import { Button, Modal, type FormProps, Input, message, Form } from "antd"
import TextArea from "antd/es/input/TextArea"
import api from "../../../../../../axios.ts"
import { getAdminContactMessageAnswerUrl } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"

interface ReplyFormValues {
    subject: string
    answerMessage: string
}

interface IProps {
    messageId: number
    disabled?: boolean
}

const ContactMessageReplyButton = ({ messageId, disabled }: IProps) => {
    const [form] = Form.useForm()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const onFinish: FormProps<ReplyFormValues>["onFinish"] = async (values) => {
        try {
            setIsSubmitting(true)
            await api.post(getAdminContactMessageAnswerUrl(messageId), {
                subject: values.subject,
                answer_message: values.answerMessage,
            })
            message.success("Your reply has been sent successfully.")
            form.resetFields()
            setIsModalOpen(false)
        } catch (error) {
            handleApiError({ error, form })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleOpenModal = () => setIsModalOpen(true)

    const handleCloseModal = () => setIsModalOpen(false)

    return (
        <>
            <Button
                type="primary"
                size="small"
                onClick={handleOpenModal}
                disabled={isSubmitting || disabled}
            >
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

export default ContactMessageReplyButton
