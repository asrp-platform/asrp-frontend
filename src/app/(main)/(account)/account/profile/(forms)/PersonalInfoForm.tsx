"use client"

import styles from "../(ui)/styles.module.scss"
import { Button, Col, Form, type FormProps, Input, message, Row } from "antd"
import type { IUser } from "../../../../../../entities/User.ts"
import { useState } from "react"
import { isAxiosError } from "axios"
import { setFormFieldsErrors } from "../../../../../../shared/helpers/setFormFieldsErrors.ts"
import api from "../../../../../../axios.ts"
import ChangeNameModal from "../(ui)/RequestNameChangeModal.tsx"
import { CURRENT_USER_URL } from "../../../../../../shared/backend/rest-api-urls/currentUserUrls.ts"

interface IProps {
    user: IUser
}

type FieldType = {
    firstname: string
    lastname: string
    middlename?: string
    suffix?: string
    credentials?: string
    email: string
    phone?: string
    country: string
    state?: string
    city: string
}

const PersonalInfoForm = ({ user }: IProps) => {
    const [personalInfoForm] = Form.useForm()

    const [isLoading, setIsLoading] = useState(false)
    const [nameChangeModalOpen, setNameChangeModalOpen] = useState(false)

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        const { email, firstname, lastname, middlename, ...updateData } = values
        try {
            setIsLoading(true)
            await api.patch(CURRENT_USER_URL, updateData)
            message.success("Successfully updated user data")
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.status === 422) {
                    setFormFieldsErrors(error, personalInfoForm)
                }
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <h2 className={styles.titleLevelTwo}>Personal information</h2>

            <Form
                form={personalInfoForm}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    firstname: user.firstname,
                    lastname: user.lastname,
                    credentials: user.credentials,
                    middlename: user.middlename,
                    suffix: user.suffix,
                    email: user.email,
                    country: user.country,
                    city: user.city,
                    state: user.state,
                    phone_number: user.phone_number,
                }}
            >
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item label="First name" name="firstname" rules={[{ required: true }]}>
                            <Input className={styles.antInputDisabled} disabled />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Last name" name="lastname" rules={[{ required: true }]}>
                            <Input className={styles.antInputDisabled} disabled />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Middle name" name="middlename">
                            <Input className={styles.antInputDisabled} disabled />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Suffix" name="suffix">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Credentials" name="credentials">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Email" name="email">
                            <Input className={styles.antInputDisabled} disabled />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Phone" name="phone_number">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Country" name="country" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="State" name="state">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="City" name="city" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <div className={styles.personalInfoActions}>
                    <Button
                        type="link"
                        danger
                        className={styles.linkButton}
                        onClick={() => setNameChangeModalOpen(true)}
                    >
                        Request name change (moderator approval required)
                    </Button>

                    <Button type="primary" danger htmlType="submit" loading={isLoading}>
                        Save changes
                    </Button>
                </div>
            </Form>
            <ChangeNameModal
                open={nameChangeModalOpen}
                setNameChangeModalOpen={setNameChangeModalOpen}
            />
        </div>
    )
}

export default PersonalInfoForm
