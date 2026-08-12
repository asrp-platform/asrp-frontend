"use client"

import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"
import { Plus } from "lucide-react"

import WebinarFormModal from "../WebinarFormModal/WebinarFormModal"
import styles from "./CreateWebinarModal.module.scss"

const CreateWebinarModal = () => (
    <WebinarFormModal
        renderTrigger={(openModal) => (
            <CustomButton onClick={openModal} variant="primary" className={styles.trigger}>
                <Plus size={17} />
                <span>Create a new webinar</span>
            </CustomButton>
        )}
    />
)

export default CreateWebinarModal
