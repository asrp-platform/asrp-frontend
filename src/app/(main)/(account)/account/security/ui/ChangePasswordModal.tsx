"use client"

import { Form, Input, message, Modal } from "antd"
import { LockKeyhole, ShieldCheck } from "lucide-react"
import { useState } from "react"

import api from "@/axios.ts"
import { CURRENT_USER_CHANGE_PASSWORD_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"
import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"

import styles from "./ChangePasswordModal.module.scss"

interface Props {
    open: boolean
    onClose: () => void
}

interface ChangePasswordPayload {
    old_password: string
    new_password: string
    confirm_new_password: string
}

const ChangePasswordModal = ({ open, onClose }: Props) => {
    const [form] = Form.useForm<ChangePasswordPayload>()
    const [isLoading, setIsLoading] = useState(false)

    const handleClose = () => {
        if (isLoading) return

        form.resetFields()
        onClose()
    }

    const handleSubmit = async (values: ChangePasswordPayload) => {
        try {
            setIsLoading(true)
            await api.post(CURRENT_USER_CHANGE_PASSWORD_URL, values)

            message.success("Password changed successfully")
            form.resetFields()
            onClose()
        } catch (error: unknown) {
            handleApiError({ error, form })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal
            title={null}
            open={open}
            footer={null}
            centered
            getContainer={false}
            closable={!isLoading}
            maskClosable={!isLoading}
            onCancel={handleClose}
        >
            <div className={styles.heading}>
                <span className={styles.icon}>
                    <LockKeyhole size={24} aria-hidden />
                </span>
                <div>
                    <h2>Change password</h2>
                    <p>Use a strong password that you do not use for another account.</p>
                </div>
            </div>

            <div className={styles.securityNote}>
                <ShieldCheck size={18} aria-hidden />
                <span>Your new password takes effect immediately after saving.</span>
            </div>

            <Form form={form} layout="vertical" disabled={isLoading} onFinish={handleSubmit}>
                <Form.Item
                    label="Current password"
                    name="old_password"
                    rules={[{ required: true, message: "Please enter your current password." }]}
                >
                    <Input.Password size="large" autoComplete="current-password" />
                </Form.Item>

                <Form.Item
                    label="New password"
                    name="new_password"
                    rules={[{ required: true, message: "Please enter a new password." }]}
                >
                    <Input.Password size="large" autoComplete="new-password" />
                </Form.Item>

                <Form.Item
                    label="Confirm new password"
                    name="confirm_new_password"
                    dependencies={["new_password"]}
                    rules={[
                        { required: true, message: "Please confirm your new password." },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("new_password") === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject(new Error("Passwords do not match."))
                            },
                        }),
                    ]}
                >
                    <Input.Password size="large" autoComplete="new-password" />
                </Form.Item>

                <div className={styles.actions}>
                    <CustomButton disabled={isLoading} onClick={handleClose}>
                        Cancel
                    </CustomButton>
                    <CustomButton variant="primary-filled" htmlType="submit" loading={isLoading}>
                        Update password
                    </CustomButton>
                </div>
            </Form>
        </Modal>
    )
}

export default ChangePasswordModal
