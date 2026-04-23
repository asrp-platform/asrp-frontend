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
import { CONTACT_MESSAGE_URL } from "../../shared/backend/rest-api-urls/restApiUrls.ts"
import { isAxiosError } from "axios"
import { setFormFieldsErrors } from "../../shared/helpers/setFormFieldsErrors.ts"
import ContactPreferencesSection from "./ui/ContactPreferencesSection.tsx"
import LeadershipAndCommitteesSection from "./ui/LeadershipAndCommitteesSection.tsx"
import { ContactMessageType } from "../../entities/ContactMessage.ts"

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
            type: ContactMessageType.GetInvolved,
        }

        try {
            setIsLoading(true)
            await api.post(CONTACT_MESSAGE_URL, requestData)
            resetFormFields()
        } catch (error) {
            if (isAxiosError(error)) {
                setFormFieldsErrors(error, form)
            }
        } finally {
            setIsLoading(false)
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
                    <LeadershipAndCommitteesSection
                        setChecked={setChecked}
                        future_committee_working_checked={intentionChecks.future_committee_working}
                        future_leadership_positions_checked={
                            intentionChecks.future_leadership_positions
                        }
                    />
                    <ContactPreferencesSection
                        checked={intentionChecks.receive_updates}
                        setChecked={setChecked}
                    />
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
