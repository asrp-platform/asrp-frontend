import styles from "./styles.module.scss"
import MembershipInfoCard from "./ui/MembershipInfoCard.tsx"
import Image from "next/image"

const MembershipPage = () => {
    return (
        <div className={styles.page} id="top">
            <div className={styles.pageContainer}>
                <section className={styles.hero}>
                    <h1 className={styles.heroTitle}>
                        Membership in the American Society of Russian-Speaking
                        <br />
                        Pathologists (ASRP)
                    </h1>
                    <p className={styles.heroText}>
                        By becoming a member, you connect with colleagues who share similar
                        educational, cultural, and language backgrounds and who understand the
                        unique challenges you face. Joining our community means having a supportive
                        space where you can grow professionally at every stage of your training and
                        career.
                    </p>
                </section>

                {/* Why join */}
                <section className={styles.whySection}>
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
                            <button className={styles.primaryButton}>
                                Fill out membership form
                            </button>
                            <p className={styles.determinedInfo}>
                                Membership dues and categories are determined by the Society and
                                support educational, mentorship, and networking initiatives.
                            </p>
                        </div>
                    </div>
                </section>

                <section className={styles.ready}>
                    <h2 className={styles.readyTitle}>
                        Ready to shape the future <br />
                        of pathology together?
                    </h2>
                    <p className={styles.readyText}>
                        Help build a lasting home for Russian-speaking professionals. Join a network
                        committed to
                        <br />
                        mentorship, advocacy, and research excellence.
                    </p>
                    <div className={styles.readyButtonsContainer}>
                        <button className={styles.becomeMemberButton}>Become a Member</button>
                        <button className={styles.memberLoginButton}>Member Login</button>
                        <button className={styles.renewMembershipButton}>Renew Membership</button>
                    </div>
                </section>

                {/* Membership categories */}
                <section className={styles.categoriesSection}>
                    <h2 className={styles.centerCategoriesTitle}>Membership categories</h2>
                    <p className={styles.categoriesInfo}>
                        ASRP offers several membership categories to reflect different stages of
                        training and
                        <br />
                        professional involvement, while supporting a shared mission and community.
                    </p>

                    <div className={styles.cardsGrid}>
                        <MembershipInfoCard
                            title="Active Member"
                            info="Any legally qualified Russian-speaking specialist (MD, DO, MBBS, PhD, or equivalent) who is actively practicing pathology in the United States."
                            votingStatus="Voting Member"
                            votingColor="red"
                            subDescription="Ideal for: attending pathologists, practicing subspecialists, academic faculty, and community pathologists."
                            price={120}
                        />

                        <MembershipInfoCard
                            title="Trainee Member"
                            info="Russian-speaking residents or fellows in pathology or related disciplines training in the United States."
                            votingStatus="Voting member • Trainee"
                            votingColor="blue"
                            subDescription="Ideal for: residents, fellows, and other pathology trainees seeking mentorship, education, and networking."
                            price={60}
                        />

                        <MembershipInfoCard
                            title="Affiliate Member"
                            info="Russian-speaking pathologists, scientists, researchers, or allied professionals whose involvement is relevant and contributes meaningfully to the Society."
                            votingStatus="Non-voting"
                            votingColor="blue"
                            subDescription="Ideal for: PhD scientists, laboratory professionals, industry partners, researchers, and educators."
                            price={90}
                        />

                        <MembershipInfoCard
                            title="Affiliate Member"
                            info="Individuals recognized for exceptional service to the field of pathology or outstanding contributions to the Society."
                            votingStatus="Non-voting"
                            votingColor="blue"
                            subDescription="*This membership category is awarded by the Society and cannot be joined directly.*"
                            price={0}
                            renderButton={false}
                            icon={
                                <Image
                                    src="/icons/honorary.svg"
                                    alt="HonarayMember"
                                    width={12}
                                    height={12}
                                />
                            }
                        />

                        <MembershipInfoCard
                            title="Pathway Member"
                            info="Russian-speaking individuals pursuing or transitioning into a medical career in the United States, including medical students and internationally trained medical graduates seeking mentorship."
                            votingStatus="Non-voting • Pathway"
                            votingColor="blue"
                            subDescription="Ideal for: medical students, IMGs applying to U.S. pathology residencies, and those exploring pathology as a specialty."
                            price={30}
                        />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default MembershipPage
