import styles from "./styles.module.scss"
import { LockKeyhole } from "lucide-react"
import CustomLink from "@shared/ui/Buttons/CustomLink/CustomLink.tsx"

interface IProps {
    compact?: boolean
}

const MemberAccess = ({ compact = false }: IProps) => {
    return (
        <div className={`${styles.memberAccessCard} ${compact ? styles.memberAccessCompact : ""}`}>
            <div className={styles.lockIcon}>
                <LockKeyhole size={20} />
            </div>
            <div className={styles.memberAccessText}>
                <strong>Webinar access is available to ASRP members</strong>
                <p>Sign in to view the meeting link, passcode, and member materials.</p>
            </div>
            <div className={styles.memberAccessActions}>
                <CustomLink className={styles.signInButton} href="/login" variant={"secondary"}>
                    Sign In
                </CustomLink>
                <CustomLink
                    className={styles.joinButton}
                    href="/membership/become-member"
                    variant={"primary-filled"}
                >
                    Become a member
                </CustomLink>
            </div>
        </div>
    )
}

export default MemberAccess
