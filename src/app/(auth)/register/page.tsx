import Link from "next/link"
import styles from "@/app/(auth)/register/styles.module.scss"
import RegisterForm from "@/app/(auth)/register/ui/RegisterForm.tsx"
import type { Metadata } from "next"
import { LeftOutlined } from "@ant-design/icons"
import { Typography } from "antd"

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
    title: "ASRP | Register",
}

const Page = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.registerFormContainer}>
                <header>
                    <h1>Сreate an account</h1>
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
                <RegisterForm />
            </div>
        </div>
    )
}

export default Page
