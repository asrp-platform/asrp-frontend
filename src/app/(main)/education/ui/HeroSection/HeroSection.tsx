import Link from "next/link"
import styles from "./styles.module.scss"
import AccessSidebar from "../AccessSidebar/AccessSidebar"

const HeroSection = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.heroContainer}>
                <div className={styles.heroContent}>
                    <div className={styles.breadcrumb}>
                        <Link href="/">Home</Link>
                        <span className={styles.breadcrumbSeparator}>›</span>
                        <span>Education</span>
                    </div>
                    <h1>Education</h1>
                    <p className={styles.heroDescription}>
                        The Educational Division of the American Society of Russian-Speaking
                        Pathologists (ASRP) supports the professional growth of Russian-speaking
                        pathologists, trainees, and laboratory professionals in the United States
                        and worldwide. Our mission is to promote excellence in pathology through
                        accessible, high-quality educational resources that bridge language,
                        culture, and scientific expertise.
                    </p>
                    <p className={styles.heroDescription}>
                        The ASRP Education Center offers a diverse collection of learning tools,
                        including virtual and in-person sessions, future CME-oriented activities,
                        case-based modules, virtual microscopy slide sets, subspecialty webinars,
                        journal clubs, and board-exam preparation resources. Materials are curated
                        and reviewed by experienced academic and clinical pathologists to ensure
                        accuracy, relevance, and alignment with current U.S. standards of practice.
                    </p>
                    <p className={styles.heroDescription}>
                        Recognizing the needs of Russian-speaking professionals around the world, we
                        also provide bilingual education, practice-transition support, laboratory
                        quality assurance resources, and guidance on U.S. training pathways—helping
                        members integrate into American healthcare systems while maintaining strong
                        ties to the international pathology community.
                    </p>
                    <div className={styles.heroButtons}>
                        <Link href="#catalog" className={styles.browseCatalogButton}>
                            Browse education catalog
                        </Link>
                        <Link href="#case-of-month" className={styles.caseOfMonthButton}>
                            Case of the Month
                        </Link>
                    </div>
                    <div className={styles.tagsContainer}>
                        <span className={styles.tag}>CME in development</span>
                        <span className={styles.tag}>Digital slide sets</span>
                        <span className={styles.tag}>Board prep tools</span>
                        <span className={styles.tag}>Bilingual support</span>
                    </div>
                </div>
                <AccessSidebar />
            </div>
        </div>
    )
}

export default HeroSection
