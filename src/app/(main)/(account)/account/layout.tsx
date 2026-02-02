"use client"

import type { ReactNode } from "react"

import styles from "./layout.module.scss"
import Link from "next/link"
import { ShieldAlert } from "lucide-react"

import { useAuth } from "../../../../context/AuthProvider.tsx"

const Layout = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth()

    if (!user) {
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

    return (
        <div className={styles.profileLayoutContainer}>
            <aside className={styles.accountAside}>
                <h3>MY ACCOUNT</h3>
                <nav className={styles.accountNav}>
                    <ul className={styles.accountNavList}>
                        <li className={styles.accountNavItem}>
                            <Link className={styles.navItemLink} href="#">
                                Dashboard
                            </Link>
                        </li>
                        <li className={styles.accountNavItem}>
                            <Link className={styles.navItemLink} href="#">
                                Profile
                            </Link>
                        </li>
                        <li className={styles.accountNavItem}>
                            <Link className={styles.navItemLink} href="#">
                                Membership
                            </Link>
                        </li>
                        <li className={styles.accountNavItem}>
                            <Link className={styles.navItemLink} href="#">
                                Payments
                            </Link>
                        </li>
                        <li className={styles.accountNavItem}>
                            <Link className={styles.navItemLink} href="#">
                                Communication Preferences
                            </Link>
                        </li>
                        <li className={styles.accountNavItem}>
                            <Link className={styles.navItemLink} href="#">
                                Security
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <section className={styles.accountContentSection}>{children}</section>
        </div>
    )
}

export default Layout
