import styles from "@/app/(main)/membership/(ui)/styles.module.scss"
import type { ReactNode } from "react"

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
    const getVotingColor = () => {
        switch (votingColor) {
            case "red":
                return styles.votingStatusRed
            case "blue":
                return styles.votingStatusBlue
            default:
                return styles.votingStatusBlue
        }
    }

    return (
        <div className={styles.card}>
            <div className={`${styles.votingStatus} ${getVotingColor()}`}>{votingStatus}</div>
            <h3>
                {icon} {title}
            </h3>
            <p>{info}</p>
            <span className={styles.price}>${price} / year</span>
            <div className={styles.subdescription}>{subDescription}</div>
            {renderButton && <button className={styles.secondaryLink}>Join</button>}
        </div>
    )
}

export default MembershipInfoCard
