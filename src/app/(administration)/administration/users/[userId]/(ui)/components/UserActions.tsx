"use client"

import { Alert, Button, Input, Modal, Space, message } from "antd"
import { useMemo, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import api from "@/axios.ts"
import type { IUser } from "@entities/User.ts"
import { getUserBanAdminUrl } from "@shared/backend/restApiUrls/admin/adminApiUrls.ts"
import { handleStatusError } from "@shared/helpers/handleStatusError.ts"
import { useCurrentUserPermissionsQuery } from "@shared/backend/queries/usePermissionsQuery.ts"

interface IProps {
    user: IUser
}

const UserActions = ({ user }: IProps) => {
    const queryClient = useQueryClient()
    const [isBanModalOpen, setIsBanModalOpen] = useState(false)
    const [banReason, setBanReason] = useState("")
    const { data: permissions = [] } = useCurrentUserPermissionsQuery()

    const permissionsActions = useMemo(() => {
        return permissions.map((permission) => permission.action)
    }, [permissions])

    const canUpdateUser = permissionsActions.includes("admin.update")

    const banMutation = useMutation({
        mutationFn: async () => {
            await api.patch(getUserBanAdminUrl(user.id), {
                ban_reason: banReason.trim(),
            })
        },
        onSuccess: () => {
            message.success("User banned")
            setIsBanModalOpen(false)
            setBanReason("")
            queryClient.invalidateQueries({ queryKey: ["users", String(user.id)] })
            queryClient.invalidateQueries({ queryKey: ["users", user.id] })
        },
        onError: (error) => handleStatusError(error),
    })

    const unbanMutation = useMutation({
        mutationFn: async () => {
            await api.delete(getUserBanAdminUrl(user.id))
        },
        onSuccess: () => {
            message.success("User unbanned")
            queryClient.invalidateQueries({ queryKey: ["users", String(user.id)] })
            queryClient.invalidateQueries({ queryKey: ["users", user.id] })
        },
        onError: (error) => handleStatusError(error),
    })

    const handleBanUser = () => {
        setIsBanModalOpen(true)
    }

    const handleUnbanUser = () => {
        Modal.confirm({
            title: "Unban user?",
            content: (
                <Alert
                    type="warning"
                    showIcon
                    message="This will restore access to the user's account."
                    description="Make sure the ban should be removed before confirming this action."
                />
            ),
            okText: "Unban user",
            cancelText: "Cancel",
            okButtonProps: {
                loading: unbanMutation.isPending,
            },
            onOk: () => unbanMutation.mutate(),
        })
    }

    if (!canUpdateUser) {
        return null
    }

    const isBanned = Boolean(user.banned)
    const isSubmitting = banMutation.isPending || unbanMutation.isPending

    return (
        <Space>
            {isBanned ? (
                <Button onClick={handleUnbanUser} loading={unbanMutation.isPending}>
                    Unban user
                </Button>
            ) : (
                <Button onClick={handleBanUser} loading={banMutation.isPending} danger>
                    Ban user
                </Button>
            )}

            <Modal
                title="Ban user?"
                open={isBanModalOpen}
                okText="Ban user"
                cancelText="Cancel"
                okButtonProps={{
                    danger: true,
                    loading: banMutation.isPending,
                    disabled: !banReason.trim(),
                }}
                cancelButtonProps={{
                    disabled: isSubmitting,
                }}
                onOk={() => banMutation.mutate()}
                onCancel={() => setIsBanModalOpen(false)}
            >
                <Alert
                    type="warning"
                    showIcon
                    message="This will block the user from accessing their account."
                />
                <Input.TextArea
                    value={banReason}
                    rows={4}
                    maxLength={500}
                    showCount
                    placeholder="Ban reason"
                    style={{ marginTop: 16 }}
                    onChange={(event) => setBanReason(event.target.value)}
                />
            </Modal>
        </Space>
    )
}

export default UserActions
