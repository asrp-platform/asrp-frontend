"use client"

import { useForm } from "antd/es/form/Form"
import { Button, Form, type FormProps, Input, Spin } from "antd"
import { CONFIRM_PASSWORD_RESET_URL } from "../../shared/backend/rest-api-urls/restApiUrls.ts"
import { isAxiosError } from "axios"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import api from "../../axios.ts"

interface FieldType {
    password: string
    confirm_password: string
}

interface IProps {
    setPasswordChanged: (_newValue: boolean) => void
}

const ChangePasswordFormReset = ({ setPasswordChanged }: IProps) => {
    const searchParams = useSearchParams()

    const token = searchParams.get("token")

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [form] = useForm()

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            setIsLoading(true)
            await api.post(CONFIRM_PASSWORD_RESET_URL, values, {
                params: {
                    token: token,
                },
            })
            setPasswordChanged(true)
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status === 422) {
                    const message = error.response?.data.detail.errors[0].message
                    form.setFields([
                        { name: "password", errors: [message] },
                        { name: "confirm_password", errors: [message] },
                    ])
                }
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Spin spinning={isLoading}>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please enter your password" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Confirm password" name="confirm_password">
                        <Input />
                    </Form.Item>
                    <Button htmlType={"submit"} type="primary">
                        Change Password
                    </Button>
                </Form>
            </Spin>
        </div>
    )
}

export default ChangePasswordFormReset
