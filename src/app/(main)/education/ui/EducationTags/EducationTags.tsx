import Link from "next/link"
import styles from "./styles.module.scss"

interface EducationTagsProps {
    title: string
    description: string
    badge: string
    badgeType: "member" | "public" | "practice"
    meta: string
    href: string
}

const EducationTags = ({
    title,
    description,
    badge,
    badgeType,
    meta,
    href,
}: EducationTagsProps) => {
    const badgeClassName =
        badgeType === "member"
            ? styles.cardBadge
            : badgeType === "public"
              ? styles.cardBadgePublic
              : styles.cardBadgePractice

    return (
        <div className={styles.resourceCard}>
            <div className={styles.cardHeader}>
                <span className={badgeClassName}>{badge}</span>
                <span className={styles.cardMeta}>{meta}</span>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <Link href={href} className={styles.cardLink}>
                Open →
            </Link>
        </div>
    )
}

export default EducationTags
