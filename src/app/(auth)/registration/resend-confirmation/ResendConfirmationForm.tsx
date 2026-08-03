"use client"

import { Alert, Button, Form, type FormProps, Input, Typography } from "antd"
import { isAxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useReturnToLoginHref } from "@shared/hooks/useReturnToLoginHref.ts"

import api from "@/axios.ts"
import { EMAIL_CONFIRMATION_RESEND_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import styles from "@app/(auth)/registration/resend-confirmation/ResendConfirmationPage.module.scss"

const { Paragraph, Title } = Typography

type FieldType = {
    email: string
}

type ResendResponse = {
    detail?: string
    message?: string
}

const getResponseMessage = (data: ResendResponse | undefined, fallback: string) =>
    data?.detail ?? data?.message ?? fallback

const ResendConfirmationForm = () => {
    const router = useRouter()
    const loginHref = useReturnToLoginHref("/login")
    const [form] = Form.useForm<FieldType>()
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState<"success" | "error" | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            setIsLoading(true)
            setStatus(null)
            setMessage(null)

            const response = await api.post<ResendResponse>(EMAIL_CONFIRMATION_RESEND_URL, values)

            setStatus("success")
            setMessage(
                getResponseMessage(
                    response.data,
                    "If this email is registered and not confirmed, we sent a new confirmation link.",
                ),
            )
        } catch (error) {
            setStatus("error")

            if (isAxiosError<ResendResponse>(error)) {
                setMessage(
                    getResponseMessage(
                        error.response?.data,
                        "We could not resend the confirmation email. Please try again later.",
                    ),
                )
            } else {
                setMessage("We could not resend the confirmation email. Please try again later.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.pageContainer}>
            <section className={styles.formCard}>
                <Title level={2}>Resend confirmation email</Title>
                <Paragraph className={styles.description}>
                    Enter the email address you used to register and we will send a new confirmation
                    link.
                </Paragraph>

                {status && message && (
                    <Alert
                        type={status}
                        message={message}
                        showIcon
                        className={styles.statusMessage}
                    />
                )}

                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email" },
                            { type: "email", message: "Please enter a valid email" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Send confirmation email
                    </Button>
                    <Button onClick={() => router.push(loginHref)}>Back to login</Button>
                </Form>
            </section>
        </div>
    )
}

export default ResendConfirmationForm
