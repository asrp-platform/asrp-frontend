"use client"

import { Modal, Form, Input, message } from "antd"
import { useState } from "react"
import api from "@/axios.ts"
import { isAxiosError } from "axios"
import { setFormFieldsErrors } from "@/shared/helpers/setFormFieldsErrors.ts"
import { CURRENT_USER_CHANGE_PASSWORD_URL } from "@/shared/backend/rest-api-urls/currentUserUrls.ts"

interface Props {
    open: boolean
    onClose: () => void
}

interface ChangePasswordPayload {
    old_password: "string"
    new_password: "string"
    confirm_new_password: "string"
}

const ChangePasswordModal = ({ open, onClose }: Props) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()

            const payload: ChangePasswordPayload = {
                old_password: values.old_password,
                new_password: values.new_password,
                confirm_new_password: values.confirm_new_password,
            }

            setLoading(true)

            await api.post(CURRENT_USER_CHANGE_PASSWORD_URL, payload)

            message.success("Password changed successfully")

            form.resetFields()
            onClose()
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                setFormFieldsErrors(error, form)
            } else if (!("errorFields" in (error as any))) {
                message.error("Unexpected error occurred")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title="Change Password"
            open={open}
            onCancel={() => {
                form.resetFields()
                onClose()
            }}
            onOk={handleSubmit}
            confirmLoading={loading}
            okText="Update Password"
            getContainer={false}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Current Password"
                    name="old_password"
                    rules={[{ required: true, message: "Please enter current password" }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="New Password"
                    name="new_password"
                    rules={[{ required: true, message: "Please enter new password" }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm New Password"
                    name="confirm_new_password"
                    dependencies={["new_password"]}
                    rules={[
                        { required: true, message: "Please confirm password" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("new_password") === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject(new Error("Passwords do not match"))
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ChangePasswordModal
