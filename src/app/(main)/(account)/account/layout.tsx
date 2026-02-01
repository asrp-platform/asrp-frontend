import type { ReactNode } from "react"

import styles from "./layout.module.scss"
import Link from "next/link"

const Layout = async ({ children }: { children: ReactNode }) => {
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
            <section className={styles.accountContentSection}>
                {children}
                Section Content
            </section>
        </div>
    )
}

export default Layout
