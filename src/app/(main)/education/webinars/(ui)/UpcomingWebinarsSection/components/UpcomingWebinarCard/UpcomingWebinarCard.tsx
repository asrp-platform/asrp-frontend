import { Clock3, MapPin } from "lucide-react"

import type { IWebinar } from "@entities/News.ts"
import MemberAccess from "@app/(main)/education/webinars/(ui)/MemberAccess/MemberAccess.tsx"
import type { WebinarAccessStatus } from "@app/(main)/education/webinars/(ui)/MemberAccess/webinarAccess.ts"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"

import styles from "./UpcomingWebinarCard.module.scss"

interface IProps {
    webinar: IWebinar
    accessStatus: WebinarAccessStatus
}

const UpcomingWebinarCard = ({ webinar, accessStatus }: IProps) => (
    <article className={styles.card}>
        <div className={styles.topline}>
            <time>{formatDatetime(webinar.starts_at, ["year", "hour", "minute"])}</time>
            <span>Upcoming</span>
        </div>
        <div className={styles.info}>
            <h3>{webinar.title}</h3>
            <p>{webinar.speaker_name}</p>
        </div>
        <div className={styles.time}>
            <span>
                <Clock3 size={15} /> {formatDatetime(webinar.starts_at)}
            </span>
            <span>
                <MapPin size={15} /> Live on Zoom
            </span>
        </div>
        <MemberAccess compact status={accessStatus} webinar={webinar} />
    </article>
)

export default UpcomingWebinarCard
