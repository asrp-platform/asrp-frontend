import styles from "@app/(main)/education/webinars/PageSection.module.scss"
import NewsAndEventsHero from "@app/(main)/news-and-events/(ui)/NewsAndEventsHero/NewsAndEventsHero.tsx"
import CreateNews from "@app/(main)/news-and-events/(ui)/CreateNews/CreateNews.tsx"

const Page = () => {
    return (
        <div className={styles.pageContainer}>
            <NewsAndEventsHero />
            <CreateNews />
        </div>
    )
}

export default Page
