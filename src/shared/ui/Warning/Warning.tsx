"use client"

import { type ReactNode } from "react"
import { Alert } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import styles from "./Warning.module.scss"

interface IProps {
    children: ReactNode
    action?: ReactNode
}

const Warning = ({ children, action }: IProps) => {
    return (
        <div className={styles.container}>
            <Alert
                icon={<ExclamationCircleOutlined />}
                title="Authentication required"
                description={children}
                type="warning"
                showIcon
                className={styles.alert}
                action={action}
            />
        </div>
    )
}

export default Warning
