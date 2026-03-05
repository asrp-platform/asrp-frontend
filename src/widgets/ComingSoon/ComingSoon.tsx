"use client"

import { SettingOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"
import styles from "./styles.module.scss"

interface ComingSoonProps {
    title?: string
    description?: string
    showBackButton?: boolean
}

const ComingSoon = ({
    title = "Coming Soon",
    description = "This page is currently under development.",
    showBackButton = false,
}: ComingSoonProps) => {
    const router = useRouter()

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <SettingOutlined className={styles.icon} />

                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{description}</p>

                {showBackButton && (
                    <button className={styles.backButton} onClick={() => router.back()}>
                        Go Back
                    </button>
                )}
            </div>
        </div>
    )
}

export default ComingSoon
