"use client"

import styles from "@/app/(main)/(account)/account/security/styles.module.scss"
import Card from "@/widgets/Card/Card.tsx"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthProvider.tsx"
import { useState } from "react"
import ChangePasswordModal from "@/app/(main)/(account)/account/security/ui/ChangePasswordModal.tsx"

const Page = () => {
    const { user } = useAuth()

    const router = useRouter()

    const [changePasswordOpen, setChangePasswordOpen] = useState(false)

    const onResetClick = () => {
        router.push("/password-reset")
    }

    if (!user) {
        return
    }

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
                    <button onClick={() => setChangePasswordOpen(true)}>Change Password</button>
                    <button onClick={onResetClick}>Reset Password</button>
                </div>
            </Card>
            <ChangePasswordModal
                open={changePasswordOpen}
                onClose={() => setChangePasswordOpen(false)}
            />
        </div>
    )
}

export default Page
