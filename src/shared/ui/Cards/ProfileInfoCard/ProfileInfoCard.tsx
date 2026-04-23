"use client"

import styles from "./ProfileInfoCard.module.scss"

interface IProps {
    children?: React.ReactNode
}

const ProfileInfoCard = ({ children }: IProps) => {
    return <div className={styles.card}>{children}</div>
}

export default ProfileInfoCard
