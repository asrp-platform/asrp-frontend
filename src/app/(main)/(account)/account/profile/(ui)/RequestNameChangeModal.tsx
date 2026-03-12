import { Modal, Form, Input, notification } from "antd"
import { setFormFieldsErrors } from "../../../../../../shared/helpers/setFormFieldsErrors.ts"
import { isAxiosError } from "axios"
import { useState } from "react"
import Loading from "../../../../about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import { getUserNameChangeRequestUrl } from "../../../../../../shared/backend/restApiUrls.ts"
import api from "../../../../../../axios.ts"

export interface ChangeNameFormValues {
    lastname: string
    firstname: string
    middlename?: string
    reason_change: string
}

interface IProps {
    userId: number | string
    open: boolean
    setNameChangeModalOpen: (_state: boolean) => void
}

const ChangeNameModal = ({ userId, open, setNameChangeModalOpen }: IProps) => {
    const [form] = Form.useForm<ChangeNameFormValues>()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleFinish = async (values: ChangeNameFormValues) => {
        try {
            setIsLoading(true)
            await api.post(getUserNameChangeRequestUrl(userId), values)
            setNameChangeModalOpen(false)
        } catch (error) {
            if (isAxiosError(error)) {
                setFormFieldsErrors(error, form)

                const status = error.response?.status
                const detail = error.response?.data?.detail

                if (status === 409) {
                    notification.error({
                        title: "Request conflict",
                        description: detail ?? "Name change request already exists",
                        showProgress: true,
                    })
                }
                if (status === 429) {
                    notification.warning({
                        title: "Too many requests",
                        description:
                            detail ??
                            "You are sending requests too quickly. Please try again later.",
                    })
                }
                if (status === 500) {
                    notification.error({
                        title: "Server error",
                        description: "Something went wrong on the server. Please try again later.",
                    })
                }
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        form.resetFields()
        setNameChangeModalOpen(false)
    }

    return (
        <Modal
            title="Request Name Change"
            open={open}
            onCancel={handleCancel}
            onOk={() => form.submit()}
            okText="Submit"
            cancelText="Cancel"
            getContainer={false}
            loading={isLoading}
        >
            {isLoading ? (
                <Loading />
            ) : (
                <Form<ChangeNameFormValues> form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item
                        label="Last name"
                        name="lastname"
                        rules={[{ required: true, message: "Enter new last name" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="First name"
                        name="firstname"
                        rules={[{ required: true, message: "Enter new first name" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Middle name" name="middlename">
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Reason change"
                        name="reason_change"
                        rules={[{ required: true, message: "Enter name change reason" }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            )}
        </Modal>
    )
}

export default ChangeNameModal
