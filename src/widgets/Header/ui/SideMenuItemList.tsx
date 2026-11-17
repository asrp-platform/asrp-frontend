"use client"

import styles from "@/widgets/Header/ui/styles.module.scss"
import { headerMenuItems } from "@/widgets/Header/headerMenuItems.tsx"
import Link from "next/link"
import { useId, useState } from "react"

interface IProps {
    setIsOpen: (_open: boolean) => void
    onClick?: () => void
}

const SideMenuItemList = ({ setIsOpen, onClick }: IProps) => {
    const [openKey, setOpenKey] = useState<string | number | null>(null)
    const menuId = useId()

    return (
        <div className={styles.sideMenuBody}>
            {headerMenuItems.map((item) => {
                const isOpenItem = openKey === item.key
                const submenuId = `${menuId}-${item.key}`
                const label = (
                    <>
                        <span className={styles.menuIcon} aria-hidden="true">
                            {item.icon}
                        </span>
                        <span>{item.label}</span>
                    </>
                )

                return (
                    <div key={item.key}>
                        {item.children ? (
                            <button
                                type="button"
                                className={styles.menuItemContainer}
                                aria-expanded={isOpenItem}
                                aria-controls={submenuId}
                                onClick={() => setOpenKey(isOpenItem ? null : item.key)}
                            >
                                {label}
                                <span className={styles.arrow} aria-hidden="true">
                                    ▶
                                </span>
                            </button>
                        ) : (
                            <Link
                                href={item.to}
                                className={styles.menuItemContainer}
                                onClick={() => setIsOpen(false)}
                            >
                                {label}
                            </Link>
                        )}

                        {item.children && (
                            <div
                                id={submenuId}
                                inert={!isOpenItem}
                                className={`${styles.subMenu} ${isOpenItem ? styles.open : ""}`}
                            >
                                <div className={styles.subMenuContent}>
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
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default SideMenuItemList
