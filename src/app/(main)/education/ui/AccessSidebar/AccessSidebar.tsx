import Link from "next/link"
import styles from "./styles.module.scss"

const AccessSidebar = () => {
    return (
        <div className={styles.accessSidebar}>
            <h2>How to access materials</h2>
            <div className={styles.accessCard}>
                <div className={styles.accessCardHeader}>
                    <span className={styles.accessIcon}>🔒</span>
                    <span className={styles.accessLabel}>Member-only</span>
                </div>
                <p>Some resources require an ASRP account (videos, modules, guides, archives).</p>
            </div>
            <div className={styles.accessCard}>
                <div className={styles.accessCardHeader}>
                    <span className={styles.accessIcon}>🌐</span>
                    <span className={styles.accessLabel}>Open learning</span>
                </div>
                <p>"Case of the Month" is public and designed for broad educational value.</p>
            </div>
            <div className={styles.accessCard}>
                <div className={styles.accessCardHeader}>
                    <span className={styles.accessIcon}>📬</span>
                    <span className={styles.accessLabel}>Contribute</span>
                </div>
                <p>Submit cases, questions, or teaching materials to support the community.</p>
            </div>
            <div className={styles.sidebarButtons}>
                <Link href="/login" className={styles.loginButton}>
                    Log in
                </Link>
                <Link href="/membership/become-member" className={styles.joinButton}>
                    Join ASRP
                </Link>
            </div>
        </div>
    )
}

export default AccessSidebar
