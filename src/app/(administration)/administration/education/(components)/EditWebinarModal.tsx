"use client"

import type { IWebinar } from "@entities/News.ts"
import { Modal } from "antd"

interface IProps {
    open: boolean
    webinar: IWebinar
    onClose: () => void
}

const EditWebinarModal = ({ open, webinar, onClose }: IProps) => {
    return (
        <Modal title="Edit Webinar details" open={open} onCancel={onClose}>
            <span>{webinar.description}</span>
        </Modal>
    )
}

export default EditWebinarModal
