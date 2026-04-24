"use client"

import { Suspense, useEffect, useState } from "react"
import { Button, Result, Spin, Typography } from "antd"

import styles from "@/app/(auth)/password-reset/confirm/PasswordResetConfirmPage.module.scss"
import api from "@/axios.ts"
import { useRouter, useSearchParams } from "next/navigation"
import { VERIFY_PASSWORD_RESET_TOKEN_URL } from "@/shared/backend/rest-api-urls/restApiUrls.ts"
import ChangePasswordFormReset from "@/features/ChangePasswordFormReset/ChangePasswordFormReset.tsx"
import Loading from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"

const { Title, Paragraph } = Typography

const PasswordResetConfirmClient = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [isLoading, setIsLoading] = useState(true)
    const [verified, setVerified] = useState(false)
    const [passwordChanged, setPasswordChanged] = useState<boolean>(false)

    const token = searchParams.get("token")

    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                try {
                    setIsLoading(true)
                    await api.get<string>(VERIFY_PASSWORD_RESET_TOKEN_URL, {
                        params: {
                            token: token,
                        },
                    })
                    setVerified(true)
                } catch {
                    setVerified(false)
                } finally {
                    setIsLoading(false)
                }
            } else {
                setVerified(false)
            }
        }

        verifyToken()
    }, [token])

    if (isLoading) {
        return <Spin />
    }

    if (!verified) {
        return (
            <Result
                status="error"
                title="Password reset link is invalid or expired"
                subTitle="Please request a new link to reset your password."
                extra={[
                    <Button
                        type="primary"
                        key="reset"
                        onClick={() => router.push("/password-reset")}
                    >
                        Request a new link
                    </Button>,
                    <Button key="home" onClick={() => router.push("/")}>
                        Home
                    </Button>,
                ]}
            />
        )
    }

    if (passwordChanged) {
        return (
            <Result
                status="success"
                title="Password successfully changed"
                subTitle="Please request a new link to reset your password."
                extra={[
                    <Button type="primary" key="reset" onClick={() => router.push("/login")}>
                        Login
                    </Button>,
                    <Button key="home" onClick={() => router.push("/")}>
                        Home
                    </Button>,
                ]}
            />
        )
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.innerContainer}>
                <Title level={2}>Change password</Title>
                <Paragraph type="secondary">
                    Please enter a new password for your account. After saving, you’ll be able to
                    log in with your new credentials.
                </Paragraph>
                <Suspense fallback={<Loading />}>
                    <ChangePasswordFormReset setPasswordChanged={setPasswordChanged} />
                </Suspense>
            </div>
        </div>
    )
}

export default PasswordResetConfirmClient
