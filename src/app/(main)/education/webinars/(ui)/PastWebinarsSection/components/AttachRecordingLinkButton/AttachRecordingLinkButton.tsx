"use client"

import { Form, Input, message, Modal } from "antd"
import { Link2 } from "lucide-react"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import api from "@/axios.ts"
import type { IWebinar } from "@entities/News.ts"
import { getWebinarDetailAdminUrl } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { handleFormError } from "@shared/helpers/setFormFieldsErrors.ts"
import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"

import styles from "./AttachRecordingLinkButton.module.scss"

interface IProps {
    webinar: IWebinar
}

interface IFormValues {
    recording_link: string
}

const AttachRecordingLinkButton = ({ webinar }: IProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [form] = Form.useForm<IFormValues>()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async ({ recording_link }: IFormValues) => {
            await api.patch(getWebinarDetailAdminUrl(webinar.id), {
                recording_link: recording_link || null,
            })
        },
        onSuccess: async (_, { recording_link }) => {
            await queryClient.invalidateQueries({ queryKey: ["pastWebinars"] })
            setIsOpen(false)
            message.success(
                recording_link
                    ? "Recording link saved successfully."
                    : "Recording link removed successfully.",
            )
        },
        onError: (error: unknown) => {
            handleFormError(error, form)
        },
    })

    const openModal = () => {
        form.setFieldsValue({ recording_link: webinar.recording_link ?? "" })
        setIsOpen(true)
    }

    return (
        <>
            <button
                type="button"
                className={styles.trigger}
                aria-label={`${webinar.recording_link ? "Update" : "Attach"} recording link for ${webinar.title}`}
                onClick={openModal}
            >
                <Link2 size={18} />
                <span>{webinar.recording_link ? "Update recording" : "Attach recording"}</span>
            </button>

            <Modal
                open={isOpen}
                title={webinar.recording_link ? "Update recording link" : "Attach recording link"}
                width={560}
                footer={null}
                destroyOnHidden
                onCancel={() => setIsOpen(false)}
            >
                <p className={styles.description}>
                    Add a recording URL for <strong>{webinar.title}</strong>.
                </p>
                <Form<IFormValues>
                    form={form}
                    layout="vertical"
                    className={styles.form}
                    onFinish={(values) => mutation.mutate(values)}
                >
                    <Form.Item
                        label="Recording link"
                        name="recording_link"
                        extra="Leave this field empty to remove the existing recording link."
                        rules={[{ type: "url", message: "Enter a valid URL" }]}
                    >
                        <Input
                            prefix={<Link2 size={16} />}
                            placeholder="https://example.com/webinars/recording"
                        />
                    </Form.Item>
                    <div className={styles.actions}>
                        <CustomButton onClick={() => setIsOpen(false)}>Cancel</CustomButton>
                        <CustomButton
                            loading={mutation.isPending}
                            htmlType="submit"
                            variant="green"
                        >
                            Save recording link
                        </CustomButton>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default AttachRecordingLinkButton
