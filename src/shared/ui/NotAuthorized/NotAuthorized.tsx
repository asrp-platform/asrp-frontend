import styles from "@/shared/ui/NotAuthorized/NotAuthorized.module.scss"
import { ShieldAlert } from "lucide-react"
import PrimaryLinkOutlined from "@shared/ui/Buttons/PrimaryLinkOutlined/PrimaryLinkOutlined.tsx"
import SecondaryLinkOutlined from "@shared/ui/Buttons/SecondaryLinkOutilned/SecondaryLinkOutlined.tsx"

const NotAuthorized = () => {
    return (
        <section className={styles.card}>
            <div className={styles.icon}>
                <ShieldAlert size={36} className={styles.icon} />
            </div>

            <h1 className={styles.title}>Not authorized</h1>
            <p className={styles.subtitle}>
                You must be signed in to view your profile information.
            </p>

            <div className={styles.actions}>
                <PrimaryLinkOutlined href="/login">Sign in</PrimaryLinkOutlined>
                <SecondaryLinkOutlined href="/signup">Go to homepage</SecondaryLinkOutlined>
            </div>

            <p className={styles.helperText}>
                If you believe this is an error, please contact support.
            </p>
        </section>
    )
}

export default NotAuthorized
