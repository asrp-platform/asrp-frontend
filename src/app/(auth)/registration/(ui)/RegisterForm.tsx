"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Form, type FormProps, Typography } from "antd"
import { LeftOutlined } from "@ant-design/icons"
import { useForm } from "antd/es/form/Form"
import { isAxiosError } from "axios"
import useNotification from "antd/es/notification/useNotification"
import { useState } from "react"

import styles from "@app/(auth)/registration/styles.module.scss"
import api from "@/axios.ts"
import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"
import type { RegisterFormFields } from "@app/(auth)/registration/(ui)/types.ts"
import NameSection from "@app/(auth)/registration/(ui)/NameSection.tsx"
import AccountCredentialsSection from "@app/(auth)/registration/(ui)/AccountCredentialsSection.tsx"
import LocationSection from "@app/(auth)/registration/(ui)/LocationSection.tsx"
import RegistrationSuccess from "@app/(auth)/registration/(ui)/RegistrationSuccess.tsx"
import { useCountriesQuery } from "@shared/backend/queries/useCountriesQuery.ts"
import { handleStatusError } from "@shared/helpers/handleStatusError.ts"
import { setFormFieldsErrors } from "@shared/helpers/setFormFieldsErrors.ts"
import { clearFormErrors } from "@shared/helpers/formsHelpers.ts"
import { REGISTER_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"

const RegisterForm = () => {
    const router = useRouter()
    const [form] = useForm()
    const [registrationEmail, setRegistrationEmail] = useState<string | null>(null)
    const [resendMessage, setResendMessage] = useState<string | null>(null)
    const [resendStatus, setResendStatus] = useState<"success" | "error">("success")

    const { data: countries, isLoading: isCountriesLoading } = useCountriesQuery()

    const [notification, contextHolder] = useNotification()

    const onFinish: FormProps<RegisterFormFields>["onFinish"] = async (values) => {
        clearFormErrors(form)
        try {
            const credentials = values.credentials?.length ? values.credentials.join(",") : null
            await api.post(REGISTER_URL, {
                ...values,
                credentials,
            })
            setRegistrationEmail(values.email)
        } catch (error: unknown) {
            if (!isAxiosError(error)) {
                console.error(error)
                notification.error({
                    title: "Server Error",
                    description:
                        "An unexpected error occurred on the server. Please try again later.",
                    showProgress: true,
                    pauseOnHover: true,
                })
                return
            } else if (error.response === undefined) {
                console.error(error)
                notification.error({
                    title: "Network error",
                    description: "Check your internet connection and try again.",
                    showProgress: true,
                    pauseOnHover: true,
                })
                return
            } else {
                if (error.response?.status === 409) {
                    form.setFields([
                        { name: "email", errors: ["Provided email is already in use"] },
                    ])
                } else if (error.response?.status === 422) {
                    setFormFieldsErrors(error, form)
                } else {
                    handleStatusError(error)
                }
            }
        }
    }

    if (registrationEmail) {
        return (
            <RegistrationSuccess
                registrationEmail={registrationEmail}
                resendMessage={resendMessage}
                resendStatus={resendStatus}
                onBackToLogin={() => router.push("/login")}
                onHome={() => router.push("/")}
                onResendSuccess={(message) => {
                    setResendStatus("success")
                    setResendMessage(message)
                }}
                onResendError={(message) => {
                    setResendStatus("error")
                    setResendMessage(message)
                }}
            />
        )
    }

    return (
        <>
            <header className={styles.header}>
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
                <NameSection />
                <AccountCredentialsSection />
                <LocationSection countries={countries} isCountriesLoading={isCountriesLoading} />

                <div className={styles.submitButtonContainer}>
                    <CustomButton variant="primary-filled" htmlType="submit">
                        Submit
                    </CustomButton>
                </div>
            </Form>
        </>
    )
}

export default RegisterForm
