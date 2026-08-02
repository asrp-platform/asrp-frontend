import styles from "./styles.module.scss"
import { LockKeyhole } from "lucide-react"
import CustomLink from "@shared/ui/Buttons/CustomLink/CustomLink.tsx"
import { WebinarAccessStatus } from "./webinarAccess"

interface IProps {
    compact?: boolean
    registrationLink?: string | null
    status: WebinarAccessStatus
}

const MemberAccess = ({ compact = false, registrationLink, status }: IProps) => {
    if (status === WebinarAccessStatus.AVAILABLE && registrationLink) {
        return (
            <div className={compact ? styles.registrationCompact : styles.registrationAction}>
                <CustomLink href={registrationLink} variant="primary">
                    Register for the webinar
                </CustomLink>
            </div>
        )
    }

    const requiresSignIn = status === WebinarAccessStatus.SIGN_IN_REQUIRED
    const registrationUnavailable = status === WebinarAccessStatus.REGISTRATION_UNAVAILABLE

    return (
        <div className={`${styles.memberAccessCard} ${compact ? styles.memberAccessCompact : ""}`}>
            <div className={styles.lockIcon}>
                <LockKeyhole size={20} />
            </div>
            <div className={styles.memberAccessText}>
                <strong>
                    {registrationUnavailable
                        ? "Registration is not available yet"
                        : "An active ASRP membership is required"}
                </strong>
                <p>
                    {registrationUnavailable
                        ? "Please check back later for registration details."
                        : requiresSignIn
                          ? "Sign in or become a member to register for this webinar."
                          : "Activate your membership to register for this webinar."}
                </p>
            </div>
            {!registrationUnavailable && (
                <div className={styles.memberAccessActions}>
                    {requiresSignIn && (
                        <CustomLink
                            className={styles.signInButton}
                            href="/login"
                            variant="secondary"
                        >
                            Sign In
                        </CustomLink>
                    )}
                    <CustomLink
                        className={styles.joinButton}
                        href="/membership/become-member"
                        variant="primary-filled"
                    >
                        Become a member
                    </CustomLink>
                </div>
            )}
        </div>
    )
}

export default MemberAccess
