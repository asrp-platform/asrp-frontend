"use client"

import { type ReactNode } from "react"
import { Alert } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import styles from "./Warning.module.scss"

interface IProps {
    children: ReactNode
}

const Warning = ({ children }: IProps) => {
    return (
        <div className={styles.container}>
            <Alert
                icon={<ExclamationCircleOutlined />}
                title="Authentication required"
                description={children}
                type="warning"
                showIcon
                className={styles.alert}
            />
        </div>
    )
}

export default Warning
