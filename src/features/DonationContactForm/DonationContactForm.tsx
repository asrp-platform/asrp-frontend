"use client"

import styles from "@/features/DonationContactForm/DonationContactForm.module.scss"

import { type FormProps, Input, message, Select, Spin } from "antd"
import { Form } from "antd"
import TextArea from "antd/es/input/TextArea"

import { useForm } from "antd/es/form/Form"
import { useState } from "react"

import api from "@/axios.ts"
import { ContactMessageType } from "@/entities/ContactMessage.ts"
import { handleApiError } from "@/shared/helpers/formsHelpers.ts"
import { CONTACT_MESSAGE_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"

interface DonationFormFields {
    name: string
    email: string
    organization?: string
    donation_type: string
    support_area: string
}

const options = [
    { value: "Individual donation", label: "Individual donation" },
    { value: "Monthly supporter", label: "Monthly supporter" },
    { value: "Corporation sponsorship", label: "Corporate sponsorship" },
    { value: "Custom", label: "Custom donation" },
]

const DonationContactForm = () => {
    const [form] = useForm()
    const [loading, setLoading] = useState(false)

    const onFinish: FormProps<DonationFormFields>["onFinish"] = (values) => {
        const sendForm = async () => {
            try {
                setLoading(true)

                await api.post(CONTACT_MESSAGE_URL, {
                    name: values.name,
                    email: values.email,
                    type: ContactMessageType.DonationSponsorship,
                    message_content: {
                        organization: values.organization,
                        donation_type: values.donation_type,
                        message: values.support_area,
                    },
                })

                message.success("Your message has been sent successfully.")
                form.resetFields()
            } catch (error) {
                handleApiError({ error, form })
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
                        rules={[
                            { required: true, message: "Please enter your name!" },
                            { min: 2, message: "Name must be at least 2 characters." },
                        ]}
                    >
                        <Input placeholder="Your name *" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email!" },
                            { type: "email", message: "Please enter a valid email address." },
                        ]}
                    >
                        <Input placeholder="Email address *" />
                    </Form.Item>

                    <Form.Item
                        label="Organization"
                        name="organization"
                        rules={[{ min: 2, message: "Organization must be at least 2 characters." }]}
                    >
                        <Input placeholder="Organization" />
                    </Form.Item>

                    <Form.Item
                        label="Type of donation"
                        name="donation_type"
                        initialValue="Individual donation"
                        rules={[{ required: true, message: "Please select a donation type." }]}
                    >
                        <Select options={options} style={{ overflow: "visible" }} />
                    </Form.Item>

                    <Form.Item
                        label="What would you like to support?"
                        name="support_area"
                        rules={[
                            {
                                required: true,
                                message: "Please tell us what you would like to support!",
                            },
                            { min: 10, message: "Message must be at least 10 characters." },
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
