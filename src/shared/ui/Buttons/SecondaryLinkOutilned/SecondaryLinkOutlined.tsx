"use client"

import Link from "next/link"
import styles from "@/shared/ui/Buttons/SecondaryLinkOutilned/SecondaryLinkOutlined.module.scss"
import clsx from "clsx"
import { useReturnToLoginHref } from "@shared/hooks/useReturnToLoginHref.ts"

interface IProps {
    href: string
    children: string
    className?: string
}

const SecondaryLinkOutlined = ({ href, children, className }: IProps) => {
    const resolvedHref = useReturnToLoginHref(href)

    return (
        <Link href={resolvedHref} className={clsx(styles.secondaryLinkOutlined, className)}>
            {children}
        </Link>
    )
}

export default SecondaryLinkOutlined
