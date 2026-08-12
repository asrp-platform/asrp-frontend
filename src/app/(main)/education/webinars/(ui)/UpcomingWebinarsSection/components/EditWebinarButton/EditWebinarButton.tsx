"use client"

import { Pencil } from "lucide-react"

import type { IWebinar } from "@entities/News.ts"

import WebinarFormModal from "../WebinarFormModal/WebinarFormModal"
import styles from "./EditWebinarButton.module.scss"

interface IProps {
    webinar: IWebinar
}

const EditWebinarButton = ({ webinar }: IProps) => (
    <WebinarFormModal
        webinar={webinar}
        renderTrigger={(openModal) => (
            <button
                type="button"
                className={styles.editButton}
                aria-label={`Edit webinar: ${webinar.title}`}
                onClick={openModal}
            >
                <Pencil size={18} />
            </button>
        )}
    />
)

export default EditWebinarButton
