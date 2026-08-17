import styles from "@app/(main)/education/webinars/PageSection.module.scss"
import NewsSection from "@app/(main)/news-and-events/(ui)/NewsSection/NewsSection.tsx"

const Page = () => {
    return (
        <div className={styles.pageContainer}>
            <NewsSection />
        </div>
    )
}

export default Page
