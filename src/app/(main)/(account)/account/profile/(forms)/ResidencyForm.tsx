import { Button, Col, Form, Input, Row } from "antd"
import { useEffect, useState } from "react"
import type { IUserResidency } from "../../../../../../entities/User.ts"
import styles from "../(ui)/styles.module.scss"
import { setFormFieldsErrors } from "../../../../../../shared/helpers/setFormFieldsErrors.ts"
import { isAxiosError } from "axios"

interface IProps {
    residency?: IUserResidency
    onSubmit: (_residencyId: number | string, _values: IUserResidency) => Promise<void>
}

type Mode = "view" | "edit"

const ResidencyForm = ({ residency, onSubmit }: IProps) => {
    const [form] = Form.useForm()

    const [isLoading, setIsLoading] = useState(false)
    const [mode, setMode] = useState<Mode>(residency ? "view" : "edit")

    useEffect(() => {
        console.log("ResidencyForm mounted")
    }, [])

    useEffect(() => {
        if (residency) {
            form.setFieldsValue(residency)
        } else {
            form.resetFields()
        }
    }, [residency, form])

    const handleFinish = async (values: IUserResidency) => {
        try {
            setIsLoading(true)
            await onSubmit(residency!.id, { ...values, id: residency!.id })
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
        form.setFieldsValue(residency)
        setMode("view")
    }

    const isView = mode === "view"

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
                    <div style={{ display: "flex", gap: 12 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            className={styles.updateButton}
                        >
                            Update
                        </Button>

                        <Button className={styles.cancelButton} onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                )}
            </Form>

            {isView && (
                <Button
                    type="primary"
                    className={styles.updateButton}
                    onClick={() => setMode("edit")}
                    htmlType="button"
                >
                    Edit
                </Button>
            )}
        </div>
    )
}

export default ResidencyForm
