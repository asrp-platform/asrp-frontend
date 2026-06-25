"use client"

import { useState } from "react"
import { isAxiosError } from "axios"
import api from "@/axios.ts"
import { BYLAWS_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"

interface BylawsResponse {
    url: string
}

interface BylawsLinkProps {
    className?: string
}

const BylawsLink = ({ className }: BylawsLinkProps) => {
    const [isOpening, setIsOpening] = useState(false)

    const openBylaws = async () => {
        const bylawsWindow = window.open("", "_blank")

        if (bylawsWindow) {
            bylawsWindow.opener = null
        }

        try {
            setIsOpening(true)
            const response = await api.get<BylawsResponse>(BYLAWS_URL)

            if (bylawsWindow) {
                bylawsWindow.location.href = response.data.url
            } else {
                window.location.href = response.data.url
            }
        } catch (error) {
            bylawsWindow?.close()

            if (isAxiosError(error)) {
                console.error(error.message)
                return
            }

            console.error(error)
        } finally {
            setIsOpening(false)
        }
    }

    return (
        <button
            type="button"
            className={className}
            disabled={isOpening}
            aria-busy={isOpening}
            onClick={openBylaws}
        >
            View Our Bylaws
        </button>
    )
}

export default BylawsLink
