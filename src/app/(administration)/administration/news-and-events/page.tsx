import NewsTable from "./NewsTable"

import styles from "./styles.module.scss"

const Page = () => (
    <section className={styles.page}>
        <header className={styles.header}>
            <div>
                <span className={styles.eyebrow}>Content management</span>
                <h1>News &amp; Events</h1>
                <p>Review publication status, find articles and open their public pages.</p>
            </div>
        </header>
        <NewsTable />
    </section>
)

export default Page
