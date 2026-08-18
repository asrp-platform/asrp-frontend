"use client"

import { Form, Input, InputNumber, Spin, type FormProps } from "antd"
import { useState } from "react"

import api from "@/axios.ts"
import { DONATION_CHECKOUT_URL } from "@/shared/backend/restApiUrls/restApiUrls.ts"
import { handleApiError } from "@/shared/helpers/formsHelpers.ts"
import type { PaymentCheckoutResponse } from "@shared/interfaces.ts"
import styles from "./DonationCheckoutForm.module.scss"

interface DonationCheckoutFields {
    amount_usd: number
    customer_email: string
}

const DonationCheckoutForm = () => {
    const [form] = Form.useForm<DonationCheckoutFields>()
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onFinish: FormProps<DonationCheckoutFields>["onFinish"] = async (values) => {
        try {
            setIsSubmitting(true)
            const response = await api.post<PaymentCheckoutResponse>(DONATION_CHECKOUT_URL, values)
            window.location.assign(response.data.checkout_session_url)
        } catch (error: unknown) {
            handleApiError({ error, form })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className={styles.checkoutContainer}>
            <div className={styles.actionRow}>
                <button
                    type="button"
                    className={styles.toggleButton}
                    aria-expanded={isOpen}
                    aria-controls="donation-checkout-form"
                    onClick={() => setIsOpen((current) => !current)}
                >
                    Make a one-time donation
                </button>
                <span>Secure direct payment • Personal donations</span>
            </div>

            {isOpen && (
                <Spin spinning={isSubmitting}>
                    <Form
                        id="donation-checkout-form"
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        disabled={isSubmitting}
                        className={styles.checkoutForm}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Donation amount (USD)"
                            name="amount_usd"
                            rules={[
                                { required: true, message: "Please enter a donation amount." },
                                {
                                    type: "number",
                                    min: 1,
                                    message: "The minimum donation amount is $1.00.",
                                },
                            ]}
                        >
                            <InputNumber
                                min={1}
                                precision={2}
                                step={1}
                                prefix="$"
                                placeholder="25.00"
                                aria-label="Donation amount in US dollars"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="customer_email"
                            rules={[
                                { required: true, message: "Please enter your email." },
                                { type: "email", message: "Please enter a valid email address." },
                            ]}
                        >
                            <Input type="email" placeholder="you@example.com" />
                        </Form.Item>

                        <button type="submit" className={styles.submitButton}>
                            Continue to payment
                        </button>
                    </Form>
                </Spin>
            )}
        </div>
    )
}

export default DonationCheckoutForm
