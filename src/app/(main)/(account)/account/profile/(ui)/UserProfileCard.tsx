"use client"

import { Form, Input, Button, Card, Row, Col } from "antd"

import styles from "./styles.module.scss"
import type { IUser } from "../../../../../../entities/User.ts"

interface IProps {
    user: IUser
}

const UserProfileCard = ({ user }: IProps) => {
    const [form] = Form.useForm()

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={{
                firstName: user.firstname,
                lastName: user.lastname,
                credentials: "MD, PhD",
                email: user.email,
                country: "United States",
            }}
        >
            {/* Personal info */}
            <Card title="Personal information" className={styles.card}>
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
                <div className={styles.actions}>
                    <Button type="link" danger className={styles.linkButton}>
                        Request name change (moderator approval required)
                    </Button>

                    <Button type="primary" danger htmlType="submit">
                        Save changes
                    </Button>
                </div>
            </Card>
        </Form>
    )
}

export default UserProfileCard
