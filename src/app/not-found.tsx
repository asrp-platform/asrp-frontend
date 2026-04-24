"use client"

import { Button } from "antd"
import { useRouter } from "next/navigation"
import { FileUnknownOutlined } from "@ant-design/icons"
import styles from "@/app/notFound.module.scss"

export default function NotFound() {
    const router = useRouter()

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <FileUnknownOutlined className={styles.icon} />
                <h1 className={styles.title}>404</h1>
                <p className={styles.description}>The page you are looking for does not exist.</p>

                <Button type="primary" onClick={() => router.push("/")}>
                    Go to Home
                </Button>
            </div>
        </div>
    )
}
