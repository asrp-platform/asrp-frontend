"use client"

import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Alert } from "antd"
import type { ReactNode } from "react"

import styles from "./Warning.module.scss"

interface IProps {
    children: ReactNode
}

const Warning = ({ children }: IProps) => (
    <div className={styles.container}>
        <Alert
            icon={<ExclamationCircleOutlined />}
            title="Authentication required"
            description={<div className={styles.warningContent}>{children}</div>}
            type="warning"
            showIcon
            className={styles.alert}
        />
    </div>
)

export default Warning
