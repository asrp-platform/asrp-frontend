"use client"

import Link from "next/link"
import styles from "@/shared/ui/Buttons/PrimaryLinkOutlined/PrimaryLinkOutlined.module.scss"
import clsx from "clsx"
import { useReturnToLoginHref } from "@shared/hooks/useReturnToLoginHref.ts"

interface IProps {
    href: string
    children: string
    className?: string
}

const PrimaryLinkOutlined = ({ href, children, className }: IProps) => {
    const resolvedHref = useReturnToLoginHref(href)

    return (
        <Link href={resolvedHref} className={clsx(styles.primaryLinkOutlined, className)}>
            {children}
        </Link>
    )
}

export default PrimaryLinkOutlined
