import styles from "@app/(auth)/registration/styles.module.scss"
import RegisterForm from "@app/(auth)/registration/(ui)/RegisterForm.tsx"
import type { Metadata } from "next"

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
    title: "ASRP | Registration",
}

const Page = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.registerFormContainer}>
                <RegisterForm />
            </div>
        </div>
    )
}

export default Page
