import styles from "./styles.module.scss"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { BYLAWS_URL } from "../../../shared/backend/restApiUrls.ts"

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
    metadataBase: new URL("https://asrpath.org"),
    title: "About Us",
}

const Page = () => {
    return (
        <div className={styles.pageContainer}>
            <section>
                <div className={styles.headingCardContainer}>
                    <h1>About the American Society of Russian-Speaking Pathologists (ASRP)</h1>
                    <p>
                        The American Society of Russian-Speaking Pathologists (ASRP) is a
                        not-for-profit professional organization established in 2025 to create a
                        supportive environment fostering networking, collaboration, and professional
                        development. Our goal is to unite pathologists in the United States with
                        similar educational, cultural, and language backgrounds.
                    </p>
                </div>
            </section>
            <section>
                <div className={styles.sectionContainer}>
                    <div className={styles.missionContainer}>
                        <div className={styles.missionInfoContainer}>
                            <h2>Our Mission</h2>
                            <p>
                                ASRP strives to build a dynamic, welcoming, and academically rich
                                community for Russian-speaking pathologists, trainees, and pathology
                                aspirants across the United States. Through mentorship, scientific
                                collaboration, and educational events, we aim to promote
                                professional growth and integration within the broader pathology
                                community.
                            </p>
                            <p>
                                We envision ASRP as a platform that connects members through shared
                                values, mutual respect, and commitment to advancing pathology as a
                                discipline.
                            </p>
                        </div>
                        <div className={styles.initiativesContainer}>
                            <h3>Key initiatives</h3>
                            <ul>
                                <li>
                                    Unite most Russian-speaking pathologists across the United
                                    States
                                </li>
                                <li>Launch high-quality educational programs</li>
                                <li>Obtain the ability to offer CME credits</li>
                                <li>Achieve recognition as a USCAP Companion Society</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.linksContainer}>
                        <h2>Quick Links</h2>
                        {/* TODO: ссылка */}
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.byLawsLink}
                            href={BYLAWS_URL}
                        >
                            📄 View Our Bylaws
                        </Link>
                        <h3>Our Social Media:</h3>
                        <div className={styles.socialMediaContainer}>
                            <div className={styles.mediaLinkContainer}>
                                <Image
                                    src="/icons/footer/TelegramLogo.svg"
                                    alt="TelegramLogo"
                                    width={16}
                                    height={16}
                                />
                                <Link href="#">Telegram</Link>
                            </div>
                            <div className={styles.mediaLinkContainer}>
                                <Image
                                    src="/icons/footer/TwitterLogo.svg"
                                    alt="TelegramLogo"
                                    width={16}
                                    height={16}
                                />
                                <Link href="#">X</Link>
                            </div>
                            <div className={styles.mediaLinkContainer}>
                                <Image
                                    src="/icons/footer/FacebookLogo.svg"
                                    alt="TelegramLogo"
                                    width={16}
                                    height={16}
                                />
                                <Link href="#">Facebook</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page
