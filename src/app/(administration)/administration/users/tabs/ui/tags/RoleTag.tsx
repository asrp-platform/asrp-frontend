"use client"

import { type ReactNode, useState } from "react"
import { Tag } from "antd"
import { PromoteToAdminModal } from "../PromoteAdminRoleModal.tsx"
import { isAxiosError } from "axios"
import api from "../../../../../../../axios.ts"
import { getStuffUsersUrl } from "../../../../../../../shared/backend/rest-api-urls/admin/adminApiUrls.ts"

interface IProps {
    canAssignRole: boolean
    targetUserId: string | number
    role: "admin" | "member"
    children?: ReactNode
}

const RoleTag = ({ canAssignRole, targetUserId, role, children }: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const _handleClick = () => {
        setIsModalOpen(true)
    }

    const handleConfirm = async () => {
        try {
            setConfirmLoading(true)
            await api.patch(getStuffUsersUrl(targetUserId), { stuff: role === "admin" })
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error)
            }
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
                action={role === "member" ? "assign" : "remove"}
                onConfirm={handleConfirm}
                onCancel={() => setIsModalOpen(false)}
                confirmLoading={confirmLoading}
            />
        </>
    )
}

export default RoleTag
