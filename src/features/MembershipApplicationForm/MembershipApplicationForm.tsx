"use client"

import { Button, Checkbox, Form, type FormProps, Input, Radio, Select } from "antd"
import { useForm } from "antd/es/form/Form"
import styles from "@/features/MembershipApplicationForm/styles.module.scss"
import type { FieldType, MembershipKey } from "@/features/MembershipApplicationForm/types"
import { useMemo, useState } from "react"
import MembershipCard from "@/features/MembershipApplicationForm/ui/MembershipCard/MembershipCard.tsx"
import api from "@/axios.ts"
import { handleApiError } from "@/shared/helpers/formsHelpers.ts"
import {
    CURRENT_USER_MEMBERSHIP_REQUEST_URL,
    hearAboutOptionsUrl,
} from "@shared/backend/restApiUrls/restApiUrls.ts"
import { useCurrentUserQuery } from "@shared/backend/queries/useCurrentUserQuery.ts"
import type { PaymentCheckoutResponse } from "@shared/interfaces.ts"
import { useCurrentUserMembershipQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipQuery.ts"
import { useCurrentUserMembershipRequestQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipRequestQuery.ts"
import MembershipApplicationAvailabilityAlert from "@features/MembershipApplicationForm/ui/MembershipApplicationAvailabilityAlert/MembershipApplicationAvailabilityAlert.tsx"
import { useMutation, useQuery } from "@tanstack/react-query"
import AuthenticationRequiredWarning from "@features/MembershipApplicationForm/ui/AuthenticationRequiredWarning/AuthenticationRequiredWarning.tsx"

import MembershipApplicationSkeleton from "./ui/MembershipApplicationSkeleton/MembershipApplicationSkeleton"
import FormSectionHeader from "./ui/FormSectionHeader/FormSectionHeader"
import FormFieldsGrid from "./ui/FormFieldsGrid/FormFieldsGrid"
import ProfessionalInformationSection from "./ui/ProfessionalInformationSection/ProfessionalInformationSection"

type TrainingState = {
    isUsBoardCertified?: boolean
    isUsTrainee?: boolean
}

const initialValues = {
    confirmAccuracy: false,
    is_agrees_communications: false,
}

const MembershipApplicationForm = () => {
    const { data: referralSourceOptions = [] } = useQuery({
        queryKey: ["hear-about-options"],
        queryFn: async () => {
            const response = await api.get<Array<Record<string, string>>>(hearAboutOptionsUrl)
            return response.data
        },
        staleTime: 1000 * 60 * 60,
    })

    const { data: currentUser, isFetching: isCurrentUserFetching } = useCurrentUserQuery()

    const isAuthorized = Boolean(currentUser)

    const { data: currentUserMembership, isFetching: isCurrentUserMembershipFetching } =
        useCurrentUserMembershipQuery(isAuthorized)
    const {
        data: currentUserMembershipRequest,
        isFetching: isCurrentUserMembershipRequestFetching,
    } = useCurrentUserMembershipRequestQuery(
        isAuthorized && !isCurrentUserMembershipFetching && !currentUserMembership,
    )

    const [training, setTraining] = useState<TrainingState>({})
    const isLoading =
        isCurrentUserFetching ||
        isCurrentUserMembershipFetching ||
        isCurrentUserMembershipRequestFetching

    const isFormDisabled = useMemo(
        () =>
            !currentUser || Boolean(currentUserMembership) || Boolean(currentUserMembershipRequest),
        [currentUser, currentUserMembership, currentUserMembershipRequest],
    )

    const [form] = useForm<FieldType>()

    const resetMembership = () => {
        form.setFields([{ name: "membership_type", value: undefined, errors: [] }])
    }

    const clearChangedFieldErrors: FormProps<FieldType>["onValuesChange"] = (changedValues) => {
        const changedFieldNames = Object.keys(changedValues) as Array<keyof FieldType>

        form.setFields(
            changedFieldNames.map((name) => ({
                name,
                errors: [],
            })),
        )
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

    const submitApplication = useMutation({
        mutationFn: async (values: FieldType) => {
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
                is_agrees_communications: values.is_agrees_communications,
            }

            const response = await api.post<PaymentCheckoutResponse>(
                CURRENT_USER_MEMBERSHIP_REQUEST_URL,
                data,
            )
            return response.data
        },
        onSuccess: (data) => {
            window.location.href = data.checkout_session_url
        },
        onError: (error) => handleApiError({ error, form }),
    })

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        if (isFormDisabled || isLoading || submitApplication.isPending) return
        submitApplication.mutate(values)
    }

    const formAlreadySubmitted =
        currentUser && (currentUserMembership || currentUserMembershipRequest)

    if (isLoading) {
        return <MembershipApplicationSkeleton />
    }

    return (
        <Form
            form={form}
            layout="vertical"
            className={styles.form}
            onFinish={onFinish}
            onValuesChange={clearChangedFieldErrors}
            disabled={isFormDisabled || submitApplication.isPending}
            initialValues={initialValues}
            scrollToFirstError
        >
            {!currentUser && <AuthenticationRequiredWarning />}

            {formAlreadySubmitted && (
                <MembershipApplicationAvailabilityAlert
                    membership={currentUserMembership}
                    membershipRequest={currentUserMembershipRequest}
                />
            )}

            <ProfessionalInformationSection />

            <FormSectionHeader title="Training in the U.S." />

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

            <FormSectionHeader title="Membership category" />

            <Form.Item
                name="membership_type"
                rules={[
                    {
                        required: true,
                        message: "Please select a membership category.",
                    },
                ]}
            >
                <Radio.Group>
                    <div className={styles.membershipCardsGrid}>
                        <MembershipCard
                            value="ACTIVE"
                            title="Full member"
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

            <FormSectionHeader title="Additional details" />

            <FormFieldsGrid>
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
            </FormFieldsGrid>

            <Form.Item
                label="Briefly tell us about your interest in ASRP (optional)"
                name="interest_description"
            >
                <Input.TextArea
                    rows={4}
                    placeholder="E.g. areas of interest, how you hope to engage with the community, or topics you'd like to see covered."
                />
            </Form.Item>

            <FormSectionHeader title="Agreement & communications" />

            <div className={styles.agreementBlock}>
                <Form.Item<FieldType> noStyle shouldUpdate>
                    {({ getFieldError }) => {
                        const hasConfirmAccuracyError = getFieldError("confirmAccuracy").length > 0

                        return (
                            <div
                                className={[
                                    styles.checkboxContainer,
                                    hasConfirmAccuracyError ? styles.checkboxContainerError : "",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                <Form.Item<FieldType>
                                    name="confirmAccuracy"
                                    valuePropName="checked"
                                    noStyle
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                value
                                                    ? Promise.resolve()
                                                    : Promise.reject(
                                                          new Error(
                                                              "Please confirm the information accuracy",
                                                          ),
                                                      ),
                                        },
                                    ]}
                                >
                                    <Checkbox />
                                </Form.Item>
                                <p>
                                    I confirm that the information provided in this application is
                                    accurate to the best of my knowledge and that I meet the
                                    eligibility criteria for the selected membership category
                                    <span className={styles.required}> *</span>.
                                </p>
                            </div>
                        )
                    }}
                </Form.Item>

                <div className={styles.checkboxContainer}>
                    <Form.Item<FieldType>
                        name="is_agrees_communications"
                        valuePropName="checked"
                        noStyle
                    >
                        <Checkbox />
                    </Form.Item>
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
                        loading={submitApplication.isPending}
                    >
                        Submit & continue to payment
                    </Button>
                </div>
            </div>
        </Form>
    )
}

export default MembershipApplicationForm
