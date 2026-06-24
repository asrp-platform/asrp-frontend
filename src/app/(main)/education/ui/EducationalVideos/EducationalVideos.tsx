import Link from "next/link"
import styles from "./styles.module.scss"

const libraryCards = [
    {
        title: "Internal Library",
        description:
            "ASRP educational recordings, lectures, workshops, and member-contributed teaching sessions.",
        badge: "Internal",
        badgeClass: "libraryBadge" as const,
        href: null,
    },
    {
        title: "External Channels",
        description: "Selected high-quality external resources.",
        badge: "External",
        badgeClass: "libraryBadgeExternal" as const,
        href: null,
    },
    {
        title: "Recommend a Resource",
        description:
            "Members can propose external videos/channels to be reviewed and added to the curated list.",
        badge: "Suggest",
        badgeClass: "libraryBadgeSuggest" as const,
        href: "#",
    },
]

const EducationalVideos = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.memberLibrarySection}>
                <div className={styles.memberLibraryHeader}>
                    <span className={styles.memberOnlyLabel}>Member library</span>
                    <h2>Educational Videos (Member-only)</h2>
                    <p>
                        Video content related to diagnostic work and laboratory practice. As the
                        library grows, it can be split into subspecialty and workflow sections.
                    </p>
                </div>
                <div className={styles.libraryCardsGrid}>
                    {libraryCards.map((card, index) => (
                        <div key={index} className={styles.libraryCard}>
                            <div className={styles.libraryCardHeader}>
                                <span className={styles[card.badgeClass]}>{card.badge}</span>
                            </div>
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                            {card.href && (
                                <Link href={card.href} className={styles.libraryCardLink}>
                                    Send a suggestion →
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EducationalVideos
