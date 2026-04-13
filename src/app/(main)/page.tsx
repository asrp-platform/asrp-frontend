import styles from "./styles.module.scss"

import ContactForm from "../../features/ContactForm/ContactForm.tsx"
import Link from "next/link"
import GuidesListCard from "./(ui)/GuidesListCard/GuidesListCard.tsx"

const MainPage = async () => {
    return (
        <main>
            <div className={styles.homePageContainer}>
                <section>
                    <div className={styles.mainTitleContainer}>
                        <h1>A professional home for Russian-speaking pathologists in the U.S.</h1>
                        <h2>OUR MISSION</h2>
                        <p>
                            To create and support a platform for a professional community for
                            Russian-speaking pathologists in the United States. Join our members in
                            building a network dedicated to mentorship, education, and collaborative
                            excellence.
                        </p>
                        <div className={styles.mainTitleButtonContainer}>
                            <Link
                                href="/membership/become-member"
                                className={styles.becomeMemberButton}
                            >
                                Become a member
                            </Link>
                            <Link href="/about" className={styles.learnMoreButton}>
                                Learn more
                            </Link>
                        </div>
                    </div>
                </section>
                <section>
                    <div className={styles.memberOutcomesContainer}>
                        <div className={styles.memberOutcomesInfoContainer}>
                            <h2>Member outcomes</h2>
                            <h3>Support that meets you at every stage</h3>
                            <p>
                                Whether you are stepping into training, advancing subspecialty
                                skills, or leading a laboratory, ASRP programs provide the structure
                                and community to thrive.
                            </p>
                        </div>
                        <div className={styles.memberOutcomesCardContainer}>
                            <div className={styles.memberOutcomesCard}>
                                <h4>Professional development</h4>
                                <p>
                                    Advance your experience with workshops, certification support,
                                    and faculty-led discussions.
                                </p>
                            </div>
                            <div className={styles.memberOutcomesCard}>
                                <h4>Networking & Mentorship</h4>
                                <p>
                                    Build meaningful relationships through curated mentorship
                                    circles and peer forums.
                                </p>
                            </div>
                            <div className={styles.memberOutcomesCard}>
                                <h4>Educational Resources</h4>
                                <p>
                                    Access webinars, case libraries, and bilingual learning
                                    materials from leading experts.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className={styles.visionContainer}>
                        <div className={styles.visionInnerContainer}>
                            <div className={styles.visionInfoContainer}>
                                <h2>Our vision</h2>
                                <h3>
                                    Creating a professional home for Russian-speaking pathologists
                                </h3>
                                <p>
                                    As a 501(c)(3) nonprofit, ASRP is building a trusted hub where
                                    language and culture amplify professional excellence. We
                                    champion continuous learning, mentorship across generations, and
                                    collaborative leadership in pathology.
                                    <br />
                                    <br />
                                    Your participation helps establish the practices, educational
                                    pathways, and advocacy efforts that will serve future clinicians
                                    and scientists.
                                </p>
                            </div>
                            <GuidesListCard />
                        </div>
                    </div>
                </section>
                <section>
                    <div className={styles.programsContainer}>
                        <h3>Programs and opportunities</h3>
                        <p>
                            Our activities mirror larger pathology associations while focusing on
                            the needs of Russian-speaking colleagues.
                        </p>
                        <div className={styles.programsCardContainer}>
                            <div className={styles.programCard}>
                                <h4>Mentorship circles</h4>
                                <p>
                                    Structured pairings and small groups connecting trainees and
                                    early-career pathologists with experienced mentors.
                                </p>
                            </div>
                            <div className={styles.programCard}>
                                <h4>Case-based education</h4>
                                <p>
                                    Virtual case conferences, journal clubs, and
                                    subspecialty-focused sessions with bilingual-friendly
                                    discussion.
                                </p>
                            </div>
                            <div className={styles.programCard}>
                                <h4>Community & networking</h4>
                                <p>
                                    Online spaces and in-person meetups at national meetings for
                                    informal support and collaboration.
                                </p>
                            </div>
                            <div className={styles.programCard}>
                                <h4>Support for trainees & IMGs</h4>
                                <p>
                                    Peer advice on exams, applications, visas, and adapting to
                                    practice and life in the United States.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className={styles.getInvolvedContainer}>
                        <h3>Get involved</h3>
                        <p>
                            ASRP is powered by volunteers and supporters. Whether you have time,
                            expertise, or resources to share, there's a role for you.
                        </p>
                        <div className={styles.getInvolvedCardContainer}>
                            <div className={styles.getInvolvedCard}>
                                <h4>Become a member</h4>
                                <p>
                                    Join our mailing list to receive updates and be recognized as a
                                    founding member.
                                </p>
                                <Link
                                    href="/membership/become-member"
                                    className={styles.membershipFormLink}
                                >
                                    Membership form
                                </Link>
                            </div>
                            <div className={styles.getInvolvedCard}>
                                <h4>Volunteer or mentor</h4>
                                <p>
                                    Help with mentorship matching, educational programming,
                                    communications, or technology.
                                </p>
                                <Link href="/membership/get-involved" className={styles.helpLink}>
                                    I'd like to help
                                </Link>
                            </div>
                            <div className={styles.getInvolvedCard}>
                                <h4>Donations & sponsorship</h4>
                                <p>
                                    Support program development and outreach through individual
                                    gifts or institutional sponsorships.
                                </p>
                                <Link
                                    href="/donations-and-sponsorship"
                                    className={styles.donationsLink}
                                >
                                    Explore options
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className={styles.connectContainer}>
                        <div className={styles.connectInfoContainer}>
                            <h2>Connect with us</h2>
                            <h3>Have a question or want to collaborate?</h3>
                            <p>
                                Share your ideas for programming, sponsorship, or partnership
                                opportunities. We will follow up with next steps.
                            </p>
                        </div>
                        <div className={styles.connectForm}>
                            <ContactForm />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default MainPage
