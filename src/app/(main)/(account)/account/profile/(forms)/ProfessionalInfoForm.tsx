"use client"

import { Button, Checkbox, Col, Form, type FormProps, Input, Row } from "antd"

import styles from "../(ui)/styles.module.scss"
import { useEffect, useState } from "react"
import { isAxiosError } from "axios"
import api from "../../../../../../axios.ts"
import type { IUser, IUserProfessionalInformation } from "../../../../../../entities/User.ts"
import { getUserProfessionalInformationUrl } from "../../../../../../shared/backend/restApiUrls.ts"
import { setFormFieldsErrors } from "../../../../../../shared/helpers/setFormFieldsErrors.ts"

type FieldType = {
    medical_school: string
    medical_school_country: string
    years_from_to: string

    is_board_certified_pathologist: boolean
    is_us_pathology_trainee: boolean
    is_us_lab_professional: boolean
}

interface IProps {
    user: IUser
}

const ProfessionalInfoForm = ({ user }: IProps) => {
    const [professionalInfoForm] = Form.useForm()

    const [isLoading, setIsLoading] = useState(false)

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            setIsLoading(true)
            await api.put(getUserProfessionalInformationUrl(user.id), values)
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                if (error.status === 422) {
                    setFormFieldsErrors(error, professionalInfoForm)
                }
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get<IUserProfessionalInformation | null>(
                    getUserProfessionalInformationUrl(user.id),
                )
                if (response.data) {
                    professionalInfoForm.setFieldsValue(response.data)
                }
            } catch (error) {
                if (isAxiosError(error)) {
                    console.error(error)
                }
            }
        }

        fetchData()
    }, [professionalInfoForm, user.id])

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
                    required
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
