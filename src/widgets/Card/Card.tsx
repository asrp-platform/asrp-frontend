"use client"

import styles from "@/widgets/Card/styles.module.scss"
import type { ReactNode } from "react"

interface IProps {
    title: string
    children?: ReactNode
}

const Card = ({ title, children }: IProps) => {
    return (
        <div className={styles.cardContainer}>
            <h2 className={styles.cardTitle}>{title}</h2>
            <div>{children}</div>
        </div>
    )
}

export default Card
