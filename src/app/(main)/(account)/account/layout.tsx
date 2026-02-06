"use client"

import { type ReactNode } from "react"

import styles from "./layout.module.scss"
import Link from "next/link"

import { useAuth } from "../../../../context/AuthProvider.tsx"
import NotAuthorized from "../../../../shared/ui/NotAuthorized/NotAuthorized.tsx"
import clsx from "clsx"
import { usePathname } from "next/navigation"

interface NavListItem {
    href: string
    label: string
    match: string[]
}

const navItemsList: NavListItem[] = [
    {
        href: "/account/dashboard",
        label: "Dashboard",
        match: ["/account/dashboard"],
    },
    {
        href: "/account/profile",
        label: "Profile",
        match: ["/account/profile"],
    },
    {
        href: "/account/membership",
        label: "Membership",
        match: ["/account/membership"],
    },
    {
        href: "/account/payments",
        label: "Payments",
        match: ["/account/payments"],
    },
    {
        href: "/account/communication-preferences",
        label: "Communication Preferences",
        match: ["/account/communication-preferences"],
    },
    {
        href: "/account/security",
        label: "Security",
        match: ["/account/security"],
    },
]

const Layout = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth()

    const pathname = usePathname()

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
                            <li className={styles.accountNavItem} key={item.label}>
                                <Link
                                    className={clsx(
                                        styles.navItemLink,
                                        item.match.includes(pathname) && styles.activeLink
                                    )}
                                    href={item.href}
                                >
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
