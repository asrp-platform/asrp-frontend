import { Button, Checkbox, Col, Flex, Form, Input, Modal, Row } from "antd"
import { useEffect, useState } from "react"
import { isAxiosError } from "axios"

import styles from "@/app/(main)/(account)/account/profile/(ui)/styles.module.scss"
import { setFormFieldsErrors } from "@/shared/helpers/setFormFieldsErrors"

export interface IExperienceFormValues {
    institution: string
    speciality: string
    city: string
    state: string
    country: string
    years_from_to: string
    current_position: boolean
}

interface IProps {
    initialValues?: IExperienceFormValues
    onSubmit: (_values: IExperienceFormValues) => Promise<void>
    onDelete?: () => Promise<void>
    startInEditMode?: boolean
    deleteEntityLabel: string
}

type Mode = "view" | "edit"

const emptyValues: IExperienceFormValues = {
    institution: "",
    speciality: "",
    city: "",
    state: "",
    country: "",
    years_from_to: "",
    current_position: false,
}

const ExperienceForm = ({
    initialValues,
    onSubmit,
    onDelete,
    startInEditMode = false,
    deleteEntityLabel,
}: IProps) => {
    const [form] = Form.useForm<IExperienceFormValues>()
    const [mode, setMode] = useState<Mode>(startInEditMode ? "edit" : "view")
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const isView = mode === "view"

    useEffect(() => {
        form.setFieldsValue(initialValues ?? emptyValues)
    }, [initialValues, form])

    const handleFinish = async (values: IExperienceFormValues) => {
        try {
            setIsLoading(true)
            await onSubmit(values)
            setMode("view")
        } catch (error) {
            if (isAxiosError(error)) {
                setFormFieldsErrors(error, form)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        form.setFieldsValue(initialValues ?? emptyValues)
        setMode("view")
    }

    const handleDeleteConfirm = async () => {
        if (!onDelete) return

        try {
            setIsLoading(true)
            await onDelete()
            setIsDeleteModalOpen(false)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.residencyFormContainer}>
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="institution"
                            label="Institution"
                            rules={[{ required: true }]}
                        >
                            <Input disabled={isView} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="speciality"
                            label="Speciality"
                            rules={[{ required: true }]}
                        >
                            <Input disabled={isView} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="city" label="City" rules={[{ required: true }]}>
                            <Input disabled={isView} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name="state" label="State" rules={[{ required: true }]}>
                            <Input disabled={isView} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="country" label="Country" rules={[{ required: true }]}>
                            <Input disabled={isView} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="years_from_to"
                            label="Years (from – to)"
                            rules={[{ required: true }]}
                        >
                            <Input disabled={isView} placeholder="2020-2022" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="current_position" valuePropName="checked" style={{ marginTop: 4 }}>
                    <Checkbox disabled={isView}>Current Position</Checkbox>
                </Form.Item>

                {!isView && (
                    <Flex justify="space-between">
                        <Flex gap={8}>
                            <Button type="primary" htmlType="submit" loading={isLoading}>
                                Save
                            </Button>

                            <Button onClick={handleCancel}>Cancel</Button>
                        </Flex>

                        {onDelete && (
                            <Button danger onClick={() => setIsDeleteModalOpen(true)}>
                                Delete
                            </Button>
                        )}
                    </Flex>
                )}
            </Form>

            {isView && (
                <Button
                    type="primary"
                    onClick={() => setMode("edit")}
                    className={styles.editButton}
                >
                    Edit
                </Button>
            )}

            <Modal
                open={isDeleteModalOpen}
                title={`Delete ${deleteEntityLabel}?`}
                onCancel={() => setIsDeleteModalOpen(false)}
                onOk={handleDeleteConfirm}
                okText="Yes, delete"
                okButtonProps={{ danger: true }}
                cancelText="Cancel"
                centered
                destroyOnHidden
                getContainer={false}
            >
                <p>
                    This action cannot be undone. Are you sure you want to delete this{" "}
                    {deleteEntityLabel}?
                </p>
            </Modal>
        </div>
    )
}

export default ExperienceForm
