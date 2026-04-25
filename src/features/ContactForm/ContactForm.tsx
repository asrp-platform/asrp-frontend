"use client"

import styles from "@/features/ContactForm/ContactForm.module.scss"

import { type FormProps, Input, message, Spin } from "antd"
import { Form } from "antd"
import TextArea from "antd/es/input/TextArea"

import { useForm } from "antd/es/form/Form"
import { useState } from "react"
import { isAxiosError } from "axios"

import api from "@/axios.ts"
import { CONTACT_MESSAGE_URL } from "@/shared/backend/rest-api-urls/restApiUrls.ts"
import type { IBackendErrorResponse } from "@/shared/types/interfaces.ts"
import { ContactMessageType } from "@/entities/ContactMessage.ts"

interface ContactFormFields {
    name: string
    email: string
    subject: string
    contact_message: string
}

const ContactForm = () => {
    const [form] = useForm()

    const [messageLoading, setMessageLoading] = useState<boolean>(false)

    const onFinish: FormProps<ContactFormFields>["onFinish"] = (values) => {
        const sendContactMessage = async () => {
            try {
                setMessageLoading(true)
                await api.post(CONTACT_MESSAGE_URL, {
                    name: values.name,
                    email: values.email,
                    type: ContactMessageType.Contact,
                    message_content: {
                        subject: values.subject,
                        contact_message: values.contact_message,
                    },
                })
                message.success("Your message has been sent successfully.")
                form.resetFields()
            } catch (error) {
                if (isAxiosError(error)) {
                    setMessageLoading(false)
                    const errorResponse: IBackendErrorResponse = error.response?.data
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
                setMessageLoading(false)
            }
        }

        sendContactMessage()
    }

    return (
        <div className={styles.contactFormContainer}>
            <h3 className={styles.contactFormTitle}>Send a message</h3>
            <Spin spinning={messageLoading}>
                <Form
                    name="contactForm"
                    onFinish={onFinish}
                    autoComplete="off"
                    className={styles.contactForm}
                    layout="vertical"
                    form={form}
                >
                    <Form.Item<ContactFormFields>
                        name="name"
                        rules={[{ required: true, message: "Please enter your name!" }]}
                    >
                        <Input placeholder="Your name *" />
                    </Form.Item>
                    <Form.Item<ContactFormFields>
                        name="email"
                        rules={[{ required: true, message: "Please enter your email!" }]}
                    >
                        <Input placeholder="Email address *" />
                    </Form.Item>
                    <Form.Item<ContactFormFields>
                        name="subject"
                        rules={[{ required: true, message: "Please enter message subject!" }]}
                    >
                        <Input placeholder="Subject *" />
                    </Form.Item>
                    <Form.Item<ContactFormFields>
                        name="contact_message"
                        rules={[{ required: true, message: "Please enter your message!" }]}
                    >
                        <TextArea placeholder="Message *" rows={6} cols={40} />
                    </Form.Item>

                    <div className={styles.submitButtonContainer}>
                        <button>Submit</button>
                    </div>
                </Form>
            </Spin>
        </div>
    )
}

export default ContactForm
