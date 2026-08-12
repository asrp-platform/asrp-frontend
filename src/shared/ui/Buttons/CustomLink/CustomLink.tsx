"use client"

import clsx from "clsx"
import Link from "next/link"
import type { ReactNode } from "react"

import styles from "./CustomLink.module.scss"
import { useReturnToLoginHref } from "@shared/hooks/useReturnToLoginHref.ts"

export type CustomLinkVariant =
    | "primary"
    | "secondary"
    | "primary-filled"
    | "red"
    | "blue"
    | "default"
    | "ghost"

interface IProps {
    href: string
    children: ReactNode
    className?: string
    variant?: CustomLinkVariant
}

const CustomLink = ({ href, children, className, variant = "primary" }: IProps) => {
    const resolvedHref = useReturnToLoginHref(href)

    return (
        <Link
            href={resolvedHref}
            className={clsx(styles.link, variant && styles[variant], className)}
        >
            {children}
        </Link>
    )
}

export default CustomLink
