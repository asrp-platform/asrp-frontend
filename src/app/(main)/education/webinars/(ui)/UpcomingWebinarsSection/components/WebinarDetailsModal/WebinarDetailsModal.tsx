"use client"

import { Modal } from "antd"
import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react"
import { useState } from "react"

import MemberAccess from "@app/(main)/education/webinars/(ui)/MemberAccess/MemberAccess.tsx"
import type { WebinarAccessStatus } from "@app/(main)/education/webinars/(ui)/MemberAccess/webinarAccess.ts"
import type { IWebinar } from "@entities/News.ts"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"

import styles from "./WebinarDetailsModal.module.scss"

interface IProps {
    webinar: IWebinar
    accessStatus: WebinarAccessStatus
}

const WebinarDetailsModal = ({ webinar, accessStatus }: IProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button type="button" className={styles.trigger} onClick={() => setIsOpen(true)}>
                View webinar details <ArrowRight size={15} />
            </button>

            <Modal
                open={isOpen}
                title={webinar.title}
                width={920}
                footer={null}
                onCancel={() => setIsOpen(false)}
                className={styles.modal}
            >
                <div className={styles.content}>
                    <div className={styles.metaRow}>
                        <span>
                            <CalendarDays size={16} />
                            {formatDatetime(webinar.starts_at, ["hour", "minute"])}
                        </span>
                        <span>
                            <Clock3 size={16} />
                            {formatDatetime(webinar.starts_at, ["day", "month", "year"])}
                        </span>
                        {webinar.location && (
                            <span>
                                <MapPin size={16} /> {webinar.location}
                            </span>
                        )}
                    </div>

                    <div className={styles.speaker}>
                        <strong>Presented by {webinar.speaker_name}</strong>
                        {webinar.speaker_description && <span>{webinar.speaker_description}</span>}
                    </div>

                    <p className={styles.description}>{webinar.description}</p>

                    {webinar.learning_objectives.length > 0 && (
                        <section className={styles.objectives}>
                            <h3>Learning objectives</h3>
                            <ul>
                                {webinar.learning_objectives.map((objective) => (
                                    <li key={objective}>{objective}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    <MemberAccess webinar={webinar} status={accessStatus} />
                </div>
            </Modal>
        </>
    )
}

export default WebinarDetailsModal
