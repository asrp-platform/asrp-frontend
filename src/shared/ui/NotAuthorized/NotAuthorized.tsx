import styles from "./styles.module.scss"
import { ShieldAlert } from "lucide-react"

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
                <a href="/login" className={styles.primaryLink}>
                    Sign in
                </a>
                <a href="/" className={styles.secondaryLink}>
                    Go to homepage
                </a>
            </div>

            <p className={styles.helperText}>
                If you believe this is an error, please contact support.
            </p>
        </section>
    )
}

export default NotAuthorized
