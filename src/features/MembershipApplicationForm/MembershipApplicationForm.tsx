"use client"

import { Button, Checkbox, Form, type FormProps, Input, message, Radio, Select } from "antd"
import { useForm } from "antd/es/form/Form"
import styles from "@/features/MembershipApplicationForm/styles.module.scss"
import type { FieldType, MembershipKey } from "@/features/MembershipApplicationForm/types"
import { useMemo, useState } from "react"
import MembershipCard from "@/features/MembershipApplicationForm/ui/MembershipCard/MembershipCard.tsx"
import api from "@/axios.ts"
import { isAxiosError } from "axios"
import { setFormFieldsErrors } from "@/shared/helpers/setFormFieldsErrors.ts"
import { CURRENT_USER_MEMBERSHIP_REQUEST_URL } from "@/shared/backend/rest-api-urls/currentUserUrls.ts"
import Warning from "@/shared/ui/Warning/Warning.tsx"
import LinkButton from "@/shared/ui/Buttons/LinkButton.tsx"
import { useCurrentUserQuery } from "@shared/backend/queries/useCurrentUserQuery.ts"
import Loading from "@app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import MembershipApplicationProfessionalInformationFields from "@features/shared/MembershipApplicationProfessionalInformationFields/MembershipApplicationProfessionalInformationFields.tsx"
import { countries, credentialsOptions, referralSourceOptions } from "@shared/options.ts"
import type { PaymentCheckoutResponse } from "@shared/types/interfaces.ts"

type TrainingState = {
    isUsBoardCertified?: boolean
    isUsTrainee?: boolean
}

type AgreementState = {
    confirmAccuracy: boolean
    is_agrees_communications: boolean
}

const MembershipApplicationForm = () => {
    const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUserQuery()

    const [training, setTraining] = useState<TrainingState>({})
    const [agreements, setAgreements] = useState<AgreementState>({
        confirmAccuracy: false,
        is_agrees_communications: false,
    })
    const [isFormSubmitting, setIsFormSubmitting] = useState(false)

    const isFormDisabled = useMemo(() => !currentUser, [currentUser])

    const initialValues = useMemo(
        () => ({
            firstname: currentUser?.firstname,
            lastname: currentUser?.lastname,
            middlename: currentUser?.middlename,
            suffix: currentUser?.suffix,
            credentials: currentUser?.credentials,
            email: currentUser?.email,
            phone: currentUser?.phone_number,
            country: currentUser?.country,
            state: currentUser?.state,
            city: currentUser?.city,
        }),
        [currentUser],
    )

    const [form] = useForm<FieldType>()

    const resetMembership = () => {
        form.setFieldsValue({ membership_type: undefined })
    }

    const allowedMemberships = useMemo(() => {
        if (training.isUsBoardCertified === true) {
            return ["ACTIVE"] as MembershipKey[]
        }

        if (training.isUsBoardCertified === false && training.isUsTrainee === true) {
            return ["TRAINEE"] as MembershipKey[]
        }

        if (training.isUsBoardCertified === false && training.isUsTrainee === false) {
            return ["AFFILIATE", "PATHWAY"] as MembershipKey[]
        }

        return [] as MembershipKey[]
    }, [training.isUsBoardCertified, training.isUsTrainee])

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            setIsFormSubmitting(true)

            const data = {
                membership: {
                    primary_affiliation: values.primary_affiliation,
                    job_title: values.job_title,
                    practice_setting: values.practice_setting,
                    subspecialty: values.subspecialty,
                },
                membership_type: values.membership_type,
                feedback_additional_info: {
                    hear_about_asrp: values.hear_about_asrp,
                    tg_username: values.tg_username,
                    interest_description: values.interest_description,
                },
                is_agrees_communications: agreements.is_agrees_communications,
            }

            const response = await api.post<PaymentCheckoutResponse>(
                CURRENT_USER_MEMBERSHIP_REQUEST_URL,
                data,
            )
            window.location.href = response.data.checkout_session_url
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                if (error.response?.status === 401) {
                    message.error(
                        "Your session has expired or you are not authorized. Please sign in and try again.",
                    )
                    return
                } else if (error.response?.status === 422) {
                    setFormFieldsErrors(error, form)
                    return
                } else {
                    message.error(error.message)
                }
            }
        } finally {
            setIsFormSubmitting(false)
        }
    }

    if (isCurrentUserLoading) {
        return <Loading />
    }

    return (
        <Form
            form={form}
            layout="vertical"
            className={styles.form}
            onFinish={onFinish}
            disabled={isFormDisabled}
            initialValues={initialValues}
        >
            {isFormDisabled && (
                <Warning>
                    <p>
                        To complete your membership application, please sign in to your account.
                        <br />
                        Once signed in, you’ll be able to fill out the form and proceed with your
                        application.
                    </p>
                    <LinkButton href="/login" variant="blue">
                        Sign Up
                    </LinkButton>
                </Warning>
            )}

            <div className={styles.blockInfoContainer}>
                <h2>Personal information</h2>
                <p>
                    Your basic contact information will be used for official ASRP communications
                    only and will not be shared
                    <br /> outside the Society without your permission.
                </p>
            </div>

            <div className={styles.grid}>
                <Form.Item label="First name" name="firstname" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Last name" name="lastname" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Middle name" name="middlename">
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

                <Form.Item label="City" name="city" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="State (required if in US)"
                    name="state"
                    rules={[{ required: false }]}
                >
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
                <MembershipApplicationProfessionalInformationFields />
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

            <Form.Item name="membership_type">
                <Radio.Group>
                    <div className={styles.membershipCardsGrid}>
                        <MembershipCard
                            value="ACTIVE"
                            title="Active member"
                            description="Board-certified or board-eligible pathologists actively practicing in the United States."
                            price="$120/year"
                            disabled={!allowedMemberships.includes("ACTIVE")}
                        />

                        <MembershipCard
                            value="TRAINEE"
                            title="Trainee member"
                            description="Pathology residents, fellows, and medical students."
                            price="$60/year"
                            disabled={!allowedMemberships.includes("TRAINEE")}
                        />

                        <MembershipCard
                            value="AFFILIATE"
                            title="Affiliate member"
                            description="Scientists, laboratory professionals, and colleagues."
                            price="$90/year"
                            disabled={!allowedMemberships.includes("AFFILIATE")}
                        />

                        <MembershipCard
                            value="PATHWAY"
                            title="Pathway member"
                            description="Individuals transitioning into a medical career in the U.S."
                            price="$30/year"
                            disabled={!allowedMemberships.includes("PATHWAY")}
                        />
                    </div>
                </Radio.Group>
            </Form.Item>

            <div className={styles.blockInfoContainer}>
                <h2>Additional details</h2>
            </div>

            <div className={styles.grid}>
                <Form.Item
                    label="How did you hear about ASRP?"
                    name="hear_about_asrp"
                    rules={[{ required: true }]}
                >
                    <Select placeholder="Select an option" options={referralSourceOptions} />
                </Form.Item>

                <Form.Item label="Telegram username (optional)" name="tg_username">
                    <Input placeholder="@username" />
                </Form.Item>
            </div>

            <Form.Item
                label="Briefly tell us about your interest in ASRP (optional)"
                name="interest_description"
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
                        checked={agreements.is_agrees_communications}
                        onChange={(e) =>
                            setAgreements((s) => ({
                                ...s,
                                is_agrees_communications: e.target.checked,
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
                    <Button
                        htmlType="submit"
                        className={styles.submitButton}
                        loading={isFormSubmitting}
                    >
                        Submit & continue to payment
                    </Button>
                </div>
            </div>
        </Form>
    )
}

export default MembershipApplicationForm
