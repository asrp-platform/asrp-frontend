import styles from "./ProfileHeaderSection.module.scss"

interface IProps {
    title: string
    subtitle: string
}

const ProfileHeaderSection = ({ title, subtitle }: IProps) => {
    return (
        <section className={styles.sectionHeader}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
        </section>
    )
}

export default ProfileHeaderSection
