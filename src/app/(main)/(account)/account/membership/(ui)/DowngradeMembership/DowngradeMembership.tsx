import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"
import { Alert, Form, Input, message, Modal, Select } from "antd"
import { useState } from "react"
import { useCurrentUserMembershipQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipQuery.ts"
import { useMembershipTypesQuery } from "@shared/backend/queries/membership/useMembershipTypesQuery.ts"
import api from "@/axios.ts"
import { CURRENT_USER_MEMBERSHIP_DOWNGRADE_REQUEST_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"
import { useQueryClient } from "@tanstack/react-query"
import { CURRENT_USER_MEMBERSHIP_DOWNGRADE_REQUEST_QUERY_KEY } from "@shared/backend/queries/membership/useCurrentUserMembershipDowngradeRequestQuery.ts"

type DowngradeMembershipFormValues = {
    target_membership_type_id: number
    reason_changing: string
}

interface DowngradeMembershipProps {
    disabled?: boolean
}

const DowngradeMembership = ({ disabled }: DowngradeMembershipProps) => {
    const queryClient = useQueryClient()
    const [form] = Form.useForm<DowngradeMembershipFormValues>()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { data: membership } = useCurrentUserMembershipQuery()
    const { data: membershipTypes, isLoading: isMembershipTypesLoading } = useMembershipTypesQuery(
        {
            price_usd__lt: Number(membership?.membership_type.price_usd),
            is_purchasable: true,
        },
        !!membership,
    )

    const membershipTypeOptions = membershipTypes?.map((type) => ({
        value: Number(type.id),
        label: `${type.name} - $${type.price_usd}`,
    }))

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()

            setIsSubmitting(true)

            await api.post(CURRENT_USER_MEMBERSHIP_DOWNGRADE_REQUEST_URL, {
                ...values,
                upgrade: false,
            })

            message.success("Your downgrade request has been submitted for review.")

            await queryClient.invalidateQueries({
                queryKey: CURRENT_USER_MEMBERSHIP_DOWNGRADE_REQUEST_QUERY_KEY,
            })

            form.resetFields()
            setIsModalOpen(false)
        } catch (error: unknown) {
            handleApiError({
                error,
                form,
                statusMessages: {
                    409: "You already have a pending membership type change request.",
                },
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        if (isSubmitting) {
            return
        }

        form.resetFields()
        setIsModalOpen(false)
    }

    return (
        <>
            <CustomButton
                variant={"primary"}
                onClick={() => setIsModalOpen(true)}
                disabled={disabled}
            >
                Downgrade membership
            </CustomButton>
            <Modal
                title={<h3>Downgrade membership</h3>}
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleSubmit}
                okText="Submit downgrade request"
                cancelText="Cancel"
                confirmLoading={isSubmitting}
                okButtonProps={{
                    disabled: isMembershipTypesLoading || !membershipTypes?.length,
                }}
                cancelButtonProps={{
                    disabled: isSubmitting,
                }}
                getContainer={false}
                centered
            >
                <Alert
                    type="info"
                    showIcon
                    title="Downgrade requests require approval."
                    description="If you request a change from a more expensive membership type to a less expensive one, your current membership type will remain active until an administrator approves the downgrade. If the request is rejected, your membership type will not change."
                    style={{ marginBottom: 16 }}
                />

                <Form form={form} layout="vertical" disabled={isSubmitting}>
                    <Form.Item
                        name="target_membership_type_id"
                        label="New membership type"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please select the membership type you want to downgrade to.",
                            },
                        ]}
                    >
                        <Select
                            placeholder={"Select membership type"}
                            loading={isMembershipTypesLoading}
                            options={membershipTypeOptions}
                            notFoundContent="No cheaper membership types are available."
                        />
                    </Form.Item>

                    <Form.Item
                        name="reason_changing"
                        label="Reason for downgrade"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: "Please enter the reason for your downgrade request.",
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={4}
                            maxLength={500}
                            showCount
                            placeholder="Briefly explain why you want to downgrade your membership."
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default DowngradeMembership
