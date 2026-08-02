"use client"

import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"

import WebinarFormModal from "../WebinarFormModal/WebinarFormModal"

const CreateWebinarModal = () => (
    <WebinarFormModal
        renderTrigger={(openModal) => (
            <CustomButton onClick={openModal} variant="primary">
                Create a new webinar
            </CustomButton>
        )}
    />
)

export default CreateWebinarModal
