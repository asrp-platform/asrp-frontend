"use client"

import { Button, Checkbox, Col, Form, type FormProps, Input, Row } from "antd"

import styles from "../(ui)/styles.module.scss"
import { useState } from "react"
import { isAxiosError } from "axios"

type FieldType = {
    medical_school: string
    medical_school_country: string
    years_from_to: string

    is_board_certified_pathologist: boolean
    is_us_pathology_trainee: boolean
    is_us_lab_professional: boolean
}

const ProfessionalInfoForm = () => {
    const [professionalInfoForm] = Form.useForm()

    const [isLoading, setIsLoading] = useState(false)

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            setIsLoading(true)
            console.log(values)
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                console.error(error)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <h3 className={styles.titleLevelTwo}>Professional information</h3>
            <h3 className={styles.titleLevelThree}>Medical School</h3>
            <Form
                form={professionalInfoForm}
                layout="vertical"
                className={styles.professionalInfoForm}
                onFinish={onFinish}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="medical_school" label="Medical school" required>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="medical_school_country"
                            label="Country of medical school"
                            required
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="years_from_to" label="Years (from – to)" required>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <h3 className={styles.titleLevelThree}>Professional status</h3>
                <Form.Item
                    name="is_board_certified_pathologist"
                    valuePropName="checked"
                    style={{ marginBottom: 0 }}
                >
                    <Checkbox>
                        Board-certified or board-eligible pathologist actively practicing in the
                        United States
                    </Checkbox>
                </Form.Item>

                <Form.Item
                    name="is_us_pathology_trainee"
                    valuePropName="checked"
                    style={{ marginBottom: 0 }}
                >
                    <Checkbox>
                        Pathology resident, fellow, or medical student actively enrolled in a U.S.
                        program
                    </Checkbox>
                </Form.Item>

                <Form.Item
                    name="is_us_lab_professional"
                    valuePropName="checked"
                    style={{ marginBottom: 0 }}
                >
                    <Checkbox>Other U.S.-based laboratory professional</Checkbox>
                </Form.Item>

                <div className={styles.professionalInfoActions}>
                    <Button loading={isLoading} type="primary" danger htmlType="submit">
                        Save changes
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default ProfessionalInfoForm
