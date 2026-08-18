"use client"

import { Checkbox, Form, type FormProps, Input, Typography } from "antd"
import styles from "@/app/(auth)/login/styles.module.scss"
import Link from "next/link"
import api from "@/axios.ts"
import type { LoginResponse } from "@/app/(auth)/login/types.ts"
import { LOGIN_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import { isAxiosError } from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "antd/es/form/Form"
import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"
import { useQueryClient } from "@tanstack/react-query"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"
import { useState } from "react"
import { getSafeReturnTo } from "@shared/helpers/authRedirect.ts"

type FieldType = {
    email: string
    password: string
    remember: boolean
}

const { Paragraph } = Typography

const LoginForm = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [form] = useForm()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const queryClient = useQueryClient()
    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        localStorage.removeItem("accessToken")
        try {
            setIsLoading(true)
            const response = await api.post<LoginResponse>(LOGIN_URL, values)
            localStorage.setItem("accessToken", response.data.access_token)
            await queryClient.invalidateQueries({
                queryKey: ["current-user"],
            })
            router.replace(getSafeReturnTo(searchParams.get("returnTo")))
        } catch (error: unknown) {
            if (isAxiosError(error) && error.response?.status === 401) {
                form.setFields([
                    { name: "email", errors: ["Wrong credentials"] },
                    { name: "password", errors: ["Wrong credentials"] },
                ])
            } else {
                handleApiError({ error, form })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form layout="vertical" form={form} onFinish={onFinish}>
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
                    <div className={styles.loginLinksContainer}>
                        <div className={styles.bottomFormContainer}>
                            <Link href="/registration">Don't have an account?</Link>
                            <Link href="/password-reset">Forgot password?</Link>
                        </div>
                        <Link
                            href="/registration/resend-confirmation"
                            className={styles.resendConfirmationLink}
                        >
                            Didn't receive confirmation email?
                        </Link>
                    </div>
                </Paragraph>
            </Typography>
            <div className={styles.submitContainer}>
                <Form.Item<FieldType> name="remember" valuePropName="checked">
                    <Checkbox checked={false}>Remember me</Checkbox>
                </Form.Item>
                <CustomButton
                    loading={isLoading}
                    variant={"primary-filled"}
                    htmlType="submit"
                    children={"Submit"}
                />
            </div>
        </Form>
    )
}

export default LoginForm
