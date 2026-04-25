"use client"

import { useEffect, useState } from "react"
import { LogOut, Menu, User } from "lucide-react"

import styles from "@/widgets/Header/ui/styles.module.scss"
import { useAuth } from "@/context/AuthProvider.tsx"
import SideMenuHeader from "@/widgets/Header/ui/SideMenuHeader.tsx"
import BreakLine from "@/widgets/Header/ui/BreakLine.tsx"
import SideMenuItemList from "@/widgets/Header/ui/SideMenuItemList.tsx"
import { handleLogout } from "@/widgets/Header/helpers/logout.ts"
import Link from "next/link"
import { UserOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"
import { onUserLoginClick } from "@/widgets/Header/helpers/login.ts"

const SideMenu = () => {
    const { user } = useAuth()
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)

    const onClick = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    return (
        <div>
            <Menu width={24} height={24} onClick={onClick} className={styles.menuIconContainer} />
            {isOpen && <div className={styles.overlay} onClick={onClick}></div>}

            <div className={`${styles.sideMenuContainer} ${isOpen && styles.active}`}>
                <div className={styles.sideMenu}>
                    <SideMenuHeader setIsOpen={setIsOpen} />
                    <BreakLine />

                    {user && (
                        <Link href="/account/profile">
                            <div className={styles.userMobileProfileContainer}>
                                <User className={styles.userMobileProfileIcon} size={18} />
                                <span>Profile</span>
                            </div>
                        </Link>
                    )}

                    <SideMenuItemList setIsOpen={setIsOpen} onClick={onClick} />
                    <BreakLine />
                    {user ? (
                        <div className={styles.authMobileMenuContainer} onClick={handleLogout}>
                            <span className={styles.authMobileMenuIcon}>
                                <LogOut size={18} />
                            </span>
                            <span>Logout</span>
                        </div>
                    ) : (
                        <div
                            className={styles.authMobileMenuContainer}
                            onClick={() => onUserLoginClick(router)}
                        >
                            <span className={styles.authMobileMenuIcon}>
                                <UserOutlined size={18} />
                            </span>
                            <span>Login</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SideMenu
