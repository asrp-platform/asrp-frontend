"use client"

import clsx from "clsx"
import Link from "next/link"
import type { ReactNode } from "react"

import styles from "./CustomLink.module.scss"

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
    return (
        <Link href={href} className={clsx(styles.link, variant && styles[variant], className)}>
            {children}
        </Link>
    )
}

export default CustomLink
