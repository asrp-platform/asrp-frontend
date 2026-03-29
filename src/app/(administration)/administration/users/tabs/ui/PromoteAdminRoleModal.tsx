"use client"

import { Modal, Typography } from "antd"

const { Text, Paragraph } = Typography

type PromoteToAdminModalProps = {
    open: boolean
    action: "assign" | "remove"
    onConfirm: () => void
    onCancel: () => void
    confirmLoading?: boolean
}

export const PromoteToAdminModal = ({
    open,
    action,
    onConfirm,
    onCancel,
    confirmLoading = false,
}: PromoteToAdminModalProps) => {
    const isAssignAction = action === "assign"

    return (
        <Modal
            open={open}
            title={isAssignAction ? "Assign Administrator Role" : "Remove Administrator Role"}
            onOk={onConfirm}
            onCancel={onCancel}
            okText={isAssignAction ? "Assign Admin Role" : "Remove Admin Role"}
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
            confirmLoading={confirmLoading}
            centered
        >
            <Paragraph>
                {isAssignAction ? (
                    <>
                        You are about to grant this user the <Text strong>Site Administrator</Text>{" "}
                        role.
                    </>
                ) : (
                    <>
                        You are about to remove the <Text strong>Site Administrator</Text> role from
                        this user.
                    </>
                )}
            </Paragraph>

            <Paragraph>
                {isAssignAction ? (
                    <>
                        This action will grant elevated permissions, including access to sensitive
                        administrative features and site management functions.
                    </>
                ) : (
                    <>
                        This action will revoke elevated permissions and remove access to sensitive
                        administrative features and site management functions.
                    </>
                )}
            </Paragraph>

            <Paragraph>
                <Text strong>
                    {isAssignAction
                        ? "Only continue if you are sure this user should have full administrative access."
                        : "Only continue if you are sure this user should no longer have administrative access."}
                </Text>
            </Paragraph>

            <Paragraph type="danger" style={{ marginBottom: 0 }}>
                {isAssignAction
                    ? "Warning: Administrators can manage users, modify critical settings, and perform actions that may affect the entire website."
                    : "Warning: Removing this role will immediately restrict this user's administrative permissions and access to protected site management features."}
            </Paragraph>
        </Modal>
    )
}
