import { Card, Col, Form, Input, Row, Typography } from "antd"
import styles from "./styles.module.scss"

const { Text } = Typography

const ResidencyCard = () => {
    const [form] = Form.useForm()

    return (
        <Card title="Residency" className={styles.card}>
            <Form form={form} layout="vertical">
                <Text className={styles.residencySubtitle}>
                    If you are a medical student, residency applicant, U.S.-based laboratory
                    professional, or otherwise do not have residency training to report, please
                    enter N/A in the required fields below.
                </Text>

                <div className={styles.formFieldsContainer}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Institution" required>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Speciality" required>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            </Form>
        </Card>
    )
}

export default ResidencyCard
