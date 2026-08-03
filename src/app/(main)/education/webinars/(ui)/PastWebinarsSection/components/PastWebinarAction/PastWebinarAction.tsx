import { LockKeyhole, Play } from "lucide-react"

import type { IWebinar } from "@entities/News.ts"
import CustomLink from "@shared/ui/Buttons/CustomLink/CustomLink.tsx"

import styles from "./PastWebinarAction.module.scss"

interface IProps {
    webinar: IWebinar
    isAuthenticated: boolean
    hasActiveMembership: boolean
}

const PastWebinarAction = ({ webinar, isAuthenticated, hasActiveMembership }: IProps) => {
    if (!isAuthenticated) {
        return (
            <div className={styles.restriction}>
                <LockKeyhole size={16} />
                <span>Sign in to access recordings</span>
                <CustomLink href="/login" variant="secondary">
                    Sign In
                </CustomLink>
            </div>
        )
    }

    if (webinar.member_only && !hasActiveMembership) {
        return (
            <div className={styles.restriction}>
                <LockKeyhole size={16} />
                <span>Active membership required</span>
                <CustomLink href="/membership/become-member" variant="primary-filled">
                    Become a member
                </CustomLink>
            </div>
        )
    }

    if (webinar.recording_link) {
        return (
            <a
                className={styles.recordingLink}
                href={webinar.recording_link}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Play size={16} /> Watch recording
            </a>
        )
    }

    return <span className={styles.unavailable}>Recording unavailable</span>
}

export default PastWebinarAction
