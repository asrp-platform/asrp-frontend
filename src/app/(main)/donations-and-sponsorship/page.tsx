import PageSection from "@/shared/ui/PageSection/PageSection"
import styles from "./styles.module.scss"
import DonationContactForm from "@/features/DonationContactForm/DonationContactForm"
import LinkButton from "@/shared/ui/Buttons/LinkButton"
import SponsorsList from "./(ui)/SponsorsList"

const Page = () => {
    return (
        <div className={styles.pageContainer}>
            <h1 className="visually-hidden">Donations and Sponsorship page</h1>

            {/* ── Hero ── */}
            <PageSection className={styles.heroSection}>
                <div className={styles.heroWrapper}>
                    <div>
                        <h2 className={styles.heroTitle}>Donations & Sponsorship</h2>
                        <h3 className={styles.heroSubtitle}>
                            Partner with ASRP to support education, mentorship, and community
                        </h3>
                        <p className={styles.heroDescription}>
                            ASRP connects Russian-speaking pathologists, trainees, and laboratory
                            professionals through high-quality education and mentorship. Your
                            support helps us build accessible programming while giving partners a
                            mission-aligned way to engage a focused professional audience.
                        </p>
                        <div className={styles.heroButtons}>
                            <LinkButton href="#individual_donors" variant="red">
                                Individual Donors
                            </LinkButton>
                            <LinkButton href="#corporate_sponsors" variant="default">
                                Corporate Sponsors
                            </LinkButton>
                        </div>
                        <p className={styles.heroDisclaimer}>
                            ASRP maintains independence over educational content. Support does not
                            imply endorsement of any product, service, or clinical approach.
                        </p>
                    </div>
                    <div className={styles.sponsorsSection}>
                        <h3 className={styles.sponsorsTitle}>Our Sponsors</h3>
                        <SponsorsList />
                    </div>
                </div>
            </PageSection>

            {/* ── Why give ── */}
            <PageSection className={styles.impactSection}>
                <div className={styles.sectionIntro}>
                    <h2 className={styles.sectionLabel}>Why give</h2>
                    <h3 className={styles.sectionHeading}>Early support has outsized impact</h3>
                    <p className={styles.sectionBody}>
                        Individual donations and early corporate support help us launch educational
                        sessions, build mentorship pathways, and keep resources accessible to
                        trainees and early-career colleagues.
                    </p>
                </div>
                <ul className={styles.cardGrid}>
                    {[
                        {
                            title: "Build core programs",
                            desc: "Support the practical work of launching webinars, case sessions, and mentorship circles.",
                        },
                        {
                            title: "Keep access affordable",
                            desc: "Help us minimize barriers for trainees, IMGs, and early-career members.",
                        },
                        {
                            title: "Strengthen community",
                            desc: "Create a professional home where language and culture support clinical excellence.",
                        },
                    ].map(({ title, desc }) => (
                        <li key={title} className={styles.card}>
                            <h3 className={styles.cardSubtitle}>{title}</h3>
                            <p className={styles.cardBody}>{desc}</p>
                        </li>
                    ))}
                </ul>
            </PageSection>

            {/* ── Individual donors ── */}
            <PageSection className={styles.donateSection}>
                <div className={styles.sectionIntro}>
                    <h2 className={styles.sectionLabel} id="individual_donors">
                        Individual donors
                    </h2>
                    <h3 className={styles.sectionHeading}>
                        Support ASRP through individual giving
                    </h3>
                    <p className={styles.sectionBody}>
                        Whether you give once or become a monthly supporter, your contribution helps
                        build education and mentorship for our community.
                    </p>
                    <ul className={styles.bulletList}>
                        <li className={styles.bulletItem}>Confirmation/receipt for your records</li>
                        <li className={styles.bulletItem}>
                            Optional donor acknowledgment (opt-in)
                        </li>
                        <li className={styles.bulletItem}>
                            Periodic impact updates (new webinars, mentorship circles, resources)
                        </li>
                    </ul>
                </div>

                <ul className={styles.cardGrid}>
                    {[
                        {
                            title: "Give once",
                            desc: "Support ASRP with a one-time donation—any amount helps build programming and community.",
                        },
                        {
                            title: "Become a monthly supporter",
                            desc: "Reliable monthly gifts help us plan webinars, mentorship activities, and community resources.",
                        },
                        {
                            title: "Support a focus area",
                            desc: "Direct support toward education, mentorship, bilingual access, or community communications.",
                        },
                    ].map(({ title, desc }) => (
                        <li key={title} className={styles.card}>
                            <h3 className={styles.cardSubtitle}>{title}</h3>
                            <p className={styles.cardBody}>{desc}</p>
                        </li>
                    ))}
                </ul>

                <div className={styles.cardElevated}>
                    <div className={styles.sectionIntro}>
                        <h3 className={styles.cardTitle}>Personal donations</h3>
                        <p className={styles.sectionBody}>
                            One-time gifts help us launch education, mentorship, bilingual access,
                            and community programming.
                        </p>
                    </div>
                    <ul className={styles.bulletList}>
                        <li className={styles.bulletItem}>
                            One-time personal donations at any level
                        </li>
                        <li className={styles.bulletItem}>
                            Optional acknowledgment (with your permission)
                        </li>
                        <li className={styles.bulletItem}>
                            Direct support of education, mentorship, access, and community programs
                        </li>
                    </ul>
                    <div className={styles.donateActionButton}>
                        <LinkButton href="#" variant="red">
                            Make a one-time donation
                        </LinkButton>
                        <span>Secure direct payment • Personal donations</span>
                    </div>
                </div>
            </PageSection>

            {/* ── Corporate sponsors ── */}
            <PageSection className={styles.corporateSection}>
                <div className={styles.sectionIntro}>
                    <h2 className={styles.sectionLabel} id="corporate_sponsors">
                        Corporate sponsors
                    </h2>
                    <h3 className={styles.sectionHeading}>Mission-aligned corporate support</h3>
                    <p className={styles.sectionBody}>
                        We keep sponsorship straightforward. Typical sponsor recognition includes a
                        logo + link on this page and agreed acknowledgments.
                    </p>
                    <ul className={styles.bulletList}>
                        <li className={styles.bulletItemGreen}>
                            Logo + link placement (hero sponsor strip + sponsor section)
                        </li>
                        <li className={styles.bulletItemGreen}>
                            Single point of contact for coordination
                        </li>
                        <li className={styles.bulletItemGreen}>
                            Mission-aligned visibility (education/mentorship support)
                        </li>
                    </ul>
                </div>

                <div className={styles.card} style={{ gap: 20, padding: 24 }}>
                    <div className={styles.corporateCardContentWrapper}>
                        <div className={styles.sectionIntro}>
                            <h3 className={styles.cardTitle}>Corporate sponsorship</h3>
                            <p className={styles.cardBody}>
                                Interested in supporting ASRP's education, mentorship, or community
                                programming? We'll propose a simple annual sponsorship level based
                                on your goals.
                            </p>
                        </div>
                        <LinkButton className={styles.corporateCardLink} href="#" variant="red">
                            Contact&nbsp;us
                        </LinkButton>
                    </div>
                    <ul className={styles.corporateOptionsList}>
                        {[
                            {
                                title: "Recognition",
                                desc: "Logo + link placement on this page (and other agreed acknowledgments). Recognition is acknowledgment only.",
                            },
                            {
                                title: "Alignment",
                                desc: "Support can align to education, mentorship, recruiting visibility, or a specific program—without influencing content.",
                            },
                        ].map(({ title, desc }) => (
                            <li key={title} className={styles.cardMuted}>
                                <h3 className={styles.cardSubtitle}>{title}</h3>
                                <p className={styles.cardBody}>{desc}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </PageSection>

            {/* ── FAQ ── */}
            <PageSection className={styles.faqSection}>
                <div className={styles.sectionIntro}>
                    <h2 className={styles.sectionLabel}>FAQ</h2>
                    <h3 className={styles.sectionHeading}>Common questions</h3>
                </div>
                <ul className={styles.faqList}>
                    {[
                        {
                            q: "Is my donation or sponsorship tax-deductible?",
                            a: "ASRP is a nonprofit organization. Tax treatment depends on your situation and the benefits received. Please consult your tax advisor; we can provide documentation upon request.",
                        },
                        {
                            q: "Do sponsors influence educational content?",
                            a: "No. ASRP maintains full control over educational content, faculty, and materials. Sponsor recognition is acknowledgment only.",
                        },
                        {
                            q: "Can our organization request a custom package?",
                            a: "Yes. If you have specific goals, we can tailor a simple package.",
                        },
                        {
                            q: "Do you share member contact information?",
                            a: "No. We do not sell or share member email lists.",
                        },
                    ].map(({ q, a }) => (
                        <li key={q} className={styles.card} style={{ gap: 8, padding: 24 }}>
                            <h3 className={styles.faqQuestion}>{q}</h3>
                            <p className={styles.faqAnswer}>{a}</p>
                        </li>
                    ))}
                </ul>
            </PageSection>

            {/* ── Contact ── */}
            <PageSection className={styles.contactSection}>
                <div className={styles.sectionIntro}>
                    <h2 className={styles.sectionLabel}>Contact</h2>
                    <h3 className={styles.sectionHeading}>
                        Donations, sponsorship, and partnership inquiries
                    </h3>
                    <p className={styles.sectionBody}>
                        Tell us what you're looking for (individual donation, corporate sponsorship,
                        or a custom idea) and we'll follow up.
                    </p>
                    <ul className={styles.contactList}>
                        <li className={styles.contactItem}>
                            <h4>Email</h4>
                            <p>admin@asrpath.org</p>
                        </li>
                        <li className={styles.contactItem}>
                            <h4>Typical response time</h4>
                            <p>We aim to respond within a few business days.</p>
                        </li>
                    </ul>
                </div>
                <DonationContactForm />
            </PageSection>
        </div>
    )
}

export default Page
