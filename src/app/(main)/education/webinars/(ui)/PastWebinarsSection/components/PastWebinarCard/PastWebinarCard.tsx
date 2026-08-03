import type { IWebinar } from "@entities/News.ts"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"

import PastWebinarAction from "../PastWebinarAction/PastWebinarAction"
import AttachRecordingLinkButton from "../AttachRecordingLinkButton/AttachRecordingLinkButton"
import styles from "./PastWebinarCard.module.scss"

interface IProps {
    webinar: IWebinar
    isAuthenticated: boolean
    hasActiveMembership: boolean
    canManageRecording: boolean
}

const PastWebinarCard = ({
    webinar,
    isAuthenticated,
    hasActiveMembership,
    canManageRecording,
}: IProps) => (
    <article className={styles.row}>
        <div className={styles.date}>
            <span>COMPLETED</span>
            <time>{formatDatetime(webinar.starts_at, ["hour", "minute"])}</time>
        </div>
        <div className={styles.info}>
            <h3>{webinar.title}</h3>
            <span>Presented by {webinar.speaker_name}</span>
            <p>{webinar.description}</p>
        </div>
        <div className={styles.actions}>
            <PastWebinarAction
                webinar={webinar}
                isAuthenticated={isAuthenticated}
                hasActiveMembership={hasActiveMembership}
            />
            {canManageRecording && <AttachRecordingLinkButton webinar={webinar} />}
        </div>
    </article>
)

export default PastWebinarCard
