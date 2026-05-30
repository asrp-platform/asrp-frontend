"use client"

import styles from "@app/(auth)/registration/complete/EmailConfirmationPage.module.scss"
import Loading from "@app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import { Typography } from "antd"

const { Paragraph, Text } = Typography

interface IProps {
    message: string
}

const LoadingStatus = ({ message }: IProps) => {
    return (
        <div className={styles.pageContainer}>
            <section className={styles.confirmationCard}>
                <Loading />
                <div className={styles.loadingText}>
                    <Text strong>Confirming your email</Text>
                    <Paragraph type="secondary">{message}</Paragraph>
                </div>
            </section>
        </div>
    )
}

export default LoadingStatus
