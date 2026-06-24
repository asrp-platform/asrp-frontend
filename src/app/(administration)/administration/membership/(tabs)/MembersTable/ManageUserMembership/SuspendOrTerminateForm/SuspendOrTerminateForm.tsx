import { type Dispatch, type SetStateAction } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
    Alert,
    Button,
    Checkbox,
    DatePicker,
    Flex,
    Form,
    Input,
    message,
    Space,
    Typography,
} from "antd"
import { isAxiosError } from "axios"
import type { Dayjs } from "dayjs"
import type { IUserMembership } from "@entities/Membership.ts"
import api from "@/axios.ts"
import { getMembershipRestrictionsUrl } from "@shared/backend/restApiUrls/admin/membershipsAdminUrls.ts"
import { setFormFieldsErrors } from "@shared/helpers/setFormFieldsErrors.ts"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"

type ManageMembershipFormValues = {
    temporary_suspension: boolean
    suspended_until?: Dayjs
    reason: string
}

type ManageMembershipPayload = {
    membershipId: string | number
    temporarySuspension: boolean
    suspendedUntil?: Dayjs
    reason: string
}

interface IProps {
    userMembership: IUserMembership
    setOpen: Dispatch<SetStateAction<boolean>>
}

const manageMembership = async ({
    membershipId,
    temporarySuspension,
    suspendedUntil,
    reason,
}: ManageMembershipPayload) => {
    const response = await api.post(getMembershipRestrictionsUrl(membershipId), {
        reason,
        suspended_until: temporarySuspension ? suspendedUntil?.endOf("day").toISOString() : null,
    })

    return response.data
}

const SuspendOrTerminateForm = ({ userMembership, setOpen }: IProps) => {
    const queryClient = useQueryClient()
    const [form] = Form.useForm<ManageMembershipFormValues>()

    const temporarySuspension = Form.useWatch("temporary_suspension", form) ?? false
    const isTerminated = userMembership.terminated
    const isSuspended = userMembership.is_suspended
    const canSuspend = !isTerminated && !isSuspended
    const canSubmit = !isTerminated
    const actionLabel = temporarySuspension ? "Suspend" : "Terminate"

    const mutation = useMutation({
        mutationFn: manageMembership,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["members"],
            })
            message.success(
                variables.temporarySuspension
                    ? "Membership suspended temporarily."
                    : "Membership terminated.",
            )
            setOpen(false)
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                if (error.response?.status === 422) {
                    setFormFieldsErrors(error, form)
                    return
                }

                if (error.response?.status === 409) {
                    message.error(error.response?.data?.detail || "Something went wrong.")
                    return
                }
            }

            message.error(
                temporarySuspension
                    ? "Could not suspend membership."
                    : "Could not terminate membership.",
            )
        },
    })

    const handleSubmit = (values: ManageMembershipFormValues) => {
        if (!canSubmit) {
            return
        }

        mutation.mutate({
            membershipId: userMembership.id,
            temporarySuspension: values.temporary_suspension,
            suspendedUntil: values.suspended_until,
            reason: values.reason.trim(),
        })
    }

    const handleClose = () => {
        if (!mutation.isPending) {
            setOpen(false)
        }
    }

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={{
                temporary_suspension: false,
            }}
            onFinish={handleSubmit}
        >
            {isTerminated && (
                <Alert
                    showIcon
                    type="error"
                    title="This membership is already terminated."
                    description={
                        <Flex vertical gap={4}>
                            {userMembership.terminated_at && (
                                <Typography.Text>
                                    Terminated at: {formatDatetime(userMembership.terminated_at)}
                                </Typography.Text>
                            )}
                            {userMembership.termination_reason && (
                                <Typography.Text>
                                    Reason: {userMembership.termination_reason}
                                </Typography.Text>
                            )}
                        </Flex>
                    }
                />
            )}

            {!isTerminated && isSuspended && (
                <Alert
                    showIcon
                    type="warning"
                    title="This membership is already suspended."
                    description={
                        <Flex vertical gap={4}>
                            {userMembership.suspended_at && (
                                <Typography.Text>
                                    Suspended at: {formatDatetime(userMembership.suspended_at)}
                                </Typography.Text>
                            )}
                            {userMembership.suspended_until && (
                                <Typography.Text>
                                    Suspended until:{" "}
                                    {formatDatetime(userMembership.suspended_until)}
                                </Typography.Text>
                            )}
                            {userMembership.suspension_reason && (
                                <Typography.Text>
                                    Reason: {userMembership.suspension_reason}
                                </Typography.Text>
                            )}
                            <Typography.Text>
                                You can terminate it, but it cannot be suspended again.
                            </Typography.Text>
                        </Flex>
                    }
                />
            )}

            {canSuspend && (
                <Form.Item name="temporary_suspension" valuePropName="checked">
                    <Checkbox>Temporary suspension</Checkbox>
                </Form.Item>
            )}

            {canSuspend && temporarySuspension && (
                <Form.Item
                    label="Suspend until"
                    name="suspended_until"
                    rules={[
                        {
                            required: true,
                            message: "Please select suspension end date.",
                        },
                    ]}
                >
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
            )}

            {!isTerminated && (
                <Form.Item
                    label="Reason"
                    name="reason"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: `Please enter membership ${
                                temporarySuspension ? "suspension" : "termination"
                            } reason.`,
                        },
                    ]}
                >
                    <Input.TextArea
                        rows={4}
                        maxLength={500}
                        showCount
                        placeholder={`Please enter membership ${
                            temporarySuspension ? "suspension" : "termination"
                        } reason`}
                    />
                </Form.Item>
            )}

            <Flex vertical gap={10} style={{ marginTop: 30 }}>
                {!isTerminated && (
                    <Alert
                        showIcon
                        type={temporarySuspension ? "warning" : "error"}
                        title={
                            temporarySuspension
                                ? "The membership will be suspended until the selected date."
                                : "The membership will be terminated permanently."
                        }
                    />
                )}

                <Flex justify="flex-end">
                    <Space>
                        <Button disabled={mutation.isPending} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            danger
                            type="primary"
                            disabled={!canSubmit}
                            loading={mutation.isPending}
                            onClick={() => form.submit()}
                        >
                            {actionLabel}
                        </Button>
                    </Space>
                </Flex>
            </Flex>
        </Form>
    )
}

export default SuspendOrTerminateForm
