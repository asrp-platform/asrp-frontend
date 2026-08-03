"use client"

import Link from "next/link"
import { type ReactNode } from "react"
import styles from "@/shared/ui/Buttons/Buttons.module.scss"
import clsx from "clsx"
import { useReturnToLoginHref } from "@shared/hooks/useReturnToLoginHref.ts"

interface LinkButtonProps {
    className?: string
    href: string
    children: ReactNode
    variant?: "secondary" | "red" | "blue" | "default"
}

export default function LinkButton({ href, children, variant, className }: LinkButtonProps) {
    const resolvedHref = useReturnToLoginHref(href)

    return (
        <Link
            href={resolvedHref}
            className={clsx(styles.linkButton, variant && styles[variant], className)}
        >
            {children}
        </Link>
    )
}
