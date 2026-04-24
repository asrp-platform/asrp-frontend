"use client"

import styles from "@/widgets/Header/ui/styles.module.scss"
import Logo from "@/shared/ui/LogoPlaceholder/Logo.tsx"
import { X } from "lucide-react"

interface IProps {
    setIsOpen: (_isOpen: boolean) => void
}

const SideMenuHeader = ({ setIsOpen }: IProps) => {
    const onClick = () => {
        setIsOpen(false)
    }

    return (
        <div className={styles.sideMenuHeader}>
            <Logo width={32} height={32} />
            <X onClick={onClick} />
        </div>
    )
}

export default SideMenuHeader
