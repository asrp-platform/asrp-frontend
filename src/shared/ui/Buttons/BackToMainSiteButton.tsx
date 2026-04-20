"use client"

import Link from "next/link"
import { Button } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"

type BackToMainSiteButtonProps = {
    href?: string
    text?: string
}

const BackToMainSiteButton = ({
    href = "/",
    text = "Back to Main Site",
}: BackToMainSiteButtonProps) => {
    return (
        <Link href={href}>
            <Button type="primary" icon={<ArrowLeftOutlined />} size="large" disabled={false}>
                {text}
            </Button>
        </Link>
    )
}

export default BackToMainSiteButton
