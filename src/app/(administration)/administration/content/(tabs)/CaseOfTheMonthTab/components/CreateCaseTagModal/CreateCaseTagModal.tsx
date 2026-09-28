import { Button, Flex, Form, Input, Modal } from "antd"
import type { FormInstance } from "antd"
import { useEffect } from "react"

import type { CaseTagFormValues } from "../../types.ts"

interface IProps {
    open: boolean
    loading: boolean
    onCancel: () => void
    onSubmit: (values: CaseTagFormValues, form: FormInstance<CaseTagFormValues>) => void
}

const CreateCaseTagModal = ({ open, loading, onCancel, onSubmit }: IProps) => {
    const [form] = Form.useForm<CaseTagFormValues>()

    useEffect(() => {
        if (!open) form.resetFields()
    }, [form, open])

    return (
        <Modal
            title="Create case tag"
            open={open}
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
                    <Input placeholder="For example, Breast pathology" maxLength={255} />
                </Form.Item>

                <Flex justify="flex-end" gap={8}>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Create tag
                    </Button>
                </Flex>
            </Form>
        </Modal>
    )
}

export default CreateCaseTagModal
