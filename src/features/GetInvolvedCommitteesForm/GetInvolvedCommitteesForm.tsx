"use client"

import { Form, Input, Button, message } from "antd"
import styles from "./styles.module.scss"
import { isAxiosError } from "axios"
import api from "../../axios.ts"
import { CONTACT_MESSAGE_URL } from "../../shared/backend/restApiUrls.ts"
import { ContactMessageType } from "../../shared/types/types.ts"
import { useState } from "react"

type GetInvolvedFormValues = {
    name: string
    email: string
    affiliation?: string
    message: string
}

const GetInvolvedCommitteesForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onSubmit = async (values: GetInvolvedFormValues) => {
        try {
            setIsLoading(true)

            const payload = {
                name: values.name,
                email: values.email,
                type: ContactMessageType.GetInvolvedCommittees,
                message_content: {
                    role_affiliation: values.affiliation,
                    get_involved_message: values.message,
                },
            }

            await api.post(CONTACT_MESSAGE_URL, payload)

            message.success("Your message has been sent successfully.")
            form.resetFields()
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                const status = error.response?.status
                const data = error.response?.data
                if (status === 422 && data?.detail && Array.isArray(data.detail.errors)) {
                    const fieldErrors = data.detail.errors.map(
                        (err: { field: string; message: string }) => ({
                            name: err.field,
                            errors: [err.message],
                        })
                    )

                    form.setFields(fieldErrors)
                    return
                }
                if (typeof data?.detail === "string") {
                    message.error(data.detail)
                    return
                }
            }
            message.error("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const [form] = Form.useForm<GetInvolvedFormValues>()

    return (
        <div className={styles.involvedForm}>
            <h3>Get Involved</h3>
            <Form form={form} layout="vertical" onFinish={onSubmit} requiredMark={false}>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter your name" }]}
                    className={styles.formItem}
                >
                    <Input placeholder="Your full name" className={styles.input} required />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter your email" },
                        { type: "email", message: "Please enter a valid email" },
                    ]}
                    className={styles.formItem}
                >
                    <Input placeholder="you@example.com" className={styles.input} />
                </Form.Item>

                <Form.Item
                    label="Current role / affiliation"
                    name="role_affiliation"
                    className={styles.formItem}
                >
                    <Input placeholder="AP/CP resident, fellow…" className={styles.input} />
                </Form.Item>

                <Form.Item
                    label="How would you like to get involved?"
                    name="get_involved_message"
                    rules={[
                        {
                            required: true,
                            message: "Please tell us how you would like to contribute",
                        },
                    ]}
                    className={styles.formItem}
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="Share your ideas or interests"
                        className={styles.textarea}
                    />
                </Form.Item>

                <Form.Item>
                    <div className={styles.buttonContainer}>
                        <Button
                            htmlType="submit"
                            type="primary"
                            className={styles.submitButton}
                            block
                            loading={isLoading}
                        >
                            Submit your message
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default GetInvolvedCommitteesForm
