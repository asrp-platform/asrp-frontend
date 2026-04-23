"use client"

import { Checkbox, Form, type FormProps, Input, Typography } from "antd"
import styles from "../styles.module.scss"
import Link from "next/link"
import api from "../../../../axios.ts"
import type { LoginResponse } from "../types.ts"
import { LOGIN_URL } from "../../../../shared/backend/rest-api-urls/restApiUrls.ts"
import { isAxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useForm } from "antd/es/form/Form"
import { useAuth } from "../../../../context/AuthProvider.tsx"
import useNotification from "antd/es/notification/useNotification"
import PrimaryButton from "../../../../shared/ui/Buttons/PrimaryButton.tsx"

type FieldType = {
    email: string
    password: string
    remember_me: boolean
}

const { Paragraph } = Typography

const LoginForm = () => {
    const router = useRouter()
    const [form] = useForm()
    const { fetchUser } = useAuth()

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
        const loginUser = async () => {
            try {
                const response = await api.post<LoginResponse>(LOGIN_URL, values)
                localStorage.setItem("accessToken", response.data.access_token)
                await fetchUser() // get user after getting the accessToken
                router.push("/")
            } catch (error: unknown) {
                if (isAxiosError(error)) {
                    if (error.response?.status === 401) {
                        form.setFields([
                            { name: "email", errors: ["Wrong credentials"] },
                            { name: "password", errors: ["Wrong credentials"] },
                        ])
                    } else {
                        openNotification(false)
                    }
                }
            }
        }

        loginUser()
    }

    return (
        <Form layout="vertical" form={form} onFinish={onFinish}>
            {contextHolder}
            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
            >
                <Input className={styles.antdInput} />
            </Form.Item>
            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter your email" }]}
            >
                <Input.Password className={styles.antdInput} />
            </Form.Item>
            <Typography>
                <Paragraph>
                    <div className={styles.bottomFormContainer}>
                        <Link href="/register">Don't have an account?</Link>
                        <Link href="/password-reset">Forgot password?</Link>
                    </div>
                </Paragraph>
            </Typography>
            <div className={styles.submitContainer}>
                <Form.Item<FieldType> name="remember_me" valuePropName="checked">
                    <Checkbox checked={false}>Remember me</Checkbox>
                </Form.Item>
                <PrimaryButton htmlType="submit" label={"Submit"} />
            </div>
        </Form>
    )
}

export default LoginForm
