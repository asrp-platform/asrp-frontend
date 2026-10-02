import { Button, Flex, Form, Input, Modal, Popconfirm } from "antd"
import type { FormInstance } from "antd"
import { useEffect } from "react"

import type { CaseTag } from "@entities/CaseOfTheMonth.ts"

import type { CaseTagFormValues } from "../../types.ts"

interface IProps {
    tag: CaseTag | null
    updating: boolean
    deleting: boolean
    onCancel: () => void
    onSubmit: (values: CaseTagFormValues, form: FormInstance<CaseTagFormValues>) => void
    onDelete: () => void
    canUpdate: boolean
    canDelete: boolean
}

const EditCaseTagModal = ({
    tag,
    updating,
    deleting,
    onCancel,
    onSubmit,
    onDelete,
    canUpdate,
    canDelete,
}: IProps) => {
    const [form] = Form.useForm<CaseTagFormValues>()
    const loading = updating || deleting

    useEffect(() => {
        if (tag) {
            form.setFieldsValue({ name: tag.name })
        } else {
            form.resetFields()
        }
    }, [form, tag])

    return (
        <Modal
            title="Edit case tag"
            open={Boolean(tag)}
            footer={null}
            onCancel={onCancel}
            closable={!loading}
            destroyOnHidden
        >
            <Form
                form={form}
                layout="vertical"
                disabled={loading}
                onFinish={(values) => onSubmit(values, form)}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, whitespace: true, message: "Enter a tag name" },
                        { max: 255, message: "Tag name must be 255 characters or fewer" },
                    ]}
                >
                    <Input maxLength={255} />
                </Form.Item>

                <Flex justify="space-between" align="center" gap={8}>
                    {canDelete && (
                        <Popconfirm
                            title="Delete this case tag?"
                            description="This action cannot be undone."
                            okText="Delete"
                            okButtonProps={{ danger: true }}
                            cancelText="Cancel"
                            onConfirm={onDelete}
                        >
                            <Button danger loading={deleting}>
                                Delete
                            </Button>
                        </Popconfirm>
                    )}

                    <Flex gap={8}>
                        <Button onClick={onCancel}>Cancel</Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={updating}
                            disabled={!canUpdate}
                        >
                            Save
                        </Button>
                    </Flex>
                </Flex>
            </Form>
        </Modal>
    )
}

export default EditCaseTagModal
