"use client"

import { useState } from "react"
import { Button, Modal } from "antd"
import { RotateCcw } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/axios"
import { CURRENT_USER_URL, LOGOUT_URL } from "@shared/backend/restApiUrls/restApiUrls"
import { handleApiError } from "@shared/helpers/formsHelpers"
import styles from "./DeleteAccountSection.module.scss"

const DeleteAccountSection = () => {
    const [isOpen, setIsOpen] = useState(false)
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: () => api.delete(CURRENT_USER_URL),
        retry: false,
        onSuccess: async () => {
            await queryClient.cancelQueries()
            try {
                await api.post(LOGOUT_URL, {}, { withCredentials: true, timeout: 5000 })
            } catch {
                // Account deletion has succeeded; always clear the local session.
            } finally {
                localStorage.removeItem("accessToken")
                queryClient.clear()
                window.location.replace("/")
            }
        },
        onError: (error) => handleApiError({ error }),
    })

    const closeModal = () => {
        if (!mutation.isPending) setIsOpen(false)
    }

    return (
        <>
            <section className={styles.section} aria-labelledby="delete-account-heading">
                <div>
                    <h2 id="delete-account-heading">Delete account</h2>
                    <p>
                        You can restore your account within 30 days. After that, it will be
                        automatically and permanently deleted.
                    </p>
                </div>
                <Button danger onClick={() => setIsOpen(true)}>
                    Delete account
                </Button>
            </section>
            <Modal
                title="Delete your account?"
                open={isOpen}
                onCancel={closeModal}
                onOk={() => mutation.mutate()}
                okText="Delete account"
                cancelText="Keep account"
                confirmLoading={mutation.isPending}
                okButtonProps={{ danger: true, disabled: mutation.isPending }}
                cancelButtonProps={{ disabled: mutation.isPending, autoFocus: true }}
                closable={!mutation.isPending}
                keyboard={!mutation.isPending}
                maskClosable={false}
            >
                <div className={styles.deletionDetails}>
                    <p className={styles.summary}>Your account will be scheduled for deletion.</p>
                    <div className={styles.recoveryWindow}>
                        <span className={styles.recoveryIcon}>
                            <RotateCcw size={20} aria-hidden="true" />
                        </span>
                        <div>
                            <h3>30-day recovery window</h3>
                            <p>
                                You can restore your account within 30 days of requesting deletion.
                            </p>
                        </div>
                    </div>
                    <p className={styles.permanentNotice}>
                        After 30 days, your account will be automatically and permanently deleted.
                        <strong> It can no longer be restored after that.</strong>
                    </p>
                </div>
                <p className={styles.modalNote}>
                    You will be signed out after confirming account deletion.
                </p>
            </Modal>
        </>
    )
}

export default DeleteAccountSection
