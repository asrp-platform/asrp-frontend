import PageSection from "@shared/ui/PageSection/PageSection.tsx"
import styles from "@app/(main)/education/webinars/PageSection.module.scss"

interface IProps {
    subTitle: string
    pageTitle: string
    children: React.ReactNode | string
    contentMaxWidth?: number
}

const PageHero = ({ subTitle, pageTitle, children, contentMaxWidth }: IProps) => {
    return (
        <PageSection className={styles.titleSection}>
            <p className={styles.eyebrow}>{subTitle}</p>
            <h1>{pageTitle}</h1>
            <p style={{ maxWidth: contentMaxWidth }} className={styles.pageDescription}>
                {children}
            </p>
        </PageSection>
    )
}

export default PageHero
