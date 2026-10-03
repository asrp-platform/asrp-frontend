"use client"

import { ShieldAlert } from "lucide-react"

import styles from "./AccessDenied.module.scss"

interface Props {
    message?: string
    compact?: boolean
}

const AccessDenied = ({ message, compact = false }: Props) => {
    return (
        <section
            className={`${styles.container} ${compact ? styles.compact : ""}`}
            aria-live="polite"
            role="alert"
        >
            <div className={styles.icon} aria-hidden="true">
                <ShieldAlert size={compact ? 28 : 52} strokeWidth={1.8} />
            </div>
            <div>
                <h2 className={styles.title}>Access denied</h2>
                <p className={styles.message}>
                    {message || "You do not have permission to perform this action."}
                </p>
            </div>
        </section>
    )
}

export default AccessDenied
