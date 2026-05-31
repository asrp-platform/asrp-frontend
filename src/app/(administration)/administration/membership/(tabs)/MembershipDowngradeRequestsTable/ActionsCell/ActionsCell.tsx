import { useState } from "react"
import { Alert, Button, Input, Modal, message } from "antd"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { usePermissions } from "@/context/PermissionsProvider.tsx"

import api from "@/axios.ts"
import { getMembershipDowngradeRequestByIdUrl } from "@shared/backend/restApiUrls/admin/membershipsAdminUrls.ts"

import styles from "./ActionsCell.module.scss"

type ReviewMembershipTypeChangeRequestPayload = {
    requestId: number | string
    action: "approve" | "reject"
    adminComment?: string
}

const reviewMembershipTypeChangeRequest = async ({
    requestId,
    action,
    adminComment,
}: ReviewMembershipTypeChangeRequestPayload) => {
    const response = await api.patch(getMembershipDowngradeRequestByIdUrl(requestId), {
        action,
        admin_comment: adminComment,
    })

    return response.data
}

interface IProps {
    requestId: number | string
}

const ActionsCell = ({ requestId }: IProps) => {
    const queryClient = useQueryClient()
    const { permissions } = usePermissions()
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const [adminComment, setAdminComment] = useState("")

    const canUpdate = permissions.includes("memberships.update")

    const mutation = useMutation({
        mutationFn: reviewMembershipTypeChangeRequest,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["membership-downgrade-requests"],
            })
            setIsRejectModalOpen(false)
            setAdminComment("")
            message.success(
                variables.action === "approve"
                    ? "Membership type change request approved."
                    : "Membership type change request rejected.",
            )
        },
        onError: () => {
            message.error("Could not review membership type change request.")
        },
    })

    const handleApprove = () => {
        Modal.confirm({
            title: "Approve membership type change request?",
            content: "This action will approve the requested membership type change.",
            okText: "Approve",
            cancelText: "Cancel",
            onOk: () => {
                mutation.mutate({
                    requestId,
                    action: "approve",
                })
            },
        })
    }

    const handleRejectConfirm = () => {
        mutation.mutate({
            requestId,
            action: "reject",
            adminComment: adminComment.trim(),
        })
    }

    if (!canUpdate) {
        return null
    }

    return (
        <div className={styles.actionsCellContainer}>
            <Button
                color="green"
                variant="filled"
                loading={mutation.isPending}
                disabled={mutation.isPending}
                onClick={handleApprove}
            >
                Approve
            </Button>
            <Button
                color="red"
                variant="filled"
                loading={mutation.isPending}
                disabled={mutation.isPending}
                onClick={() => setIsRejectModalOpen(true)}
            >
                Reject
            </Button>

            <Modal
                title="Reject membership type change request?"
                open={isRejectModalOpen}
                okText="Reject"
                cancelText="Cancel"
                okButtonProps={{
                    danger: true,
                    loading: mutation.isPending,
                    disabled: !adminComment.trim(),
                }}
                onOk={handleRejectConfirm}
                onCancel={() => setIsRejectModalOpen(false)}
            >
                <Alert
                    type="warning"
                    showIcon
                    title="The request will be rejected."
                    description="Add an admin comment so the member can understand the reason."
                />
                <Input.TextArea
                    value={adminComment}
                    rows={4}
                    maxLength={500}
                    showCount
                    placeholder="Admin comment"
                    onChange={(event) => setAdminComment(event.target.value)}
                    className={styles.adminCommentTextarea}
                />
            </Modal>
        </div>
    )
}

export default ActionsCell
