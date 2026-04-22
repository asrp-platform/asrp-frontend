import Link from "next/link"
import { type ReactNode } from "react"
import styles from "./Buttons.module.scss"
import clsx from "clsx"

interface LinkButtonProps {
    href: string
    children: ReactNode
    variant?: "secondary" | "signup" | "default"
}

export default function LinkButton({ href, children, variant }: LinkButtonProps) {
    return (
        <Link href={href} className={clsx(styles.linkButton, variant && styles[variant])}>
            {children}
        </Link>
    )
}
