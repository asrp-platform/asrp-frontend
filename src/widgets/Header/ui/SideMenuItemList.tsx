"use client"

import styles from "@/widgets/Header/ui/styles.module.scss"
import { headerMenuItems } from "@/widgets/Header/headerMenuItems.tsx"
import Link from "next/link"
import { useState } from "react"

interface IProps {
    setIsOpen: (_open: boolean) => void
    onClick?: () => void
}

const SideMenuItemList = ({ setIsOpen, onClick }: IProps) => {
    const [openKey, setOpenKey] = useState<string | number | null>(null)

    return (
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
                                    <span className={styles.arrow}>{isOpenItem ? "▼" : "▶"}</span>
                                </>
                            ) : (
                                <Link href={item.to} onClick={onClick}>
                                    {item.label}
                                </Link>
                            )}
                        </div>

                        {item.children && (
                            <div className={`${styles.subMenu} ${isOpenItem ? styles.open : ""}`}>
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
    )
}

export default SideMenuItemList
