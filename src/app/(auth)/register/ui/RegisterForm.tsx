"use client"

import { useRouter } from "next/navigation"
import { Button, Form, type FormProps, Input } from "antd"
import { useForm } from "antd/es/form/Form"
import { isAxiosError } from "axios"
import useNotification from "antd/es/notification/useNotification"

import styles from "../styles.module.scss"
import { Role } from "../../../../shared/types/types.ts"
import api from "../../../../axios.ts"
import { REGISTER_URL } from "../../../../shared/backend/restApiUrls.ts"
import type { IBackendErrorResponse } from "../../../../shared/types/interfaces.ts"

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
                router.push("/")
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

    return (
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
    )
}

export default RegisterForm
