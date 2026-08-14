import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"
import { Alert, Modal, Form, Select, message } from "antd"
import { useEffect, useMemo, useState } from "react"
import { useMembershipTypesQuery } from "@shared/backend/queries/membership/useMembershipTypesQuery.ts"
import MembershipApplicationProfessionalInformationFields from "@features/shared/MembershipApplicationProfessionalInformationFields/MembershipApplicationProfessionalInformationFields.tsx"
import Loading from "@app/(main)/about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import {
    CURRENT_USER_MEMBERSHIP_REQUEST_QUERY_KEY,
    useCurrentUserMembershipRequestQuery,
} from "@shared/backend/queries/membership/useCurrentUserMembershipRequestQuery.ts"
import api from "@/axios.ts"
import { CURRENT_USER_MEMBERSHIP_REQUEST_REAPPLIES_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import { handleFormError } from "@shared/helpers/setFormFieldsErrors.ts"
import { useQueryClient } from "@tanstack/react-query"
import type { PaymentCheckoutResponse } from "@shared/interfaces.ts"

type ReapplyMembershipFormValues = {
    primary_affiliation: string
    job_title: string
    practice_setting: string
    subspecialty: string
    membership_type_id: number
}

const ReapplyMembershipButton = () => {
    const queryClient = useQueryClient()
    const { data: membershipTypes, isLoading: isMembershipTypesLoading } = useMembershipTypesQuery({
        is_purchasable: true,
    })
    const { data: currentUserMembershipRequest, isLoading: isCurrentUserMembershipRequestLoading } =
        useCurrentUserMembershipRequestQuery()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form] = Form.useForm<ReapplyMembershipFormValues>()

    const onSubmit = async () => {
        try {
            const values = await form.validateFields()

            setIsSubmitting(true)

            const response = await api.post<PaymentCheckoutResponse>(
                CURRENT_USER_MEMBERSHIP_REQUEST_REAPPLIES_URL,
                values,
            )

            message.success("Your membership application has been resubmitted successfully.")

            await queryClient.invalidateQueries({
                queryKey: CURRENT_USER_MEMBERSHIP_REQUEST_QUERY_KEY,
            })

            window.location.href = response.data.checkout_session_url

            setIsModalOpen(false)
        } catch (error: unknown) {
            handleFormError(error, form)
        } finally {
            setIsSubmitting(false)
        }
    }

    const membershipTypesOptions = membershipTypes?.map((t) => ({
        label: t.name,
        value: Number(t.id),
    }))

    const initialValues = useMemo<Partial<ReapplyMembershipFormValues>>(
        () => ({
            primary_affiliation: currentUserMembershipRequest?.primary_affiliation,
            job_title: currentUserMembershipRequest?.job_title,
            practice_setting: currentUserMembershipRequest?.practice_setting,
            subspecialty: currentUserMembershipRequest?.subspecialty,
            membership_type_id: Number(currentUserMembershipRequest?.membership_type_id),
        }),
        [currentUserMembershipRequest],
    )

    useEffect(() => {
        if (isModalOpen && currentUserMembershipRequest) {
            form.setFieldsValue(initialValues)
        }
    }, [currentUserMembershipRequest, form, initialValues, isModalOpen])

    const isLoading = isMembershipTypesLoading || isCurrentUserMembershipRequestLoading

    const handleCancel = () => {
        if (isSubmitting) {
            return
        }

        form.setFieldsValue(initialValues)
        setIsModalOpen(false)
    }

    return (
        <>
            <CustomButton onClick={() => setIsModalOpen(true)} variant={"primary"}>
                Reapply
            </CustomButton>
            <Modal
                title={<h3>Reapply membership application</h3>}
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={onSubmit}
                okText="Submit reapplication"
                cancelText="Cancel"
                confirmLoading={isSubmitting}
                okButtonProps={{
                    disabled: isLoading,
                }}
                cancelButtonProps={{
                    disabled: isSubmitting,
                }}
                centered
            >
                {isLoading ? (
                    <Loading />
                ) : (
                    <Form
                        layout="vertical"
                        form={form}
                        initialValues={initialValues}
                        disabled={isSubmitting}
                    >
                        <Alert
                            type="info"
                            showIcon
                            title="Review your details before resubmitting."
                            description="After submission, your updated membership application will be sent for another review."
                            style={{ marginBottom: 16 }}
                        />
                        <MembershipApplicationProfessionalInformationFields />
                        <Form.Item
                            name="membership_type_id"
                            label="Membership type"
                            rules={[{ required: true, message: "Please choose membership type" }]}
                        >
                            <Select
                                placeholder={"Select the membership type"}
                                options={membershipTypesOptions}
                            />
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </>
    )
}

export default ReapplyMembershipButton
