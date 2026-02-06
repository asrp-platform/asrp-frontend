"use client"

import { type ReactNode } from "react"

import styles from "./layout.module.scss"
import Link from "next/link"

import { useAuth } from "../../../../context/AuthProvider.tsx"
import NotAuthorized from "../../../../shared/ui/NotAuthorized/NotAuthorized.tsx"

interface NavListItem {
    href: string
    label: string
}

const navItemsList: NavListItem[] = [
    {
        href: "/account/dashboard",
        label: "Dashboard",
    },
    {
        href: "/account/profile",
        label: "Profile",
    },
    {
        href: "/account/membership",
        label: "Membership",
    },
    {
        href: "/account/payments",
        label: "Payments",
    },
    {
        href: "/account/communication-preferences",
        label: "Communication Preferences",
    },
    {
        href: "/account/security",
        label: "Security",
    },
]

const Layout = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth()

    if (!user) {
        return <NotAuthorized />
    }

    return (
        <div className={styles.profileLayoutContainer}>
            <aside className={styles.accountAside}>
                <h3>MY ACCOUNT</h3>
                <nav className={styles.accountNav}>
                    <ul className={styles.accountNavList}>
                        {navItemsList.map((item: NavListItem) => (
                            <li className={styles.accountNavItem}>
                                <Link className={styles.navItemLink} href={item.href}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            <section className={styles.accountContentSection}>{children}</section>
        </div>
    )
}

export default Layout
