import { Modal, Form, Input, message } from "antd"
import { setFormFieldsErrors } from "../../../../../../shared/helpers/setFormFieldsErrors.ts"
import { isAxiosError } from "axios"
import { useState } from "react"
import Loading from "../../../../about/directors-board/(components)/ViewCard/ui/Loading.tsx"
import api from "../../../../../../axios.ts"
import { CURRENT_USER_NAME_CHANGE_URL } from "../../../../../../shared/backend/currentUserUrls.ts"

export interface ChangeNameFormValues {
    lastname: string
    firstname: string
    middlename?: string
    reason_change: string
}

interface IProps {
    open: boolean
    setNameChangeModalOpen: (_state: boolean) => void
}

const ChangeNameModal = ({ open, setNameChangeModalOpen }: IProps) => {
    const [form] = Form.useForm<ChangeNameFormValues>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [messageApi, contextHolder] = message.useMessage()

    const handleFinish = async (values: ChangeNameFormValues) => {
        try {
            setIsLoading(true)
            await api.post(CURRENT_USER_NAME_CHANGE_URL, values)

            messageApi.success("Name change request submitted successfully")
            form.resetFields()
            setNameChangeModalOpen(false)
        } catch (error) {
            if (isAxiosError(error)) {
                setFormFieldsErrors(error, form)

                const status = error.response?.status
                const detail = error.response?.data?.detail

                if (status === 409) {
                    messageApi.error(detail ?? "Name change request already exists")
                } else if (status === 429) {
                    messageApi.warning(
                        detail ?? "You are sending requests too quickly. Please try again later.",
                    )
                } else if (status === 500) {
                    messageApi.error("Something went wrong on the server. Please try again later.")
                } else {
                    messageApi.error(detail ?? "Failed to submit name change request")
                }
            } else {
                messageApi.error("Unexpected error occurred")
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
        <>
            {contextHolder}

            <Modal
                title="Request Name Change"
                open={open}
                onCancel={handleCancel}
                onOk={() => form.submit()}
                okText="Submit"
                cancelText="Cancel"
                getContainer={false}
                confirmLoading={isLoading}
            >
                {isLoading ? (
                    <Loading />
                ) : (
                    <Form<ChangeNameFormValues>
                        form={form}
                        layout="vertical"
                        onFinish={handleFinish}
                    >
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
        </>
    )
}

export default ChangeNameModal
