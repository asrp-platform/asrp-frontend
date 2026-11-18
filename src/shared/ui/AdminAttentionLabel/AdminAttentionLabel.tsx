import { Badge, Flex } from "antd"
import clsx from "clsx"
import type { ReactNode } from "react"

import styles from "./AdminAttentionLabel.module.scss"

interface IProps {
    count?: number
    tabMode?: boolean
    children: ReactNode
}

const AdminAttentionLabel = ({ children, count, tabMode = false }: IProps) => (
    <Flex justify={"space-between"} gap={tabMode ? 10 : 0}>
        {children}
        {count != null && count > 0 && (
            <Badge
                className={clsx(styles.badge, tabMode && styles.badgeTab)}
                count={count}
                overflowCount={99}
                title={`${count} requests need attention`}
            />
        )}
    </Flex>
)

export default AdminAttentionLabel
