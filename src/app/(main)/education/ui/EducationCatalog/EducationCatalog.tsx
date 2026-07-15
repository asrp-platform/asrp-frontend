import ResourceCard from "@/app/(main)/education/ui/EducationTags/EducationTags"
import styles from "./styles.module.scss"

const catalogItems = [
    {
        title: "Educational Videos",
        description:
            "Curated internal & external video content focused on diagnostic practice and real-world lab workflows.",
        badge: "Member-only",
        badgeType: "member" as const,
        meta: "Internal + External",
        href: "#",
    },
    {
        title: "Educational Modules",
        description:
            "Structured learning modules: objectives, key slides, self-checks, and takeaways.",
        badge: "Member-only",
        badgeType: "member" as const,
        meta: "Surg path + Cyto + Heme + Mol",
        href: "#",
    },
    {
        title: "Case of the Month",
        description:
            "Interesting, challenging cases with high-quality images, key differentials, and practical workup pearls.",
        badge: "Public",
        badgeType: "public" as const,
        meta: "Open for contributors",
        href: "#",
    },
    {
        title: "Board-like Questions",
        description:
            "High-yield practice questions organized by Anatomic Pathology (AP) and Clinical Pathology (CP).",
        badge: "Practice",
        badgeType: "practice" as const,
        meta: "Timed + Review mode",
        href: "#",
    },
    {
        title: "Career & Leadership Development",
        description:
            "Videos and guides on career strategy, communication, leadership skills, and professional growth.",
        badge: "Member-only",
        badgeType: "member" as const,
        meta: "Mentorship-ready",
        href: "#",
    },
    {
        title: "Resident / Fellow Resources",
        description:
            "Guides and videos for trainees: rotations, sign-out habits, evaluation success, and wellness.",
        badge: "Member-only",
        badgeType: "member" as const,
        meta: "PGY guidance",
        href: "#",
    },
    {
        title: "Pathology Applicant Resources",
        description:
            "Step-by-step resources for applicants: CV, interviews, observerships, and U.S. pathway guidance.",
        badge: "Member-only",
        badgeType: "member" as const,
        meta: "Bilingual support",
        href: "#",
    },
    {
        title: "Wallhangers",
        description: "Printable quick-reference tools for daily sign-out and laboratory workflows.",
        badge: "Member-only",
        badgeType: "member" as const,
        meta: "PDF + A4/Letter",
        href: "#",
    },
    {
        title: "Miscellaneous",
        description:
            "Practical guidance about life in the U.S., legal/immigration recommendations, and helpful extras.",
        badge: "Member-only",
        badgeType: "member" as const,
        meta: "Curated links",
        href: "#",
    },
]

const EducationCatalog = () => {
    return (
        <div className={styles.catalogSection}>
            <div className={styles.catalogHeader}>
                <span className={styles.catalogLabel}>Education catalog</span>
                <h2>Explore learning areas</h2>
                <p>
                    Browse resources across training, practice, and professional development. Locked
                    sections require login (member access).
                </p>
            </div>
            <div className={styles.cardsGrid}>
                {catalogItems.map((item, index) => (
                    <ResourceCard key={index} {...item} />
                ))}
            </div>
        </div>
    )
}

export default EducationCatalog
