import { Clock3, Globe2, MapPin } from "lucide-react"

import type { IWebinar } from "@entities/News.ts"
import MemberAccess from "@app/(main)/education/webinars/(ui)/MemberAccess/MemberAccess.tsx"
import type { WebinarAccessStatus } from "@app/(main)/education/webinars/(ui)/MemberAccess/webinarAccess.ts"
import { formatDatetime, formatTimezone } from "@shared/helpers/formatDatetime.ts"

import styles from "./UpcomingWebinarCard.module.scss"
import DeleteWebinarButton from "../DeleteWebinarButton/DeleteWebinarButton"
import EditWebinarButton from "../EditWebinarButton/EditWebinarButton"
import WebinarDetailsModal from "../WebinarDetailsModal/WebinarDetailsModal"

interface IProps {
    webinar: IWebinar
    accessStatus: WebinarAccessStatus
    canDelete: boolean
}

const UpcomingWebinarCard = ({ webinar, accessStatus, canDelete }: IProps) => (
    <article className={styles.card}>
        {canDelete && (
            <div className={styles.adminActions}>
                <DeleteWebinarButton webinar={webinar} />
                <EditWebinarButton webinar={webinar} />
            </div>
        )}
        <div className={styles.topline}>
            <time>
                {formatDatetime(webinar.starts_at, ["year", "hour", "minute"], webinar.timezone)}
            </time>
            <span>Upcoming</span>
        </div>
        <div className={styles.info}>
            <h3>{webinar.title}</h3>
            <p>{webinar.speaker_name}</p>
        </div>
        <div className={styles.time}>
            <span>
                <Clock3 size={15} />
                {formatDatetime(webinar.starts_at, [], webinar.timezone)}
            </span>
            {webinar.location && (
                <span>
                    <MapPin size={15} /> {webinar.location}
                </span>
            )}
            <span>
                <Globe2 size={15} />
                {formatTimezone(webinar.starts_at, webinar.timezone)}
            </span>
        </div>
        <WebinarDetailsModal webinar={webinar} accessStatus={accessStatus} />
        <MemberAccess compact status={accessStatus} webinar={webinar} />
    </article>
)

export default UpcomingWebinarCard
