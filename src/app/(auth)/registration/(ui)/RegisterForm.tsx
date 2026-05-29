"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button, Form, type FormProps, Input, Result, Typography } from "antd"
import { LeftOutlined } from "@ant-design/icons"
import { useForm } from "antd/es/form/Form"
import { isAxiosError } from "axios"
import useNotification from "antd/es/notification/useNotification"
import { useState } from "react"

import styles from "@app/(auth)/registration/styles.module.scss"
import { Role } from "@shared/types/types.ts"
import api from "@/axios.ts"
import { REGISTER_URL } from "@shared/backend/rest-api-urls/restApiUrls.ts"
import type { IBackendErrorResponse } from "@shared/types/interfaces.ts"

const { Paragraph, Text } = Typography

type FieldType = {
    email: string
    password: string
    repeat_password: string
    firstname: string
    lastname: string
    institution: string
    role: Role
    city: string
    country: string
}

const RegisterForm = () => {
    const router = useRouter()
    const [form] = useForm()
    const [registrationEmail, setRegistrationEmail] = useState<string | null>(null)

    const [notification, contextHolder] = useNotification()

    const openNotification = (pauseOnHover: boolean) => {
        notification.error({
            title: "Server Error",
            description: "An unexpected error occurred on the server. Please try again later.",
            showProgress: true,
            pauseOnHover,
        })
    }

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        const registerUser = async () => {
            try {
                await api.post(REGISTER_URL, values)
                setRegistrationEmail(values.email)
            } catch (error: unknown) {
                if (isAxiosError(error)) {
                    const errorResponse: IBackendErrorResponse = error.response?.data
                    const errorResponseDetail = errorResponse.detail

                    console.log(error.response)

                    if (error.response?.status === 409) {
                        if (typeof errorResponseDetail === "string") {
                            form.setFields([{ name: "email", errors: [errorResponseDetail] }])
                        }
                    } else if (error.response?.status === 400) {
                        if (typeof errorResponseDetail === "string") {
                            form.setFields([
                                { name: "password", errors: [errorResponseDetail] },
                                { name: "repeat_password", errors: [errorResponseDetail] },
                            ])
                        }
                    } else if (error.response?.status === 422) {
                        if (typeof errorResponseDetail !== "string") {
                            const fieldErrors = errorResponseDetail.errors.map((error) => ({
                                name: error.field,
                                errors: [error.message],
                            }))
                            form.setFields(fieldErrors)
                        }
                    } else {
                        openNotification(false)
                    }
                }
            }
        }
        registerUser()
    }

    if (registrationEmail) {
        return (
            <div className={styles.registrationSuccessContainer}>
                <Result
                    status="success"
                    title="Check your email"
                    subTitle={
                        <div className={styles.confirmationMessage}>
                            <Paragraph>
                                We sent a confirmation link to{" "}
                                <Text strong>{registrationEmail}</Text>.
                            </Paragraph>
                            <Paragraph>
                                To complete your registration, open the email and follow the
                                confirmation link.
                            </Paragraph>
                        </div>
                    }
                    extra={[
                        <Button type="primary" key="login" onClick={() => router.push("/login")}>
                            Back to login
                        </Button>,
                        <Button key="home" onClick={() => router.push("/")}>
                            Home
                        </Button>,
                    ]}
                />
            </div>
        )
    }

    return (
        <>
            <header>
                <h1>Create an account</h1>
                <Typography>
                    <Link
                        href="/login"
                        aria-label="Return to login page"
                        className={styles.returnButton}
                    >
                        <LeftOutlined />
                        Back
                    </Link>
                </Typography>
            </header>
            <Form layout="vertical" onFinish={onFinish} form={form} className={styles.registerForm}>
                {contextHolder}
                <h2>Name</h2>
                <div className={styles.twoFieldContainer}>
                    <Form.Item<FieldType>
                        label="First name"
                        name="firstname"
                        rules={[{ required: true, message: "Please enter your name" }]}
                    >
                        <Input className={styles.antdInput} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Last name"
                        name="lastname"
                        rules={[{ required: true, message: "Please enter your lastname" }]}
                    >
                        <Input className={styles.antdInput} />
                    </Form.Item>
                </div>

                <h2>Credentials</h2>
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Please enter your email" }]}
                    className={styles.emailInput}
                >
                    <Input className={styles.antdInput} />
                </Form.Item>

                <div className={styles.twoFieldContainer}>
                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please enter your password" }]}
                    >
                        <Input.Password className={styles.antdInput} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Repeat password"
                        name="repeat_password"
                        rules={[{ required: true, message: "Please repeat your password" }]}
                    >
                        <Input.Password className={styles.antdInput} />
                    </Form.Item>
                </div>

                <div className={styles.twoFieldContainer}>
                    <Form.Item<FieldType>
                        label="Country"
                        name="country"
                        rules={[{ required: true, message: "Please enter your country" }]}
                    >
                        <Input className={styles.antdInput} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="City"
                        name="city"
                        rules={[{ required: true, message: "Please select your city" }]}
                    >
                        <Input className={styles.antdInput} />
                    </Form.Item>
                </div>

                <div className={styles.submitButtonContainer}>
                    <Button type="primary" htmlType="submit" className={styles.submitButton}>
                        Submit
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default RegisterForm
