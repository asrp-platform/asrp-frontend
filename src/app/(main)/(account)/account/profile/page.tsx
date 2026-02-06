"use client"

import { Form, Input, Button, Card, Row, Col, Typography } from "antd"
import styles from "./styles.module.scss"

const { Title, Text } = Typography

export default function ASRPAccountProfilePage() {
    const [form] = Form.useForm()

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <section className={styles.section}>
                    {/* Header */}
                    <div className={styles.header}>
                        <div>
                            <Title level={2}>Profile</Title>
                            <Text type="secondary">
                                Manage your personal and professional information.
                            </Text>
                        </div>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{
                            firstName: "E.",
                            lastName: "Member",
                            credentials: "MD, PhD",
                            email: "member@email.com",
                            country: "United States",
                        }}
                    >
                        {/* Personal info */}
                        <Card title="Personal information" className={styles.card}>
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="First name"
                                        name="firstName"
                                        rules={[{ required: true }]}
                                    >
                                        <Input className={styles.antInputDisabled} disabled />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="Last name"
                                        name="lastName"
                                        rules={[{ required: true }]}
                                    >
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
                                    <Form.Item
                                        label="Country"
                                        name="country"
                                        rules={[{ required: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Form.Item label="State" name="state">
                                        <Input />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="City"
                                        name="city"
                                        rules={[{ required: true }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Button type="link" danger className={styles.linkButton}>
                                Request name change (moderator approval required)
                            </Button>
                        </Card>

                        <div className={styles.actions}>
                            <Button type="primary" danger htmlType="submit">
                                Save changes
                            </Button>
                        </div>
                    </Form>
                </section>
            </div>
        </div>
    )
}
