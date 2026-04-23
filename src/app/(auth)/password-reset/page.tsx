"use client"

import { useForm } from "antd/es/form/Form"
import { Button, Form, type FormProps, Input, Result, Spin, Typography } from "antd"
import { CaretLeftOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"

import { isAxiosError } from "axios"
import { useState } from "react"
import useNotification from "antd/es/notification/useNotification"
import styles from "./PasswordResetPage.module.scss"
import api from "../../../axios.ts"
import { PASSWORD_RESET_URL } from "../../../shared/backend/rest-api-urls/restApiUrls.ts"

const { Title, Paragraph } = Typography

type FieldType = {
    email: string
}

const Page = () => {
    const router = useRouter()

    const [loading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState<boolean>(false)

    const [form] = useForm()

    const [notification, contextHolder] = useNotification()

    const openNotification = (pauseOnHover: boolean) => {
        notification.error({
            title: "Server Error",
            description: "An unexpected error occurred on the server. Please try again later.",
            showProgress: true,
            pauseOnHover,
        })
    }

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            setIsLoading(true)
            await api.post(PASSWORD_RESET_URL, values)
            setSuccess(true)
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status === 401) {
                    form.setFieldsValue({
                        email: "",
                        errors: ["Input should be a valid email address"],
                    })
                }
            } else {
                openNotification(false)
            }
        } finally {
            setIsLoading(false)
        }
    }

    if (success) {
        return (
            <Result
                status="success"
                title="Password reset link has been sent"
                subTitle="We sent a password reset link to your email. Please check your inbox and follow the instructions."
                extra={[
                    <Button type="primary" key="home" onClick={() => router.push("/")}>
                        Go Home
                    </Button>,
                ]}
            />
        )
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.innerContainer}>
                {contextHolder}
                <Title level={2}>Recover Password</Title>
                <Paragraph className={styles.resetMessage}>
                    Enter the email address you used to register and we'll send you the instruction
                </Paragraph>
                <Spin spinning={loading}>
                    <Form form={form} onFinish={onFinish}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Please enter your email" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" className={styles.resetButton}>
                            Reset Password
                        </Button>
                        <Button
                            className={styles.backButton}
                            htmlType="submit"
                            onClick={() => router.push("/login")}
                        >
                            <CaretLeftOutlined />
                            Back to sign in
                        </Button>
                    </Form>
                </Spin>
            </div>
        </div>
    )
}

export default Page
