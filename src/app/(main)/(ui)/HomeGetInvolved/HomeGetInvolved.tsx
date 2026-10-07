import Link from "next/link"
import { UserPlus, HeartHandshake, Heart } from "lucide-react"
import styles from "./HomeGetInvolved.module.scss"

const HomeGetInvolved = () => (
    <section>
        <div className={styles.getInvolvedContainer}>
            <h2>Get involved</h2>
            <p>
                ASRP is powered by volunteers and supporters. Whether you have time, expertise, or
                resources to share, there's a role for you.
            </p>
            <div className={styles.getInvolvedCardContainer}>
                <div className={styles.getInvolvedCard}>
                    <UserPlus className={styles.cardIcon} size={22} aria-hidden="true" />
                    <h3>Become a member</h3>
                    <p>
                        Join our mailing list to receive updates and be recognized as a founding
                        member.
                    </p>
                    <Link href="/membership/become-member" className={styles.membershipFormLink}>
                        Membership form
                    </Link>
                </div>
                <div className={styles.getInvolvedCard}>
                    <HeartHandshake className={styles.cardIcon} size={22} aria-hidden="true" />
                    <h3>Volunteer or mentor</h3>
                    <p>
                        Help with mentorship matching, educational programming, communications, or
                        technology.
                    </p>
                    <Link href="/membership/get-involved" className={styles.helpLink}>
                        I'd like to help
                    </Link>
                </div>
                <div className={styles.getInvolvedCard}>
                    <Heart className={styles.cardIcon} size={22} aria-hidden="true" />
                    <h3>Donations & sponsorship</h3>
                    <p>
                        Support program development and outreach through individual gifts or
                        institutional sponsorships.
                    </p>
                    <Link href="/donations-and-sponsorship" className={styles.donationsLink}>
                        Explore options
                    </Link>
                </div>
            </div>
        </div>
    </section>
)

export default HomeGetInvolved
