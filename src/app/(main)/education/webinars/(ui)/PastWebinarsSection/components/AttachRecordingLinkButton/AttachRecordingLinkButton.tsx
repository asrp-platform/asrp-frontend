"use client"

import { Form, Input, message, Modal } from "antd"
import { Video } from "lucide-react"
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
    bunny_video_id: string
}

const BUNNY_VIDEO_ID_PATTERN =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const AttachRecordingButton = ({ webinar }: IProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [form] = Form.useForm<IFormValues>()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async ({ bunny_video_id }: IFormValues) => {
            const normalizedVideoId = bunny_video_id.trim()

            await api.patch(getWebinarDetailAdminUrl(webinar.id), {
                bunny_video_id: normalizedVideoId || null,
            })

            return normalizedVideoId
        },
        onSuccess: async (bunnyVideoId) => {
            await queryClient.invalidateQueries({ queryKey: ["pastWebinars"] })
            setIsOpen(false)
            message.success(
                bunnyVideoId
                    ? "Bunny video ID saved successfully."
                    : "Bunny video ID removed successfully.",
            )
        },
        onError: (error: unknown) => {
            handleFormError(error, form)
        },
    })

    const openModal = () => {
        form.setFieldsValue({ bunny_video_id: webinar.bunny_video_id ?? "" })
        setIsOpen(true)
    }

    return (
        <>
            <button
                type="button"
                className={styles.trigger}
                aria-label={`${webinar.bunny_video_id ? "Update" : "Attach"} recording for ${webinar.title}`}
                onClick={openModal}
            >
                <Video size={18} />
                <span>{webinar.bunny_video_id ? "Update recording" : "Attach recording"}</span>
            </button>

            <Modal
                open={isOpen}
                title={webinar.bunny_video_id ? "Update recording" : "Attach recording"}
                width={560}
                footer={null}
                destroyOnHidden
                onCancel={() => setIsOpen(false)}
            >
                <p className={styles.description}>
                    Add a Bunny video ID for <strong>{webinar.title}</strong>.
                </p>
                <Form<IFormValues>
                    form={form}
                    layout="vertical"
                    className={styles.form}
                    onFinish={(values) => mutation.mutate(values)}
                >
                    <Form.Item
                        label="Bunny video ID"
                        name="bunny_video_id"
                        extra="Leave this field empty to remove the existing recording."
                        normalize={(value: string) => value.trim()}
                        rules={[
                            {
                                pattern: BUNNY_VIDEO_ID_PATTERN,
                                message: "Enter a valid Bunny Stream video ID",
                            },
                        ]}
                    >
                        <Input
                            prefix={<Video size={16} />}
                            placeholder="Bunny Stream video ID"
                            maxLength={36}
                        />
                    </Form.Item>
                    <div className={styles.actions}>
                        <CustomButton onClick={() => setIsOpen(false)}>Cancel</CustomButton>
                        <CustomButton
                            loading={mutation.isPending}
                            htmlType="submit"
                            variant="green"
                        >
                            Save recording
                        </CustomButton>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default AttachRecordingButton
