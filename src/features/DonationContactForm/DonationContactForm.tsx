"use client"

import styles from "@/features/DonationContactForm/DonationContactForm.module.scss"

import { type FormProps, Input, message, Select, Spin } from "antd"
import { Form } from "antd"
import TextArea from "antd/es/input/TextArea"

import { useForm } from "antd/es/form/Form"
import { useState } from "react"
import { isAxiosError } from "axios"

import api from "@/axios.ts"

// 👉 дефолтный URL (потом заменю)
const DEFAULT_FORM_URL = "/api/contact"

interface DonationFormFields {
    name: string
    email: string
    organization?: string
    support_area: string
}

const options = [
    { value: "individual", label: "Individual donation" },
    { value: "monthly", label: "Monthly supporter" },
    { value: "corporate", label: "Corporate sponsorship" },
    { value: "custom", label: "Custom donation" },
]

const DonationContactForm = () => {
    const [form] = useForm()
    const [loading, setLoading] = useState(false)

    const onFinish: FormProps<DonationFormFields>["onFinish"] = (values) => {
        const sendForm = async () => {
            try {
                setLoading(true)

                await api.post(DEFAULT_FORM_URL, {
                    name: values.name,
                    email: values.email,
                    organization: values.organization,
                    support_area: values.support_area,
                })

                message.success("Your message has been sent successfully.")
                form.resetFields()
            } catch (error) {
                if (isAxiosError(error)) {
                    if (error.response?.status === 422) {
                        const data = error.response.data
                        if (data?.detail && Array.isArray(data.detail.errors)) {
                            const fieldErrors = data.detail.errors.map((err: any) => ({
                                name: err.field,
                                errors: [err.message],
                            }))
                            form.setFields(fieldErrors)
                        }
                    } else {
                        message.error("Something went wrong. Please try again.")
                    }
                }
            } finally {
                setLoading(false)
            }
        }

        sendForm()
    }

    return (
        <div className={styles.contactFormContainer}>
            <h3 className={styles.contactFormTitle}>Send a message</h3>

            <Spin spinning={loading}>
                <Form
                    form={form}
                    name="donationContactForm"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    className={styles.contactForm}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter your name!" }]}
                    >
                        <Input placeholder="Your name *" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please enter your email!" }]}
                    >
                        <Input placeholder="Email address *" />
                    </Form.Item>

                    <Form.Item label="Organization" name="organization">
                        <Input placeholder="Organization" />
                    </Form.Item>

                    <Form.Item label="Type of donation" name="type_of_donation">
                        <Select
                            defaultValue="individual"
                            options={options}
                            style={{ overflow: "visible" }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="What would you like to support?"
                        name="support_area"
                        rules={[
                            {
                                required: true,
                                message: "Please tell us what you would like to support!",
                            },
                        ]}
                    >
                        <TextArea placeholder="What would you like to support? (education, mentorship, access, community)" />
                    </Form.Item>

                    <div className={styles.submitButtonContainer}>
                        <button type="submit">Submit</button>
                        <p className={styles.formDisclaimer}>
                            By submitting, you agree that ASRP may contact you regarding donations
                            and sponsorship.
                        </p>
                    </div>
                </Form>
            </Spin>
        </div>
    )
}

export default DonationContactForm
