"use client"

import { isAxiosError } from "axios"
import { useState } from "react"

import api from "@/axios.ts"

interface IProps {
    endpoint: string
    label: string
    className?: string
}

interface LegalDocumentResponse {
    url: string
}

const LegalDocumentLink = ({ endpoint, label, className }: IProps) => {
    const [isOpening, setIsOpening] = useState(false)

    const openDocument = async () => {
        const documentWindow = window.open("", "_blank")

        if (documentWindow) documentWindow.opener = null

        try {
            setIsOpening(true)
            const response = await api.get<LegalDocumentResponse>(endpoint)

            if (documentWindow) {
                documentWindow.location.href = response.data.url
            } else {
                window.location.href = response.data.url
            }
        } catch (error) {
            documentWindow?.close()

            if (isAxiosError(error)) {
                console.error(error.message)
            } else {
                console.error(error)
            }
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
            onClick={openDocument}
        >
            {label}
        </button>
    )
}

export default LegalDocumentLink
