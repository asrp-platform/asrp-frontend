import ComingSoon from "@/widgets/ComingSoon/ComingSoon.tsx"

const Page = () => {
    return (
        <div className={styles.pageContainer}>
            <section>
                <div className={styles.mainHeadingContainer}>
                    <h1>Partner with ASRP to support education, mentorship, and community</h1>
                    <p>
                        ASRP connects Russian-speaking pathologists, trainees, and laboratory
                        professionals through high-quality education and mentorship. Your support
                        helps us build accessible programming while giving partners a
                        mission-aligned way to engage a focused professional audience.
                    </p>
                    <div>
                        <button>Individual Donors</button>
                        <button>Corporate Sponsors</button>
                    </div>
                    <p>
                        ASRP maintains independence over educational content. Support does not imply
                        endorsement of any product, service, or clinical approach.
                    </p>
                    <div>
                        <h2>Our Sponsors</h2>
                        <ul>
                            <li>logo</li>
                        </ul>
                        <p>Logo slots are reserved for current sponsors.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page
