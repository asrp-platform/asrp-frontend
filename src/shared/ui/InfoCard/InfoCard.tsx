import styles from "@/shared/ui/InfoCard/InfoCard.module.scss"
import type { ReactNode } from "react"

interface IProps {
    title: string | ReactNode
    description: string | ReactNode
}

const InfoCard = ({ title, description }: IProps) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.titleContainer}>{title}</div>
            <div className={styles.descriptionContainer}>{description}</div>
        </div>
    )
}

export default InfoCard
