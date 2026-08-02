import PageSection from "@/shared/ui/PageSection/PageSection"

import styles from "./UpcomingWebinarsSkeleton.module.scss"

const UpcomingWebinarsSkeleton = () => (
    <PageSection className={styles.section}>
        <span className={styles.screenReaderText} role="status">
            Loading upcoming webinars
        </span>
        <div className={styles.header}>
            <div className={styles.headerText}>
                <span className={styles.title} />
                <span className={styles.description} />
            </div>
            <span className={styles.badge} />
        </div>

        <div className={styles.featuredCard}>
            <div className={styles.featuredVisual} />
            <div className={styles.featuredContent}>
                <span className={styles.label} />
                <span className={styles.featuredTitle} />
                <span className={styles.meta} />
                <span className={styles.metaShort} />
                <span className={styles.divider} />
                <span className={styles.text} />
                <span className={styles.textShort} />
                <span className={styles.button} />
            </div>
        </div>

        <div className={styles.cards}>
            {Array.from({ length: 2 }, (_, index) => (
                <div className={styles.card} key={index}>
                    <span className={styles.cardTopline} />
                    <span className={styles.cardTitle} />
                    <span className={styles.cardText} />
                    <span className={styles.cardMeta} />
                    <span className={styles.cardButton} />
                </div>
            ))}
        </div>
    </PageSection>
)

export default UpcomingWebinarsSkeleton
