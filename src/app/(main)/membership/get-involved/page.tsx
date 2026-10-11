import PageHero from "@widgets/PageHero/PageHero"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import styles from "@/app/(main)/membership/get-involved/styles.module.scss"
import GetInvolvedForm from "@/features/GetInvolvedForm/GetInvolvedForm.tsx"
import PageSection from "@/shared/ui/PageSection/PageSection.tsx"
import clsx from "clsx"

export default function GetInvolvedPage() {
    return (
        <div className={styles.pageContainer} id="top">
            <div className={styles.hero}>
                <PageHero
                    subTitle="GET INVOLVED"
                    pageTitle="Help shape the future of ASRP"
                    contentMaxWidth={880}
                >
                    <span className={styles.heroParagraph}>
                        ASRP is at the very beginning of its journey. We are building a welcoming
                        space where Russian-speaking pathologists, trainees, and pathology aspirants
                        across the United States can connect, learn, and grow together. At this
                        stage, every idea and every volunteer effort directly shapes who we become
                        as a society.
                    </span>
                    <span className={styles.heroParagraph}>
                        You do not need a formal title to make a meaningful contribution. If you
                        have a vision for an educational program, a passion for mentorship, a talent
                        for organizing events, or simply a desire to help this community grow – we
                        would be honored to hear from you.
                    </span>
                </PageHero>
                <Link href="#volunteer-form" className={styles.heroLink}>
                    Share your ideas <ArrowDown size={16} aria-hidden="true" />
                </Link>
            </div>

            <PageSection className={clsx(styles.section, styles.infoSection)}>
                <div className={styles.infoText}>
                    <h2>Help us build the founding chapter of ASRP</h2>
                    <p>
                        As a newly established not-for-profit organization, ASRP is still defining
                        its programs, structure, and priorities. This is a unique moment to be part
                        of the foundation – to shape our culture, our initiatives, and the support
                        we provide to pathologists and trainees.
                    </p>
                    <p>
                        We welcome both specific proposals and general interest in volunteering.
                        Whether you can dedicate a few hours a month or simply want to explore
                        possibilities, your involvement matters.
                    </p>
                </div>

                <div className={styles.infoCard}>
                    <h3>Ways you can contribute</h3>
                    <ul>
                        <li>Educational events, webinars, and case conferences</li>
                        <li>Mentorship and trainee support</li>
                        <li>Outreach, communications, and social media</li>
                        <li>Committees, working groups, and leadership pathways</li>
                    </ul>
                    <p className={styles.smallText}>
                        You can use the form below to send us your ideas or to simply let us know
                        that you would like to be involved. A member of our team will review your
                        message and reach out by email.
                    </p>
                </div>
            </PageSection>
            <PageSection id="volunteer-form" className={clsx(styles.section, styles.formSection)}>
                <GetInvolvedForm />
            </PageSection>
        </div>
    )
}
