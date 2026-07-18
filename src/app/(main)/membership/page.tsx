import styles from "@/app/(main)/membership/styles.module.scss"
import MembershipTypesCards from "@/app/(main)/membership/(ui)/MembershipTypesCards.tsx"
import PageTitleCard from "@/shared/ui/PageTitleCard/PageTitleCard.tsx"
import PageSection from "@/shared/ui/PageSection/PageSection.tsx"
import Link from "next/link"

const MembershipPage = () => {
    return (
        <div className={styles.page} id="top">
            <div className={styles.pageContainer}>
                <PageTitleCard
                    title={
                        <h1 className={styles.heroTitle}>
                            Membership in the American Society
                            <br />
                            of Russian-Speaking Pathologists (ASRP)
                        </h1>
                    }
                    className={styles.hero}
                    content="By becoming a member, you connect with colleagues who share similar
                             educational, cultural, and language backgrounds and who understand the
                             unique challenges you face. Joining our community means having a supportive
                             space where you can grow professionally at every stage of your training and
                             career."
                    contentClassName={styles.heroText}
                />

                {/* Why join */}
                <PageSection className={styles.whySection}>
                    <div className={styles.whyGrid}>
                        <div className={styles.whyTextBlock}>
                            <h2>Why become a member?</h2>
                            <p>
                                By joining ASRP, you become part of a community that supports your
                                development as a pathologist, trainee, or aspiring physician in the
                                United States. Membership helps you maintain a supportive
                                environment while growing professionally, no matter where you are in
                                your training and career.
                            </p>
                            <ul>
                                <li>
                                    Connect with peers who understand the realities of your work
                                </li>
                                <li>Build a reliable professional support system</li>
                                <li>Develop long-term professional and mentoring relationships</li>
                                <li>Find community and stability during uncertain times</li>
                                <li>Advance your career and professional growth</li>
                                <li>Access educational resources and learning opportunities</li>
                            </ul>
                        </div>

                        <div className={styles.joinCard}>
                            <h3>Ready to join ASRP?</h3>
                            <p>
                                Choose the membership category that best reflects your current
                                professional status and complete a brief online form to become part
                                of our community.
                            </p>
                            <Link href="/membership/become-member" className={styles.primaryLink}>
                                Fill out membership form
                            </Link>
                            <p className={styles.determinedInfo}>
                                Membership dues and categories are determined by the Society and
                                support educational, mentorship, and networking initiatives.
                            </p>
                        </div>
                    </div>
                </PageSection>

                <PageSection className={styles.ready}>
                    <h2 className={styles.readyTitle}>
                        Ready to shape the future <br className={styles.readyTitleDivider} />
                        of pathology together?
                    </h2>
                    <p className={styles.readyText}>
                        Help build a lasting home for Russian-speaking professionals. Join a network
                        committed to
                        <br className={styles.readyTextDivider} />
                        mentorship, advocacy, and research excellence.
                    </p>
                    <div className={styles.readyButtonsContainer}>
                        <Link href="/membership/become-member" className={styles.primaryLink}>
                            Become a Member
                        </Link>
                        <Link href="/login" className={styles.memberLoginLink}>
                            Member Login
                        </Link>
                        <Link href="#" className={styles.renewMembershipLink}>
                            Renew Membership
                        </Link>
                    </div>
                </PageSection>

                <section className={styles.categoriesSection}>
                    <h2 className={styles.centerCategoriesTitle}>Membership categories</h2>
                    <p className={styles.categoriesInfo}>
                        ASRP offers several membership categories to reflect different stages of
                        training and
                        <br className={styles.categoriesTextDivider} />
                        professional involvement, while supporting a shared mission and community.
                    </p>

                    <MembershipTypesCards />
                </section>
            </div>
        </div>
    )
}

export default MembershipPage
