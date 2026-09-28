import { PlusOutlined } from "@ant-design/icons"
import { Button, Card } from "antd"
import type { CaseOfTheMonth } from "@entities/CaseOfTheMonth.ts"

import CasesTable from "../CasesTable/CasesTable.tsx"
import styles from "../../CaseOfTheMonth.module.scss"

interface IProps {
    data: CaseOfTheMonth[]
    page: number
    pageSize: number
    total: number
    ordering: string[]
    loading: boolean
    onCreateCase: () => void
    onPageChange: (page: number) => void
    onOrderingChange: (ordering: string[]) => void
    onEditCase: (caseItem: CaseOfTheMonth) => void
}

const CasesCard = ({
    data,
    page,
    pageSize,
    total,
    ordering,
    loading,
    onCreateCase,
    onPageChange,
    onOrderingChange,
    onEditCase,
}: IProps) => (
    <Card
        className={styles.casesCard}
        title="Cases"
        extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={onCreateCase}>
                Add case
            </Button>
        }
    >
        <CasesTable
            data={data}
            page={page}
            pageSize={pageSize}
            total={total}
            ordering={ordering}
            loading={loading}
            onPageChange={onPageChange}
            onOrderingChange={onOrderingChange}
            onEdit={onEditCase}
        />
    </Card>
)

export default CasesCard
