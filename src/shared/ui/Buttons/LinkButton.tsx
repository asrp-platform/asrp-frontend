import Link from "next/link"
import { type ReactNode } from "react"
import styles from "./Buttons.module.scss"

interface LinkButtonProps {
    href: string
    children: ReactNode
    variant: "warning" | "default"
}

export default function LinkButton({ href, children, variant }: LinkButtonProps) {
    return (
        <Link href={href} className={`${styles.linkButton} ${variant ? styles[variant] : ""}`}>
            {children}
        </Link>
    )
}
