import Link from "next/link"
import type { ReactNode } from "react"

import styles from "./MembershipInfoCard.module.scss"

interface IProps {
    title: string
    info: string
    votingStatus: string
    votingColor: "red" | "blue"
    subDescription: string
    price: number | string
    renderButton?: boolean
    icon?: ReactNode
}

const MembershipInfoCard = ({
    title,
    info,
    votingStatus,
    votingColor,
    subDescription,
    price,
    renderButton = true,
    icon,
}: IProps) => {
    const votingStatusColor =
        votingColor === "red" ? styles.votingStatusRed : styles.votingStatusBlue

    return (
        <div className={styles.card}>
            <div className={`${styles.votingStatus} ${votingStatusColor}`}>{votingStatus}</div>
            <h3>
                {icon} {title}
            </h3>
            <p>{info}</p>
            <span className={styles.price}>${price} / year</span>
            <div className={styles.subdescription}>{subDescription}</div>
            {renderButton && (
                <Link href="/membership/become-member" className={styles.secondaryLink}>
                    Join
                </Link>
            )}
        </div>
    )
}

export default MembershipInfoCard
