import { Card, Empty } from "antd"

import styles from "../../CaseOfTheMonth.module.scss"

const CasesCard = () => (
    <Card className={styles.casesCard} title="Cases">
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="The cases table will be added here."
        />
    </Card>
)

export default CasesCard
