"use client"

import { Form, type FormProps, Input, Result } from "antd"
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import api from "@/axios.ts"
import styles from "@/app/(auth)/password-reset/PasswordResetPage.module.scss"
import { PASSWORD_RESET_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"
import { useReturnToLoginHref } from "@shared/hooks/useReturnToLoginHref.ts"
import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"

type FieldType = {
    email: string
}

const PasswordResetPage = () => {
    const router = useRouter()
    const loginHref = useReturnToLoginHref("/login")
    const [form] = Form.useForm<FieldType>()
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            setIsLoading(true)
            await api.post(PASSWORD_RESET_URL, values)
            setIsSuccess(true)
        } catch (error) {
            handleApiError({ error, form })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className={styles.page}>
            <section className={styles.card}>
                {isSuccess ? (
                    <Result
                        className={styles.result}
                        status="success"
                        title="Check your inbox"
                        subTitle="If an account exists for this email, we have sent password reset instructions."
                        extra={
                            <CustomButton
                                variant="primary-filled"
                                onClick={() => router.push(loginHref)}
                            >
                                Back to sign in
                            </CustomButton>
                        }
                    />
                ) : (
                    <>
                        <div className={styles.iconWrapper}>
                            <ShieldCheck size={30} aria-hidden />
                        </div>

                        <div className={styles.heading}>
                            <span>Account recovery</span>
                            <h1>Reset your password</h1>
                            <p>
                                Enter the email connected to your ASRP account. We will send you a
                                secure link to create a new password.
                            </p>
                        </div>

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            disabled={isLoading}
                        >
                            <Form.Item
                                label="Email address"
                                name="email"
                                rules={[
                                    { required: true, message: "Please enter your email address." },
                                    {
                                        type: "email",
                                        message: "Please enter a valid email address.",
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    prefix={<Mail size={17} aria-hidden />}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                />
                            </Form.Item>

                            <CustomButton
                                className={styles.submitButton}
                                variant="primary-filled"
                                htmlType="submit"
                                loading={isLoading}
                            >
                                Send reset link
                            </CustomButton>
                        </Form>

                        <button
                            type="button"
                            className={styles.backButton}
                            onClick={() => router.push(loginHref)}
                        >
                            <ArrowLeft size={16} aria-hidden />
                            Back to sign in
                        </button>

                        <p className={styles.securityNote}>
                            For your security, the reset link will expire after a limited time.
                        </p>
                    </>
                )}
            </section>
        </main>
    )
}

export default PasswordResetPage
