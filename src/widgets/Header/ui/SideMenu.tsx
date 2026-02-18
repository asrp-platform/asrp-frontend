"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { X } from "lucide-react"

import styles from "./styles.module.scss"
import Logo from "../../../shared/ui/LogoPlaceholder/Logo.tsx"
import { headerMenuItems } from "../headerMenuItems.tsx"
import Link from "next/link"

const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false)

    const onClick = () => {
        setIsOpen(!isOpen)
    }

    const [openKey, setOpenKey] = useState<string | number | null>(null)

    return (
        <div>
            <Menu width={24} height={24} onClick={onClick} className={styles.menuIconContainer} />
            {isOpen && <div className={styles.overlay} onClick={onClick}></div>}
            <div className={`${styles.sideMenuContainer} ${isOpen && styles.active}`}>
                <div className={styles.sideMenu}>
                    <div className={styles.sideMenuHeader}>
                        <Logo width={32} height={32} />
                        <X onClick={onClick} />
                    </div>
                    <div className={styles.breakLine}></div>
                    <div className={styles.sideMenuBody}>
                        {headerMenuItems.map((item) => {
                            const isOpenItem = openKey === item.key

                            return (
                                <div key={item.key}>
                                    <div
                                        className={styles.menuItemContainer}
                                        onClick={() => {
                                            if (item.children) {
                                                setOpenKey(isOpenItem ? null : item.key)
                                            } else {
                                                setIsOpen(false)
                                            }
                                        }}
                                    >
                                        <span className={styles.menuIcon}>{item.icon}</span>

                                        {item.children ? (
                                            <>
                                                <span>{item.label}</span>
                                                <span className={styles.arrow}>
                                                    {isOpenItem ? "▼" : "▶"}
                                                </span>
                                            </>
                                        ) : (
                                            <Link href={item.to} onClick={onClick}>
                                                {item.label}
                                            </Link>
                                        )}
                                    </div>

                                    {item.children && (
                                        <div
                                            className={`${styles.subMenu} ${
                                                isOpenItem ? styles.open : ""
                                            }`}
                                        >
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.key}
                                                    href={child.to}
                                                    className={styles.subMenuItem}
                                                    onClick={onClick}
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideMenu
