import { Flex, Form, Input, message, Modal } from "antd"
import { handleApiError } from "@/shared/helpers/formsHelpers.ts"
import { useState } from "react"
import api from "@/axios.ts"
import { CURRENT_USER_NAME_CHANGE_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"

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

    const handleFinish = async (values: ChangeNameFormValues) => {
        try {
            setIsLoading(true)
            await api.post(CURRENT_USER_NAME_CHANGE_URL, values)

            message.success("Name change request submitted successfully")
            form.resetFields()
            setNameChangeModalOpen(false)
        } catch (error) {
            handleApiError({
                error,
                form,
                statusMessages: {
                    409: "Name change request already exists.",
                    429: "You are sending requests too quickly. Please try again later.",
                    500: "Something went wrong on the server. Please try again later.",
                },
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        if (isLoading) return

        form.resetFields()
        setNameChangeModalOpen(false)
    }

    return (
        <Modal
            title="Request Name Change"
            open={open}
            onCancel={handleCancel}
            footer={null}
            closable={!isLoading}
            maskClosable={!isLoading}
            getContainer={false}
        >
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

                <Flex justify="space-between" gap={12}>
                    <CustomButton disabled={isLoading} onClick={handleCancel}>
                        Cancel
                    </CustomButton>
                    <CustomButton loading={isLoading} htmlType="submit" variant="green">
                        Submit
                    </CustomButton>
                </Flex>
            </Form>
        </Modal>
    )
}

export default ChangeNameModal
