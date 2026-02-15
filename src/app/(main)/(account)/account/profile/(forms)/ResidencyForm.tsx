import { Button, Col, Form, Input, Row, Flex } from "antd"
import { useEffect, useState } from "react"
import type { IUserResidencyFormValues } from "../../../../../../entities/User"
import styles from "../(ui)/styles.module.scss"
import { setFormFieldsErrors } from "../../../../../../shared/helpers/setFormFieldsErrors"
import { isAxiosError } from "axios"

interface IProps {
    initialValues?: IUserResidencyFormValues
    onSubmit: (_values: IUserResidencyFormValues) => Promise<void>
    onDelete?: () => Promise<void>
    startInEditMode?: boolean
}

type Mode = "view" | "edit"

const emptyValues: IUserResidencyFormValues = {
    institution: "",
    speciality: "",
    city: "",
    state: "",
    country: "",
    years_from_to: "",
}

const ResidencyForm = ({ initialValues, onSubmit, onDelete, startInEditMode = false }: IProps) => {
    const [form] = Form.useForm<IUserResidencyFormValues>()
    const [mode, setMode] = useState<Mode>(startInEditMode ? "edit" : "view")
    const [isLoading, setIsLoading] = useState(false)

    const isView = mode === "view"

    useEffect(() => {
        form.setFieldsValue(initialValues ?? emptyValues)
    }, [initialValues, form])

    const handleFinish = async (values: IUserResidencyFormValues) => {
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
                            <Input disabled={isView} placeholder="2015–2019" />
                        </Form.Item>
                    </Col>
                </Row>

                {!isView && (
                    <Flex justify="space-between">
                        <Flex gap={8}>
                            <Button type="primary" htmlType="submit" loading={isLoading}>
                                Save
                            </Button>

                            <Button onClick={handleCancel}>Cancel</Button>
                        </Flex>

                        {onDelete && (
                            <Button danger onClick={onDelete}>
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
                    danger
                    className={styles.editButton}
                >
                    Edit
                </Button>
            )}
        </div>
    )
}

export default ResidencyForm
