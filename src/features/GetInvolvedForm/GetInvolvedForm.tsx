"use client"

import {
    Form,
    Input,
    Select,
    Checkbox,
    type CheckboxChangeEvent,
    type FormProps,
    Button,
} from "antd"
import styles from "./styles.module.scss"
import { useState } from "react"
import api from "../../axios.ts"
import { CONTACT_MESSAGE_URL } from "../../shared/backend/restApiUrls.ts"
import { isAxiosError } from "axios"

const { TextArea } = Input

const roleOptions = [
    { value: "attending", label: "Attending pathologist" },
    { value: "fellow", label: "Fellow" },
    { value: "resident", label: "Resident" },
    { value: "student", label: "Medical student" },
    { value: "lab", label: "Laboratory professional" },
    { value: "other", label: "Other" },
]

const involvementOptions = [
    { label: "Education & CME", value: "Education & CME" },
    { label: "Mentorship & trainee support", value: "Mentorship & trainee support" },
    { label: "Research & collaboration", value: "Research & collaboration" },
    { label: "Membership & recruitment", value: "Membership & recruitment" },
    { label: "Outreach & social media", value: "Outreach & social media" },
    { label: "Website & technology", value: "Website & technology" },
    { label: "Fundraising & sponsorship", value: "Fundraising & sponsorship" },
    { label: "Events & conferences", value: "Events & conferences" },
    { label: "Other / not sure yet", value: "Other / not sure yet" },
]

export interface GetInvolvedFormValues {
    name: string
    email: string
    message_content: {
        current_role?: string | null
        institution_location?: string | null
        areas: string[]
        ideas?: string | null
        future_committee_working: boolean
        future_leadership_positions: boolean
        receive_updates: boolean
    }
    type: "GET_INVOLVED"
}

export interface FieldType {
    name: string
    email: string
    current_role?: string | null
    institution_location?: string | null
    areas: string[]
    ideas?: string | null
    future_committee_working: boolean
    future_leadership_positions: boolean
    receive_updates: boolean
}

const GetInvolvedForm = () => {
    const [form] = Form.useForm()

    const [intentionChecks, setIntentionChecks] = useState({
        future_committee_working: false,
        future_leadership_positions: false,
        receive_updates: false,
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const setChecked = (event: CheckboxChangeEvent, fieldName: string) => {
        setIntentionChecks((prev) => ({ ...prev, [fieldName]: event.target.checked }))
    }

    const resetFormFields = () => {
        form.resetFields()
        setIntentionChecks({
            future_committee_working: false,
            future_leadership_positions: false,
            receive_updates: false,
        })
    }

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        const messageContent = {
            ...intentionChecks,
            current_role: values.current_role,
            institution_location: values.institution_location,
            areas: values.areas,
            ideas: values.ideas,
        }

        const requestData: GetInvolvedFormValues = {
            message_content: messageContent,
            name: values.name,
            email: values.email,
            type: "GET_INVOLVED",
        }

        try {
            setIsLoading(true)
            await api.post(CONTACT_MESSAGE_URL, requestData)
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error)
            }
        } finally {
            setIsLoading(false)
            resetFormFields()
        }
    }

    return (
        <div className={styles.formContainer}>
            <h2>Share your ideas or interest in volunteering</h2>
            <p className={styles.formIntro}>
                Please tell us a bit about yourself, how you would like to contribute, and any ideas
                you would like to propose. This form is for everyone – attendings, fellows,
                residents, students, and colleagues who share our mission.
            </p>

            <Form
                form={form}
                layout="vertical"
                className={styles.formCard}
                onFinish={onFinish}
                requiredMark="optional"
            >
                <div className={styles.intentionGrid}>
                    <Form.Item
                        label="Full name"
                        name="name"
                        rules={[{ required: true, message: "Please enter your full name" }]}
                    >
                        <Input placeholder="Dr. Name Lastname" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email" },
                            { type: "email", message: "Invalid email format" },
                        ]}
                    >
                        <Input placeholder="name@example.com" />
                    </Form.Item>
                </div>

                <div className={styles.intentionGrid}>
                    <Form.Item label="Current role" name="role">
                        <Select placeholder="Select your role" options={roleOptions} allowClear />
                    </Form.Item>

                    <Form.Item label="Institution / location" name="institution_location">
                        <Input placeholder="Institution, city, state" />
                    </Form.Item>
                </div>

                <h3 className={styles.otherTitle}>Areas where you would like to be involved</h3>
                <Form.Item
                    label="You can select one or multiple options that reflect your interests."
                    name="areas"
                >
                    <Checkbox.Group className={styles.checkboxGrid}>
                        {involvementOptions.map((opt) => (
                            <div key={opt.value} className={styles.checkboxContainer}>
                                <Checkbox value={opt.value}>{opt.label}</Checkbox>
                            </div>
                        ))}
                    </Checkbox.Group>
                </Form.Item>

                <h3 className={styles.otherTitle}>Your idea(s) or how you would like to help</h3>
                <Form.Item
                    label="Describe any initiatives, projects, or roles you have in mind."
                    name="ideas"
                >
                    <TextArea
                        rows={6}
                        placeholder="For example: I would like to help organize virtual case conferences, support mentorship for trainees, or assist with outreach and communications."
                    />
                </Form.Item>

                <div className={styles.intentionGrid}>
                    <div className={styles.intentionGridColumn}>
                        <h3>Future leadership & committee roles</h3>
                        <div className={styles.intentionCheckboxContainer}>
                            <Checkbox
                                className={styles.intentionCheckbox}
                                value="future_committee_working"
                                onChange={(e) => setChecked(e, "future_committee_working")}
                            />

                            <span>
                                I would like to be considered for future committee or working group
                                roles as ASRP grows.
                            </span>
                        </div>
                        <div className={styles.intentionCheckboxContainer}>
                            <Checkbox
                                className={styles.intentionCheckbox}
                                value="future_leadership_positions"
                                onChange={(e) => setChecked(e, "future_leadership_positions")}
                            />
                            <span>
                                I may be interested in future leadership positions (for example,
                                committee chair, taskforce lead, or board role).
                            </span>
                        </div>
                    </div>

                    <div className={styles.intentionGridColumn}>
                        <h3>Contact preferences</h3>
                        <p className={styles.contactText}>
                            By submitting this form, you agree that ASRP may contact you by email
                            regarding volunteer opportunities, events, and society updates.
                        </p>

                        <div className={styles.intentionCheckboxContainer}>
                            <Checkbox
                                className={styles.intentionCheckbox}
                                value="receive_updates"
                                onChange={(e) => setChecked(e, "receive_updates")}
                            />
                            <span>
                                I would also like to receive occasional updates about ASRP news,
                                meetings, and educational programs.
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.submitRow}>
                    <div className={styles.submitButtonContainer}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            disabled={isLoading}
                            className={styles.submitButton}
                        >
                            Submit interest
                        </Button>
                    </div>
                    <div className={styles.helperTextContainer}>
                        <span>
                            We are a newly forming society and truly appreciate your willingness to
                            help. Please allow some time for us to review your message – our goal is
                            to respond to every submission.
                        </span>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default GetInvolvedForm
