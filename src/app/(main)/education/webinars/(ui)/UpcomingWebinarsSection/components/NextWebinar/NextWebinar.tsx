import { CalendarDays, Clock3, MapPin } from "lucide-react"
import MemberAccess from "@app/(main)/education/webinars/(ui)/MemberAccess/MemberAccess.tsx"

import styles from "./NextWebinar.module.scss"
import type { IWebinar } from "@entities/News.ts"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"
import type { WebinarAccessStatus } from "@app/(main)/education/webinars/(ui)/MemberAccess/webinarAccess.ts"

interface IProps {
    webinar: IWebinar
    accessStatus: WebinarAccessStatus
}

const NextWebinar = ({ webinar, accessStatus }: IProps) => {
    return (
        <article className={styles.featuredCard}>
            <div className={styles.featuredVisual}>
                <div className={styles.visualContent}>
                    <div className={styles.slideMark} aria-hidden="true">
                        ASRP
                    </div>
                    <span className={styles.nextWebinarBadge}>Next webinar</span>
                </div>
            </div>
            <div className={styles.featuredContent}>
                <span className={styles.openBadge}>Registration open</span>
                <h2>Diagnostic Challenges in Soft Tissue Pathology</h2>
                <div className={styles.metaRow}>
                    <span>
                        <CalendarDays size={16} />{" "}
                        {formatDatetime(webinar.starts_at, ["year", "hour", "minute"])}
                    </span>
                    <span>
                        <Clock3 size={16} />{" "}
                        {formatDatetime(webinar.starts_at, ["day", "month", "year"])}
                    </span>
                    <span>
                        <MapPin size={16} /> {webinar.location}
                    </span>
                </div>
                <div className={styles.divider} />
                <p className={styles.summary}>{webinar.description}</p>
                <div className={styles.speaker}>
                    <div>
                        <strong>{webinar.speaker_name}</strong>
                        <span>{webinar.speaker_description}</span>
                    </div>
                </div>
                <MemberAccess status={accessStatus} webinar={webinar} />
            </div>
        </article>
    )
}

export default NextWebinar
