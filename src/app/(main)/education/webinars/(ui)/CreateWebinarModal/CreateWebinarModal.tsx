"use client"

import { useState } from "react"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { useCurrentUserQuery } from "@shared/backend/queries/useCurrentUserQuery.ts"
import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"
import { Button, Col, DatePicker, Flex, Form, Input, message, Modal, Row, Switch } from "antd"
import { useForm } from "antd/es/form/Form"
import type { Dayjs } from "dayjs"
import styles from "./styles.module.scss"
import { WEBINARS_ADMIN_URL } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import api from "@/axios"
import { handleFormError } from "@shared/helpers/setFormFieldsErrors.ts"

type FieldType = {
    title: string
    description: string
    learning_objectives?: string[]
    speaker_name: string
    speaker_description?: string
    registration_link?: string
    join_link?: string
    starts_at: Dayjs
    location?: string
    member_only: boolean
}

const CreateWebinarModal = () => {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [form] = useForm<FieldType>()

    const { data: currentUser } = useCurrentUserQuery()

    const onFinish = async (values: FieldType) => {
        try {
            setIsLoading(true)
            await api.post(WEBINARS_ADMIN_URL, values)
            setOpen(false)
            message.success("Webinars created successfully.")
        } catch (error) {
            handleFormError(error, form)
        } finally {
            setIsLoading(false)
        }
    }

    if (!currentUser || !currentUser.admin) return null

    return (
        <>
            <CustomButton onClick={() => setOpen(true)} variant={"primary"}>
                Create a new webinar
            </CustomButton>
            <Modal
                title="Create a new webinar"
                open={open}
                onCancel={() => setOpen(false)}
                width={760}
                destroyOnHidden
                getContainer={false}
                footer={null}
            >
                <Form<FieldType>
                    form={form}
                    layout="vertical"
                    className={styles.form}
                    initialValues={{ member_only: true }}
                    onFinish={onFinish}
                >
                    <section className={styles.formSection}>
                        <div className={styles.sectionHeading}>
                            <h3>Webinar details</h3>
                            <p>Provide the title and a short description of the program.</p>
                        </div>

                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                { required: true, message: "Enter webinar title" },
                                { min: 2, message: "Title must contain at least 2 characters" },
                            ]}
                        >
                            <Input placeholder="e.g. Diagnostic Challenges in Soft Tissue Pathology" />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: "Enter webinar description" }]}
                        >
                            <Input.TextArea
                                placeholder="Describe the webinar topic and key takeaways"
                                autoSize={{ minRows: 4, maxRows: 8 }}
                                showCount
                            />
                        </Form.Item>

                        <Form.Item
                            label="Learning objectives"
                            extra="Optional. Add each learning objective as a separate item."
                        >
                            <Form.List name="learning_objectives">
                                {(fields, { add, remove }) => (
                                    <div className={styles.objectivesList}>
                                        {fields.map((field, index) => (
                                            <div className={styles.objectiveRow} key={field.key}>
                                                <Form.Item
                                                    {...field}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: "Enter a learning objective",
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input
                                                        placeholder={`Learning objective ${index + 1}`}
                                                    />
                                                </Form.Item>
                                                <Button
                                                    type="text"
                                                    danger
                                                    icon={<MinusCircleOutlined />}
                                                    aria-label={`Remove learning objective ${index + 1}`}
                                                    onClick={() => remove(field.name)}
                                                />
                                            </div>
                                        ))}
                                        <Button
                                            type="dashed"
                                            icon={<PlusOutlined />}
                                            onClick={() => add()}
                                            className={styles.addObjectiveButton}
                                        >
                                            Add learning objective
                                        </Button>
                                    </div>
                                )}
                            </Form.List>
                        </Form.Item>
                    </section>

                    <section className={styles.formSection}>
                        <div className={styles.sectionHeading}>
                            <h3>Speaker</h3>
                            <p>Add the presenter&apos;s name and professional information.</p>
                        </div>

                        <Form.Item
                            label="Speaker name"
                            name="speaker_name"
                            rules={[
                                { required: true, message: "Enter speaker name" },
                                {
                                    min: 2,
                                    message: "Speaker name must contain at least 2 characters",
                                },
                            ]}
                        >
                            <Input placeholder="Full name and credentials" />
                        </Form.Item>

                        <Form.Item
                            label="Speaker description"
                            name="speaker_description"
                            rules={[
                                {
                                    min: 2,
                                    message: "Description must contain at least 2 characters",
                                },
                            ]}
                        >
                            <Input.TextArea
                                placeholder="Position, institution, or a short biography (optional)"
                                autoSize={{ minRows: 2, maxRows: 5 }}
                            />
                        </Form.Item>
                    </section>

                    <section className={styles.formSection}>
                        <div className={styles.sectionHeading}>
                            <h3>Schedule and access</h3>
                            <p>Specify when and where the webinar takes place.</p>
                        </div>

                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Start date and time"
                                    name="starts_at"
                                    rules={[
                                        { required: true, message: "Select start date and time" },
                                    ]}
                                >
                                    <DatePicker
                                        showTime
                                        format="MMMM D, YYYY h:mm A"
                                        placeholder="Select date and time"
                                        className={styles.fullWidth}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item label="Location" name="location">
                                    <Input
                                        placeholder="Zoom, Boston, MA, or another location"
                                        maxLength={255}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Registration link"
                                    name="registration_link"
                                    rules={[{ type: "url", message: "Enter a valid URL" }]}
                                >
                                    <Input placeholder="https://example.com/register" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Join link"
                                    name="join_link"
                                    rules={[{ type: "url", message: "Enter a valid URL" }]}
                                >
                                    <Input placeholder="https://zoom.us/j/..." />
                                </Form.Item>
                            </Col>
                        </Row>

                        <div className={styles.memberOnlyField}>
                            <div>
                                <strong>Members only</strong>
                                <p>Limit webinar access and materials to ASRP members.</p>
                            </div>
                            <Form.Item name="member_only" valuePropName="checked" noStyle>
                                <Switch aria-label="Members only" />
                            </Form.Item>
                        </div>
                    </section>
                    <Flex justify="space-between" className={styles.buttonsContainer}>
                        <CustomButton onClick={() => setOpen(false)}>Cancel changes</CustomButton>
                        <CustomButton loading={isLoading} htmlType={"submit"} variant="green">
                            Create webinar
                        </CustomButton>
                    </Flex>
                </Form>
            </Modal>
        </>
    )
}

export default CreateWebinarModal
