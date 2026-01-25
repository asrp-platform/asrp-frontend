"use client"

import { Button, Checkbox, Form, Input, Radio, Select } from "antd"
import { useForm } from "antd/es/form/Form"
import styles from "./styles.module.scss"
import type { FieldType, Credentials, Country, MembershipKey } from "./types"
import { useMemo, useState } from "react"
import MembershipCard from "./ui/MembershipCard/MembershipCard.tsx"

const credentialsOptions: Credentials[] = [
    "MD",
    "DO",
    "MBBS",
    "DDS",
    "MLS",
    "PhD",
    "MLT",
    "PA(ASCP)",
    "MSc",
    "MBA",
    "MPH",
    "Other",
]

const countries: Country[] = [
    { code: "US", name: "United States of America" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "United Kingdom" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "AU", name: "Australia" },
    { code: "NZ", name: "New Zealand" },
    { code: "IN", name: "India" },
    { code: "CN", name: "China" },
    { code: "JP", name: "Japan" },
    { code: "KR", name: "South Korea" },
    { code: "BR", name: "Brazil" },
    { code: "MX", name: "Mexico" },
    { code: "UA", name: "Ukraine" },
    { code: "RU", name: "Russia" },
    { code: "OTHER", name: "Other" },
]

const practiceSettingOptions = [
    { value: "academic", label: "Academic medical center" },
    { value: "community", label: "Community hospital" },
    { value: "private_lab", label: "Private laboratory" },
    { value: "industry", label: "Industry" },
    { value: "government", label: "Government / military" },
    { value: "other", label: "Other" },
]

const jobTitleOptions = [
    { value: "attending", label: "Attending pathologist" },
    { value: "fellow", label: "Fellow" },
    { value: "resident", label: "Resident" },
    { value: "medical_student", label: "Medical student" },
    { value: "scientist", label: "Scientist / PhD" },
    { value: "lab_professional", label: "Laboratory professional" },
    { value: "other", label: "Other" },
]

const referralSourceOptions = [
    { value: "colleague", label: "Colleague" },
    { value: "friend", label: "Friend" },
    { value: "social_media", label: "Social media" },
    { value: "telegram", label: "Telegram" },
    { value: "conference", label: "Conference / meeting" },
    { value: "web_search", label: "Web search" },
    { value: "other", label: "Other" },
]

type TrainingState = {
    isUsBoardCertified?: boolean
    isUsTrainee?: boolean
}

type AgreementState = {
    confirmAccuracy: boolean
    receiveCommunications: boolean
}

const MembershipApplicationForm = () => {
    const [training, setTraining] = useState<TrainingState>({})
    const [agreements, setAgreements] = useState<AgreementState>({
        confirmAccuracy: false,
        receiveCommunications: false,
    })

    const [form] = useForm<FieldType>()

    const resetMembership = () => {
        form.setFieldsValue({ membership: undefined })
    }

    const allowedMemberships = useMemo(() => {
        if (training.isUsBoardCertified === true) {
            return ["active"] as MembershipKey[]
        }

        if (training.isUsBoardCertified === false && training.isUsTrainee === true) {
            return ["trainee"] as MembershipKey[]
        }

        if (training.isUsBoardCertified === false && training.isUsTrainee === false) {
            return ["affiliate", "pathway"] as MembershipKey[]
        }

        return [] as MembershipKey[]
    }, [training.isUsBoardCertified, training.isUsTrainee])

    return (
        <Form form={form} layout="vertical" className={styles.form}>
            <div className={styles.blockInfoContainer}>
                <h2>Personal information</h2>
                <p>
                    Your basic contact information will be used for official ASRP communications
                    only and will not be shared
                    <br /> outside the Society without your permission.
                </p>
            </div>

            <div className={styles.grid}>
                <Form.Item label="First name" name="firstName" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Last name" name="lastName" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Middle name" name="middleName">
                    <Input />
                </Form.Item>

                <Form.Item label="Suffix" name="suffix">
                    <Input placeholder="Jr., Sr., III, etc." />
                </Form.Item>

                <Form.Item label="Credentials" name="credentials">
                    <Select allowClear placeholder="Select an option">
                        {credentialsOptions.map((c) => (
                            <Select.Option key={c} value={c}>
                                {c}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Phone" name="phone">
                    <Input />
                </Form.Item>

                <Form.Item label="Country" name="country" rules={[{ required: true }]}>
                    <Select placeholder="Select country">
                        {countries.map((c) => (
                            <Select.Option key={c.code} value={c.code}>
                                {c.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="State / Province" name="state" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="City" name="city" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </div>

            <div className={styles.blockInfoContainer}>
                <h2>Professional information</h2>
                <p>
                    This information helps us understand our membership and tailor programming to
                    the needs of our community. If you are not currently affiliated with any
                    institution and are applying for the Pathway member category, please enter N/A
                    in the field below and select "Other" in the "Job title / Role" field.
                </p>
            </div>

            <div className={styles.grid}>
                <Form.Item
                    label="Primary institution / affiliation"
                    name="primaryInstitution"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="e.g. University Hospital, Research Institute" />
                </Form.Item>
                <Form.Item label="Job title / role" name="jobTitle" rules={[{ required: true }]}>
                    <Select placeholder="Select an option">
                        {jobTitleOptions.map(({ value, label }) => (
                            <Select.Option key={value} value={value}>
                                {label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Primary practice setting" name="practiceSetting">
                    <Select placeholder="Select an option">
                        {practiceSettingOptions.map(({ value, label }) => (
                            <Select.Option key={value} value={value}>
                                {label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Subspecialty focus" name="subspecialty">
                    <Input placeholder="e.g. Hematopathology, Breast, GI, Cytopathology" />
                </Form.Item>
            </div>

            <div className={styles.blockInfoContainer}>
                <h2>Training in the U.S.</h2>
            </div>

            <div className={styles.trainingGrid}>
                <div>
                    <p>
                        Are you board-certified or board-eligible pathologists actively practicing
                        in the United States?
                    </p>

                    <Radio.Group
                        value={training.isUsBoardCertified}
                        onChange={(e) => {
                            setTraining({
                                isUsBoardCertified: e.target.value,
                                isUsTrainee: undefined,
                            })
                            resetMembership()
                        }}
                    >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                </div>

                {training.isUsBoardCertified === false && (
                    <div>
                        <p>
                            Are you a pathology resident, fellow, or a medical student actively
                            enrolled in a program in the United States? *
                        </p>

                        <Radio.Group
                            value={training.isUsTrainee}
                            onChange={(e) => {
                                setTraining((s) => ({
                                    ...s,
                                    isUsTrainee: e.target.value,
                                }))
                                resetMembership()
                            }}
                        >
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                        </Radio.Group>
                    </div>
                )}
            </div>

            <div className={styles.blockInfoContainer}>
                <h2>Membership category</h2>
            </div>

            <Form.Item name="membership">
                <Radio.Group>
                    <div className={styles.membershipCardsGrid}>
                        <MembershipCard
                            value="active"
                            title="Active member"
                            description="Board-certified or board-eligible pathologists actively practicing in the United States."
                            price="$120/year"
                            disabled={!allowedMemberships.includes("active")}
                        />

                        <MembershipCard
                            value="trainee"
                            title="Trainee member"
                            description="Pathology residents, fellows, and medical students."
                            price="$60/year"
                            disabled={!allowedMemberships.includes("trainee")}
                        />

                        <MembershipCard
                            value="affiliate"
                            title="Affiliate member"
                            description="Scientists, laboratory professionals, and colleagues."
                            price="$90/year"
                            disabled={!allowedMemberships.includes("affiliate")}
                        />

                        <MembershipCard
                            value="pathway"
                            title="Pathway member"
                            description="Individuals transitioning into a medical career in the U.S."
                            price="$30/year"
                            disabled={!allowedMemberships.includes("pathway")}
                        />
                    </div>
                </Radio.Group>
            </Form.Item>

            <div className={styles.blockInfoContainer}>
                <h2>Additional details</h2>
            </div>

            <div className={styles.grid}>
                <Form.Item label="How did you hear about ASRP?" name="referralSource">
                    <Select placeholder="Select an option" options={referralSourceOptions} />
                </Form.Item>

                <Form.Item label="Telegram username (optional)" name="telegramUsername">
                    <Input placeholder="@username" />
                </Form.Item>
            </div>

            <Form.Item
                label="Briefly tell us about your interest in ASRP (optional)"
                name="interestStatement"
            >
                <Input.TextArea
                    rows={4}
                    placeholder="E.g. areas of interest, how you hope to engage with the community, or topics you'd like to see covered."
                />
            </Form.Item>

            <div className={styles.blockInfoContainer}>
                <h2>Agreement & communications</h2>
            </div>

            <div className={styles.agreementBlock}>
                <div className={styles.checkboxContainer}>
                    <Checkbox
                        checked={agreements.confirmAccuracy}
                        onChange={(e) =>
                            setAgreements((s) => ({
                                ...s,
                                confirmAccuracy: e.target.checked,
                            }))
                        }
                    />
                    <p>
                        I confirm that the information provided in this application is accurate to
                        the best of my knowledge and that I meet the eligibility criteria for the
                        selected membership category<span className={styles.required}> *</span>.
                    </p>
                </div>

                <div className={styles.checkboxContainer}>
                    <Checkbox
                        checked={agreements.receiveCommunications}
                        onChange={(e) =>
                            setAgreements((s) => ({
                                ...s,
                                receiveCommunications: e.target.checked,
                            }))
                        }
                    />
                    <p>
                        I agree to receive membership-related communications from ASRP, including
                        newsletters, event invitations, and important Society updates. I understand
                        that I can update my communication preferences at any time.
                    </p>
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <div className={styles.submitInfo}>
                    <p>
                        After submitting this form, you will be redirected to complete your
                        membership payment. Your membership becomes active once payment is
                        confirmed.
                    </p>
                </div>
                <div className={styles.submitButtonContainer}>
                    <Button htmlType="submit" className={styles.submitButton}>
                        Submit & continue to payment
                    </Button>
                </div>
            </div>
        </Form>
    )
}

export default MembershipApplicationForm
