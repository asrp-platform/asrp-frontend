"use client"

import styles from "@/shared/ui/Cards/ProfileInfoCard/ProfileInfoCard.module.scss"
import clsx from "clsx"
import type { ReactNode } from "react"

interface IProps {
    className?: string
    children?: ReactNode
}

const ProfileInfoCard = ({ children, className }: IProps) => {
    return <div className={clsx(styles.card, className)}>{children}</div>
}

export default ProfileInfoCard
