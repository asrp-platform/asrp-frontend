"use client"

import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"
import api from "@/axios.ts"
import { CURRENT_USER_MEMBERSHIP_CONFIRMATION_PDF } from "@shared/backend/restApiUrls/restApiUrls.ts"
import { useState } from "react"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"

const statusMessages = {
    404: "Membership history for the current user not found",
}

const DownloadConfirmation = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const handleClick = async () => {
        try {
            setLoading(true)
            const response = await api.get(CURRENT_USER_MEMBERSHIP_CONFIRMATION_PDF, {
                responseType: "blob",
            })
            const disposition = response.headers["content-disposition"]
            const filename =
                disposition?.match(/filename="([^"]+)"/)?.[1] ?? "membership-confirmation.pdf"

            const fileURL = URL.createObjectURL(response.data)
            const link = document.createElement("a")
            link.href = fileURL
            link.download = filename
            link.click()
            URL.revokeObjectURL(fileURL)
        } catch (error: unknown) {
            handleApiError({ error, statusMessages })
        } finally {
            setLoading(false)
        }
    }

    return (
        <CustomButton loading={loading} onClick={handleClick} variant={"secondary"}>
            Download confirmation
        </CustomButton>
    )
}

export default DownloadConfirmation
