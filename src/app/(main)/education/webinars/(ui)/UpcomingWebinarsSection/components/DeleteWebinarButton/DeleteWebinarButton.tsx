"use client"

import { Button, message, Modal } from "antd"
import { Trash2 } from "lucide-react"
import { useState } from "react"

import type { IWebinar } from "@entities/News.ts"

import styles from "./DeleteWebinarButton.module.scss"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getWebinarDetailAdminUrl } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import api from "@/axios.ts"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"

interface IProps {
    webinar: IWebinar
}

const DeleteWebinarButton = ({ webinar }: IProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: async (webinarId: number) => {
            await api.delete(getWebinarDetailAdminUrl(webinarId))
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["upcomingWebinars"] })
            message.success("Successfully deleted webinar")
            setIsOpen(false)
        },
        onError: async (error: Error) => {
            handleApiError({ error })
        },
    })

    return (
        <>
            <button
                type="button"
                className={styles.deleteButton}
                aria-label={`Delete webinar: ${webinar.title}`}
                onClick={() => setIsOpen(true)}
            >
                <Trash2 size={18} />
            </button>

            <Modal
                open={isOpen}
                title="Delete webinar?"
                onCancel={() => setIsOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="delete"
                        type="primary"
                        danger
                        onClick={() => deleteMutation.mutate(webinar.id)}
                    >
                        Delete webinar
                    </Button>,
                ]}
            >
                <p>
                    Are you sure you want to delete <strong>{webinar.title}</strong>? This action
                    cannot be undone.
                </p>
            </Modal>
        </>
    )
}

export default DeleteWebinarButton
