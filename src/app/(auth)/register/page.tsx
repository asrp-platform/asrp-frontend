import styles from "./styles.module.scss"
import RegisterForm from "./ui/RegisterForm.tsx"
import type { Metadata } from "next"

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
    title: "ASRP | Register",
}

const Page = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.registerFormContainer}>
                <h2>Become our member</h2>
                <RegisterForm />
            </div>
        </div>
    )
}

export default Page
