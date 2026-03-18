"use client"

import { Result } from "antd"

interface Props {
    message?: string
}

const AccessDenied = ({ message }: Props) => {
    return (
        <Result
            status="403"
            title="403"
            subTitle={message || "You don't have permission to access this section"}
        />
    )
}

export default AccessDenied
