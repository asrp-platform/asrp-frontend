import { useState } from "react"
import { Alert, Button, Input, Modal } from "antd"

import styles from "./ActionsCell.module.scss"
import { MembershipRequestStatusEnum } from "@entities/Membership.ts"
import api from "@/axios.ts"
import { MEMBERSHIP_REQUESTS_ADMIN_URL } from "@shared/backend/rest-api-urls/admin/membershipsAdminUrls.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type UpdateMembershipRequestPayload = {
    requestId: number | string
    status: MembershipRequestStatusEnum.APPROVED | MembershipRequestStatusEnum.REJECTED
    adminComment?: string
}

const updateMembershipRequest = async ({
    requestId,
    status,
    adminComment,
}: UpdateMembershipRequestPayload) => {
    const response = await api.patch(`${MEMBERSHIP_REQUESTS_ADMIN_URL}/${requestId}`, {
        status,
        admin_comment: adminComment,
    })

    return response.data
}

interface IProps {
    membershipRequestId: number | string
}

const ActionsCell = ({ membershipRequestId }: IProps) => {
    const queryClient = useQueryClient()
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const [adminComment, setAdminComment] = useState("")

    const mutation = useMutation({
        mutationFn: updateMembershipRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["membership"],
            })
            setIsRejectModalOpen(false)
            setAdminComment("")
        },
    })

    const handleApprove = () => {
        Modal.confirm({
            title: "Approve membership request?",
            content:
                "This action will approve the membership request and notify the system that the request has been reviewed.",
            okText: "Approve",
            cancelText: "Cancel",
            onOk: () => {
                mutation.mutate({
                    status: MembershipRequestStatusEnum.APPROVED,
                    requestId: membershipRequestId,
                })
            },
        })
    }

    const handleReject = () => {
        setIsRejectModalOpen(true)
    }

    const handleRejectConfirm = () => {
        mutation.mutate({
            status: MembershipRequestStatusEnum.REJECTED,
            requestId: membershipRequestId,
            adminComment: adminComment.trim(),
        })
    }

    return (
        <div className={styles.actionsCellContainer}>
            <Button
                color={"green"}
                variant={"filled"}
                loading={mutation.isPending}
                disabled={mutation.isPending}
                onClick={handleApprove}
            >
                Approve
            </Button>
            <Button
                color={"red"}
                variant={"filled"}
                loading={mutation.isPending}
                disabled={mutation.isPending}
                onClick={handleReject}
            >
                Reject
            </Button>

            <Modal
                title={"Reject membership request?"}
                open={isRejectModalOpen}
                okText={"Reject"}
                cancelText={"Cancel"}
                okButtonProps={{
                    danger: true,
                    loading: mutation.isPending,
                    disabled: !adminComment.trim(),
                }}
                onOk={handleRejectConfirm}
                onCancel={() => setIsRejectModalOpen(false)}
            >
                <Alert
                    type={"warning"}
                    showIcon
                    message={"The request will be rejected."}
                    description={"Add an admin comment so the applicant can understand the reason."}
                />
                <Input.TextArea
                    value={adminComment}
                    rows={4}
                    maxLength={500}
                    showCount
                    placeholder={"Admin comment"}
                    onChange={(event) => setAdminComment(event.target.value)}
                    className={styles.adminCommentTextarea}
                />
            </Modal>
        </div>
    )
}

export default ActionsCell
