"use client"

import { Button, Modal, Space } from "antd"

const UserActions = () => {
    const handleBanUser = () => {
        Modal.confirm({
            title: "Ban user?",
            content:
                "This will block the user from accessing their account. You can restore access later if needed.",
            okText: "Ban user",
            cancelText: "Cancel",
            okButtonProps: {
                danger: true,
            },
            onOk: () => {
                alert("Not implemented yet")
            },
        })
    }

    return (
        <Space>
            <Button onClick={handleBanUser} danger>
                Ban user
            </Button>
        </Space>
    )
}

export default UserActions
