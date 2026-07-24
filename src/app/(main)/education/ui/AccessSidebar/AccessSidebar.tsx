import CustomLink from "@/shared/ui/Buttons/CustomLink/CustomLink"

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
                <CustomLink href="/login" variant="ghost">
                    Log in
                </CustomLink>
                <CustomLink
                    href="/membership/become-member"
                    variant="primary-filled"
                    className={styles.joinLink}
                >
                    Join ASRP
                </CustomLink>
            </div>
        </div>
    )
}

export default AccessSidebar
