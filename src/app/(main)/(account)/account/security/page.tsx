"use client"

import styles from "./styles.module.scss"
import Card from "../../../../../widgets/Card/Card.tsx"

const Page = () => {
    return (
        <div>
            <section className={styles.titleContainer}>
                <h1 className={styles.title}>Security</h1>
                <p className={styles.titleInfo}>
                    Manage your password, login security, and active sessions.
                </p>
            </section>

            <Card title="Password">
                <p className={styles.passwordRecommendations}>
                    We recommend changing your password regularly to keep your account secure.
                </p>

                <div className={styles.buttonContainer}>
                    <button>Change Password</button>
                    <button>Reset Password</button>
                </div>
            </Card>
        </div>
    )
}

export default Page
