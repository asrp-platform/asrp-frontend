"use client"

import styles from "./ContactForm.module.scss"

import { type FormProps, Input, Result, Spin } from "antd"
import { Form } from "antd"
import TextArea from "antd/es/input/TextArea"
import { Button } from "antd"
import { useForm } from "antd/es/form/Form"
import { useState } from "react"
import api from "../../axios.ts"
import { CONTACT_MESSAGE_URL } from "../../shared/backend/restApiUrls.ts"
import { isAxiosError } from "axios"

import useNotification from "antd/es/notification/useNotification"
import type {IBackendErrorResponse} from "../../shared/types/interfaces.ts";

interface ContactFormFields {
    name: string
    email: string
    subject: string
    message: string
}

const ContactForm = () => {
    const [form] = useForm()

    const [messageSent, setMessageSent] = useState<boolean>(false)
    const [messageLoading, setMessageLoading] = useState<boolean>(false)

    const [notification, contextHolder] = useNotification()

    const openNotification = (pauseOnHover: boolean) => {
        notification.error({
            title: "Server Error",
            description: "An unexpected error occurred on the server. Please try again later.",
            showProgress: true,
            pauseOnHover,
        })
    }

    const onFinish: FormProps<ContactFormFields>["onFinish"] = (values) => {
        const sendContactMessage = async () => {
            try {
                setMessageLoading(true)
                await api.post(CONTACT_MESSAGE_URL, values)
                setMessageSent(true)
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
                        openNotification(false)
                    }
                }
            } finally {
                setMessageLoading(false)
            }
        }

        sendContactMessage()
    }

    if (messageSent) {
        return (
            <div className={styles.messageSentContainer}>
                <Result
                    status="success"
                    title="Successfully sent message"
                    subTitle="We will respond as soon as possible"
                />
            </div>
        )
    }

    return (
        <div className={styles.contactFormContainer}>
            <h3 className={styles.contactFormTitle}>Send a message</h3>
            {contextHolder}
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
                        name="message"
                        rules={[{ required: true, message: "Please enter your message!" }]}
                    >
                        <TextArea placeholder="Message *" rows={6} cols={40} />
                    </Form.Item>

                    <div className={styles.submitButtonContainer}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Spin>
        </div>
    )
}

export default ContactForm
