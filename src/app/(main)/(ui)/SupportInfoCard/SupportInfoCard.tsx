import InfoCard from "../../../../shared/ui/InfoCard/InfoCard.tsx"
import { Typography } from "antd"

import styles from "./SupportInfoCard.module.scss"
import type { ReactNode } from "react"

const { Title, Paragraph } = Typography

interface IProps {
    icon: ReactNode
    title: string
    description: string
}

const SupportInfoCard = ({ icon, title, description }: IProps) => {
    const titleComponent = (
        <div>
            <div className={styles.iconContainer}>{icon}</div>
            <div className={styles.titleContainer}>
                <Title level={3}>{title}</Title>
            </div>
        </div>
    )

    const descriptionComponent = (
        <div>
            <Paragraph>{description}</Paragraph>
        </div>
    )

    return <InfoCard title={titleComponent} description={descriptionComponent} />
}

export default SupportInfoCard
