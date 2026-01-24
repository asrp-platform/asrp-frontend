import styles from "./styles.module.scss"

interface IProps {
    title: string
    info: string
    votingStatus: string
    votingColor: "red" | "blue"
    subDescription: string
    price: number | string
    renderButton?: boolean
    icon?: React.ReactNode
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
            {renderButton && <button className={styles.secondaryButton}>Join</button>}
        </div>
    )
}

export default MembershipInfoCard
