"use client"

import styles from "@/app/(main)/education/styles.module.scss"
import Link from "next/link"
import PageSection from "@/shared/ui/PageSection/PageSection"

const Page = () => {
    return (
        <div className={styles.pageContainer}>
            {/* Hero Section */}
            <PageSection>
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
                            pathologists, trainees, and laboratory professionals in the United
                            States and worldwide. Our mission is to promote excellence in pathology
                            through accessible, high-quality educational resources that bridge
                            language, culture, and scientific expertise.
                        </p>
                        <p className={styles.heroDescription}>
                            The ASRP Education Center offers a diverse collection of learning tools,
                            including virtual and in-person sessions, future CME-oriented
                            activities, case-based modules, virtual microscopy slide sets,
                            subspecialty webinars, journal clubs, and board-exam preparation
                            resources. Materials are curated and reviewed by experienced academic
                            and clinical pathologists to ensure accuracy, relevance, and alignment
                            with current U.S. standards of practice.
                        </p>
                        <p className={styles.heroDescription}>
                            Recognizing the needs of Russian-speaking professionals around the
                            world, we also provide bilingual education, practice-transition support,
                            laboratory quality assurance resources, and guidance on U.S. training
                            pathways—helping members integrate into American healthcare systems
                            while maintaining strong ties to the international pathology community.
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
                    <div className={styles.accessSidebar}>
                        <h2>How to access materials</h2>
                        <div className={styles.accessCard}>
                            <div className={styles.accessCardHeader}>
                                <span className={styles.accessIcon}>🔒</span>
                                <span className={styles.accessLabel}>Member-only</span>
                            </div>
                            <p>
                                Some resources require an ASRP account (videos, modules, guides,
                                archives).
                            </p>
                        </div>
                        <div className={styles.accessCard}>
                            <div className={styles.accessCardHeader}>
                                <span className={styles.accessIcon}>🌐</span>
                                <span className={styles.accessLabel}>Open learning</span>
                            </div>
                            <p>
                                "Case of the Month" is public and designed for broad educational
                                value.
                            </p>
                        </div>
                        <div className={styles.accessCard}>
                            <div className={styles.accessCardHeader}>
                                <span className={styles.accessIcon}>📬</span>
                                <span className={styles.accessLabel}>Contribute</span>
                            </div>
                            <p>
                                Submit cases, questions, or teaching materials to support the
                                community.
                            </p>
                        </div>
                        <div className={styles.sidebarButtons}>
                            <Link href="/auth/login" className={styles.loginButton}>
                                Log in
                            </Link>
                            <Link href="/membership/become-member" className={styles.joinButton}>
                                Join ASRP
                            </Link>
                        </div>
                    </div>
                </div>
            </PageSection>

            {/* Education Catalog */}
            <PageSection id="catalog">
                <div className={styles.catalogSection}>
                    <div className={styles.catalogHeader}>
                        <span className={styles.catalogLabel}>Education catalog</span>
                        <h2>Explore learning areas</h2>
                        <p>
                            Browse resources across training, practice, and professional
                            development. Locked sections require login (member access).
                        </p>
                    </div>
                    <div className={styles.cardsGrid}>
                        {/* Educational Videos */}
                        <div className={styles.resourceCard}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardBadge}>Member-only</span>
                                <span className={styles.cardMeta}>Internal + External</span>
                            </div>
                            <h3>Educational Videos</h3>
                            <p>
                                Curated internal & external video content focused on diagnostic
                                practice and real-world lab workflows.
                            </p>
                            <Link href="/education/videos" className={styles.cardLink}>
                                Open →
                            </Link>
                        </div>

                        {/* Educational Modules */}
                        <div className={styles.resourceCard}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardBadge}>Member-only</span>
                                <span className={styles.cardMeta}>
                                    Surg path + Cyto + Heme + Mol
                                </span>
                            </div>
                            <h3>Educational Modules</h3>
                            <p>
                                Structured learning modules: objectives, key slides, self-checks,
                                and takeaways.
                            </p>
                            <Link href="/education/modules" className={styles.cardLink}>
                                Open →
                            </Link>
                        </div>

                        {/* Case of the Month */}
                        <div className={styles.resourceCard}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardBadgePublic}>Public</span>
                                <span className={styles.cardMeta}>Open for contributors</span>
                            </div>
                            <h3>Case of the Month</h3>
                            <p>
                                Interesting, challenging cases with high-quality images, key
                                differentials, and practical workup pearls.
                            </p>
                            <Link href="/education/case-of-month" className={styles.cardLink}>
                                Open →
                            </Link>
                        </div>

                        {/* Board-like Questions */}
                        <div className={styles.resourceCard}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardBadgePractice}>Practice</span>
                                <span className={styles.cardMeta}>Timed + Review mode</span>
                            </div>
                            <h3>Board-like Questions</h3>
                            <p>
                                High-yield practice questions organized by Anatomic Pathology (AP)
                                and Clinical Pathology (CP).
                            </p>
                            <Link href="/education/board-questions" className={styles.cardLink}>
                                Open →
                            </Link>
                        </div>

                        {/* Career & Leadership Development */}
                        <div className={styles.resourceCard}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardBadge}>Member-only</span>
                                <span className={styles.cardMeta}>Mentorship-ready</span>
                            </div>
                            <h3>Career & Leadership Development</h3>
                            <p>
                                Videos and guides on career strategy, communication, leadership
                                skills, and professional growth.
                            </p>
                            <Link href="/education/career-development" className={styles.cardLink}>
                                Open →
                            </Link>
                        </div>

                        {/* Resident / Fellow Resources */}
                        <div className={styles.resourceCard}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardBadge}>Member-only</span>
                                <span className={styles.cardMeta}>PGY guidance</span>
                            </div>
                            <h3>Resident / Fellow Resources</h3>
                            <p>
                                Guides and videos for trainees: rotations, sign-out habits,
                                evaluation success, and wellness.
                            </p>
                            <Link href="/education/resident-resources" className={styles.cardLink}>
                                Open →
                            </Link>
                        </div>

                        {/* Pathology Applicant Resources */}
                        <div className={styles.resourceCard}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardBadge}>Member-only</span>
                                <span className={styles.cardMeta}>Bilingual support</span>
                            </div>
                            <h3>Pathology Applicant Resources</h3>
                            <p>
                                Step-by-step resources for applicants: CV, interviews,
                                observerships, and U.S. pathway guidance.
                            </p>
                            <Link href="/education/applicant-resources" className={styles.cardLink}>
                                Open →
                            </Link>
                        </div>

                        {/* Wallhangers */}
                        <div className={styles.resourceCard}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardBadge}>Member-only</span>
                                <span className={styles.cardMeta}>PDF + A4/Letter</span>
                            </div>
                            <h3>Wallhangers</h3>
                            <p>
                                Printable quick-reference tools for daily sign-out and laboratory
                                workflows.
                            </p>
                            <Link href="/education/wallhangers" className={styles.cardLink}>
                                Open →
                            </Link>
                        </div>

                        {/* Miscellaneous */}
                        <div className={styles.resourceCard}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardBadge}>Member-only</span>
                                <span className={styles.cardMeta}>Curated links</span>
                            </div>
                            <h3>Miscellaneous</h3>
                            <p>
                                Practical guidance about life in the U.S., legal/immigration
                                recommendations, and helpful extras.
                            </p>
                            <Link href="/education/miscellaneous" className={styles.cardLink}>
                                Open →
                            </Link>
                        </div>
                    </div>
                </div>
            </PageSection>

            {/* Case of the Month Section */}
            <PageSection id="case-of-month">
                <div className={styles.caseOfMonthSection}>
                    <div className={styles.caseOfMonthHeader}>
                        <span className={styles.featuredLabel}>Featured series</span>
                        <h2>Case of the Month (Public)</h2>
                        <p>
                            Interesting, challenging cases with practical workup pearls—open to the
                            broader pathology community.
                        </p>
                    </div>
                    <div className={styles.caseOfMonthCard}>
                        <p>
                            The ASRP Case of the Month series highlights educational pathology cases
                            contributed by practicing pathologists, residents, and fellows from
                            across the Russian-speaking and international pathology community. Each
                            monthly case showcases key diagnostic features, practical workup
                            approaches, differential diagnoses, and relevant ancillary
                            studies—supported by high-quality digital images.
                        </p>
                        <p>
                            The series promotes active learning across all subspecialties, including
                            surgical pathology, cytopathology, hematopathology, molecular
                            diagnostics, and laboratory medicine. It is useful for trainees
                            preparing for board examinations and for practicing pathologists who
                            want to refresh or expand their diagnostic skills.
                        </p>
                        <div className={styles.caseOfMonthButtons}>
                            <Link
                                href="/education/case-of-month"
                                className={styles.viewCasesButton}
                            >
                                View cases
                            </Link>
                            <Link
                                href="mailto:admin@asrpath.org?subject=Case of the Month: Submission"
                                className={styles.submitCaseButton}
                            >
                                Submit a case
                            </Link>
                        </div>
                        <p className={styles.submissionNote}>
                            Want your case considered for publication? Email your draft to{" "}
                            <a href="mailto:admin@asrpath.org">admin@asrpath.org</a> and include{" "}
                            <strong>"Case of the Month: Submission"</strong> in the subject line.
                        </p>
                    </div>
                </div>
            </PageSection>

            {/* Educational Videos Section */}
            <PageSection id="videos">
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
                        {/* Internal Library */}
                        <div className={styles.libraryCard}>
                            <div className={styles.libraryCardHeader}>
                                {/* <span className={styles.libraryIcon}>🔒</span> */}
                                <span className={styles.libraryBadge}>Internal</span>
                            </div>
                            <h3>Internal Library</h3>
                            <p>
                                ASRP educational recordings, lectures, workshops, and
                                member-contributed teaching sessions.
                            </p>
                        </div>

                        {/* External Channels */}
                        <div className={styles.libraryCard}>
                            <div className={styles.libraryCardHeader}>
                                {/* <span className={styles.libraryIcon}>🔒</span> */}
                                <span className={styles.libraryBadgeExternal}>External</span>
                            </div>
                            <h3>External Channels</h3>
                            <p>Selected high-quality external resources.</p>
                        </div>

                        {/* Suggest */}
                        <div className={styles.libraryCard}>
                            <div className={styles.libraryCardHeader}>
                                {/* <span className={styles.libraryIcon}>✅</span> */}
                                <span className={styles.libraryBadgeSuggest}>Suggest</span>
                            </div>
                            <h3>Recommend a Resource</h3>
                            <p>
                                Members can propose external videos/channels to be reviewed and
                                added to the curated list.
                            </p>
                            <Link
                                href="/education/videos/suggest"
                                className={styles.libraryCardLink}
                            >
                                Send a suggestion →
                            </Link>
                        </div>
                    </div>
                </div>
            </PageSection>
        </div>
    )
}

export default Page
