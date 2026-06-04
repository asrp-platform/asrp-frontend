"use client"

import { Result } from "antd"
import { isAxiosError } from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import api from "@/axios.ts"
import { EMAIL_CONFIRMATIONS_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import styles from "@app/(auth)/registration/complete/EmailConfirmationPage.module.scss"
import LoadingStatus from "@app/(auth)/registration/complete/(ui)/LoadingStatus.tsx"
import ErrorStatus from "@app/(auth)/registration/complete/(ui)/ErrorStatus.tsx"
import PrimaryLinkOutlined from "@shared/ui/Buttons/PrimaryLinkOutlined/PrimaryLinkOutlined.tsx"
import SecondaryLinkOutlined from "@shared/ui/Buttons/SecondaryLinkOutilned/SecondaryLinkOutlined.tsx"

type ConfirmationStatus = "loading" | "success" | "error"

type EmailConfirmationResponse = {
    detail?: string
    message?: string
}

const EmailConfirmationClient = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [status, setStatus] = useState<ConfirmationStatus>("loading")
    const [message, setMessage] = useState("We are checking your confirmation link.")

    useEffect(() => {
        const confirmEmail = async () => {
            if (!token) {
                setMessage("Confirmation token is missing.")
                setStatus("error")
                return
            }

            try {
                setStatus("loading")

                const response = await api.get<EmailConfirmationResponse>(EMAIL_CONFIRMATIONS_URL, {
                    params: {
                        token,
                    },
                })

                setMessage(
                    response.data.detail ??
                        response.data.message ??
                        "Email confirmed successfully.",
                )
                setStatus("success")
            } catch (error) {
                if (isAxiosError<EmailConfirmationResponse>(error)) {
                    setMessage(
                        error.response?.data?.detail ??
                            error.response?.data?.message ??
                            "Email confirmation link is invalid or expired.",
                    )
                } else {
                    setMessage("Email confirmation link is invalid or expired.")
                }
                setStatus("error")
            }
        }

        confirmEmail()
    }, [token])

    if (status === "loading") {
        return <LoadingStatus message={message} />
    }

    if (status === "error") {
        return <ErrorStatus message={message} />
    }

    return (
        <div className={styles.pageContainer}>
            <section className={styles.confirmationCard}>
                <Result
                    status="success"
                    title="Email confirmed"
                    subTitle={message}
                    extra={[
                        <PrimaryLinkOutlined href={"/login"}>
                            Continue to login
                        </PrimaryLinkOutlined>,
                        <SecondaryLinkOutlined href={"/"}>Home</SecondaryLinkOutlined>,
                    ]}
                />
            </section>
        </div>
    )
}

export default EmailConfirmationClient
