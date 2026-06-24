import Link from "next/link"
import { type ReactNode } from "react"
import styles from "@/shared/ui/Buttons/Buttons.module.scss"
import clsx from "clsx"

interface LinkButtonProps {
    className?: string
    href: string
    children: ReactNode
    variant?: "secondary" | "red" | "blue" | "default"
}

export default function LinkButton({ href, children, variant, className }: LinkButtonProps) {
    return (
        <Link
            href={href}
            className={clsx(styles.linkButton, variant && styles[variant], className)}
        >
            {children}
        </Link>
    )
}
