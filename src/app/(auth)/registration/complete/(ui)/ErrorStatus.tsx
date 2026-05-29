"use client"

import styles from "@app/(auth)/registration/complete/EmailConfirmationPage.module.scss"
import { Result } from "antd"
import type { ReactNode } from "react"
import PrimaryLinkOutlined from "@shared/ui/Buttons/PrimaryLinkOutlined/PrimaryLinkOutlined.tsx"
import SecondaryLinkOutlined from "@shared/ui/Buttons/SecondaryLinkOutilned/SecondaryLinkOutlined.tsx"

interface IProps {
    message: string | ReactNode
}

const ErrorStatus = ({ message }: IProps) => {
    return (
        <div className={styles.pageContainer}>
            <section className={styles.confirmationCard}>
                <Result
                    status="error"
                    title="Email confirmation failed"
                    subTitle={message}
                    extra={[
                        <PrimaryLinkOutlined href={"/registration"}>
                            Create an account
                        </PrimaryLinkOutlined>,
                        <SecondaryLinkOutlined href={"/login"}>
                            Back to login
                        </SecondaryLinkOutlined>,
                    ]}
                />
            </section>
        </div>
    )
}

export default ErrorStatus
