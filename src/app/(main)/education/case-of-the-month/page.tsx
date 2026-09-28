import styles from "./styles.module.scss"
import CaseOfTheMonthPage from "./CaseOfTheMonthPage.tsx"
import PageHero from "@widgets/PageHero/PageHero.tsx"

const Page = () => {
    return (
        <div className={styles.pageContainer}>
            <PageHero
                subTitle={"ASRP EDUCATION"}
                pageTitle={"Case of the Month"}
                contentMaxWidth={800}
            >
                Explore challenging pathology cases contributed by members of the ASRP community.
                Review the clinical presentation and findings, formulate your differential
                diagnosis, and reveal the final diagnosis and discussion.
            </PageHero>
            <CaseOfTheMonthPage />
        </div>
    )
}

export default Page
