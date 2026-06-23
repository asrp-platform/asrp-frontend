"use client"

import { type ReactNode, useState } from "react"
import { message, Tag } from "antd"
import { isAxiosError } from "axios"
import api from "@/axios.ts"
import { getAdminUsersUrl } from "@shared/backend/restApiUrls/admin/adminApiUrls.ts"
import { PromoteToAdminModal } from "@app/(administration)/administration/users/(tabs)/ui/PromoteAdminRoleModal.tsx"

interface IProps {
    canAssignRole: boolean
    targetUserId: string | number
    role: "admin" | "member"
    onRoleChanged?: (_targetUserId: string | number, _isAdmin: boolean) => void
    children?: ReactNode
}

const RoleTag = ({ canAssignRole, targetUserId, role, onRoleChanged, children }: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const nextIsAdmin = role === "member"

    const _handleClick = () => {
        setIsModalOpen(true)
    }

    const handleConfirm = async () => {
        try {
            setConfirmLoading(true)
            await api.patch(getAdminUsersUrl(targetUserId), { admin: nextIsAdmin })
            onRoleChanged?.(targetUserId, nextIsAdmin)
            setIsModalOpen(false)
            message.success(
                nextIsAdmin ? "Administrator role assigned" : "Administrator role removed",
            )
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error)
            }
            message.error("Failed to update administrator role")
        } finally {
            setConfirmLoading(false)
        }
    }

    const styles = canAssignRole ? { cursor: "pointer" } : {}
    const handleClick = canAssignRole ? _handleClick : undefined

    return (
        <>
            <Tag style={styles} onClick={handleClick} color={role === "admin" ? "volcano" : "blue"}>
                {children}
            </Tag>
            <PromoteToAdminModal
                open={isModalOpen}
                action={nextIsAdmin ? "assign" : "remove"}
                onConfirm={handleConfirm}
                onCancel={() => setIsModalOpen(false)}
                confirmLoading={confirmLoading}
            />
        </>
    )
}

export default RoleTag
