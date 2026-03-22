"use client"

import { Modal, Form, Radio, Input } from "antd"

type UpdateStatusAction = { action: "approve" } | { action: "reject"; reason_rejecting: string }

interface Props {
    open: boolean
    loading: boolean
    onClose: () => void
    onSubmit: (_data: UpdateStatusAction) => Promise<void>
}

const NameChangeStatusModal = ({ open, loading, onClose, onSubmit }: Props) => {
    const [form] = Form.useForm()

    const handleOk = async () => {
        const values = await form.validateFields()

        if (values.action === "approve") {
            await onSubmit({ action: "approve" })
        }

        if (values.action === "reject") {
            await onSubmit({
                action: "reject",
                reason_rejecting: values.reason_rejecting,
            })
        }

        form.resetFields()
        onClose()
    }

    return (
        <Modal
            open={open}
            title="Change request status"
            centered
            confirmLoading={loading}
            onCancel={() => {
                form.resetFields()
                onClose()
            }}
            onOk={handleOk}
            okText="Confirm"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="action"
                    label="Action"
                    rules={[{ required: true, message: "Select action" }]}
                >
                    <Radio.Group>
                        <Radio value="approve">Approve</Radio>
                        <Radio value="reject">Reject</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item noStyle shouldUpdate={(prev, cur) => prev.action !== cur.action}>
                    {({ getFieldValue }) =>
                        getFieldValue("action") === "reject" ? (
                            <Form.Item
                                name="reason_rejecting"
                                label="Reason for rejection"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please provide rejection reason",
                                    },
                                ]}
                            >
                                <Input.TextArea rows={3} />
                            </Form.Item>
                        ) : null
                    }
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default NameChangeStatusModal
