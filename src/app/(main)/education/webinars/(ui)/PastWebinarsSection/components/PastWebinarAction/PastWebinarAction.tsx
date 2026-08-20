import { LockKeyhole, Play } from "lucide-react"
import Link from "next/link"

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

    if (!hasActiveMembership) {
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

    if (webinar.bunny_video_id) {
        return (
            <Link
                className={styles.recordingLink}
                href={`/education/webinars/${webinar.slug}/watch`}
            >
                <Play size={16} /> Watch webinar
            </Link>
        )
    }

    return <span className={styles.unavailable}>Recording unavailable</span>
}

export default PastWebinarAction
