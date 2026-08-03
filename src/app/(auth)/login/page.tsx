import styles from "@/app/(auth)/login/styles.module.scss"
import LoginForm from "@/app/(auth)/login/(ui)/LoginForm.tsx"
import type { Metadata } from "next"
import { Suspense } from "react"

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
    title: "ASRP | Login",
}

const LoginPage = () => {
    return (
        <div className={styles.outerContainer}>
            <div className={styles.loginFormContainer}>
                <h2>Login</h2>
                <Suspense fallback={null}>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    )
}

export default LoginPage
