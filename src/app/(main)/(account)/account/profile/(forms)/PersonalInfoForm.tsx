"use client"

import styles from "../(ui)/styles.module.scss"
import { Button, Col, Form, type FormProps, Input, Row } from "antd"
import type { IUser } from "../../../../../../entities/User.ts"

interface IProps {
    user: IUser
}

type FieldType = {
    firstName: string
    lastName: string
    middleName?: string
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

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        console.log(values)
    }

    return (
        <div>
            <h2 className={styles.titleLevelTwo}>Personal information</h2>

            <Form
                form={personalInfoForm}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    firstName: user.firstname,
                    lastName: user.lastname,
                    credentials: "MD, PhD",
                    email: user.email,
                    country: "United States",
                }}
            >
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item label="First name" name="firstName" rules={[{ required: true }]}>
                            <Input className={styles.antInputDisabled} disabled />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Last name" name="lastName" rules={[{ required: true }]}>
                            <Input className={styles.antInputDisabled} disabled />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Middle name" name="middleName">
                            <Input />
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
                        <Form.Item label="Phone" name="phone">
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
                    <Button type="link" danger className={styles.linkButton}>
                        Request name change (moderator approval required)
                    </Button>

                    <Button type="primary" danger htmlType="submit">
                        Save changes
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default PersonalInfoForm
