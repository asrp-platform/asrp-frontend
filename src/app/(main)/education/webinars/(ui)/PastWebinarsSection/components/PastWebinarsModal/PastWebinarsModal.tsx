"use client"

import { Modal } from "antd"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

import type { IWebinar } from "@entities/News.ts"

import PastWebinarCard from "../PastWebinarCard/PastWebinarCard"
import styles from "./PastWebinarsModal.module.scss"

interface IProps {
    webinars: IWebinar[]
    isAuthenticated: boolean
    hasActiveMembership: boolean
    canManageRecording: boolean
}

const PastWebinarsModal = ({
    webinars,
    isAuthenticated,
    hasActiveMembership,
    canManageRecording,
}: IProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button type="button" className={styles.trigger} onClick={() => setIsOpen(true)}>
                View all past webinars <ArrowRight size={16} />
            </button>
            <Modal
                open={isOpen}
                title="Past webinars"
                width={1100}
                footer={null}
                onCancel={() => setIsOpen(false)}
                className={styles.modal}
            >
                <div className={styles.list}>
                    {webinars.map((webinar) => (
                        <PastWebinarCard
                            key={webinar.id}
                            webinar={webinar}
                            isAuthenticated={isAuthenticated}
                            hasActiveMembership={hasActiveMembership}
                            canManageRecording={canManageRecording}
                        />
                    ))}
                </div>
            </Modal>
        </>
    )
}

export default PastWebinarsModal
