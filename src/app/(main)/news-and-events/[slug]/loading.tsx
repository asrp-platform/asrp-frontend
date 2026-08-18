import styles from "./loading.module.scss"

const LoadingLine = ({ width = "100%" }: { width?: string }) => (
    <span className={styles.line} style={{ width }} />
)

const Loading = () => (
    <main className={styles.page} aria-label="Loading article" aria-busy="true">
        <span className={`${styles.line} ${styles.backLink}`} />
        <div className={styles.layout}>
            <aside className={styles.aside}>
                <LoadingLine width="55%" />
                <LoadingLine />
                <LoadingLine width="86%" />
                <LoadingLine width="72%" />
                <LoadingLine width="64%" />
            </aside>
            <article className={styles.article}>
                <div className={styles.header}>
                    <LoadingLine width="24%" />
                    <span className={styles.titleLine} />
                    <LoadingLine width="78%" />
                    <LoadingLine width="42%" />
                </div>
                <div className={styles.cover} />
                <div className={styles.body}>
                    {Array.from({ length: 8 }, (_, index) => (
                        <LoadingLine
                            key={index}
                            width={index === 3 ? "84%" : index === 7 ? "62%" : "100%"}
                        />
                    ))}
                </div>
            </article>
        </div>
    </main>
)

export default Loading
