import CreateWebinarModal from "../CreateWebinarModal/CreateWebinarModal"

import styles from "./UpcomingWebinarsSectionHeader.module.scss"

interface IProps {
    webinarsCount: number
    showCreateButton: boolean
}

const UpcomingWebinarsSectionHeader = ({ webinarsCount, showCreateButton }: IProps) => (
    <div className={styles.header}>
        <div>
            <h2>Upcoming webinars</h2>
            <p>Live educational programs and upcoming member events.</p>
        </div>
        <div className={styles.actions}>
            {showCreateButton && <CreateWebinarModal />}
            <span className={styles.countBadge}>{webinarsCount} upcoming</span>
        </div>
    </div>
)

export default UpcomingWebinarsSectionHeader
