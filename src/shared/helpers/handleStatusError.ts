import { isAxiosError, type AxiosError } from "axios"
import { message } from "antd"

const defaultStatusMessageMapping: Record<number, string> = {
    400: "Invalid request parameters.",
    401: "Your session has expired. Please sign in again.",
    403: "Not enough permissions to perform this action",
}

interface BackendErrorData {
    detail?: string
    message?: string
}

export const handleStatusError = (
    error: AxiosError<BackendErrorData>,
    statusMessages?: Record<number, string>,
) => {
    if (error.response === undefined) {
        message.error("Network error. Check your internet connection and try again.")
        return
    }

    const { status, data } = error.response

    const statusMapping = { ...defaultStatusMessageMapping, ...statusMessages }

    const errorMessage =
        statusMapping[status] ??
        data?.detail ??
        data?.message ??
        "Something went wrong. Please try again later."

    message.error(errorMessage)
}

export const handleRequestError = (error: unknown, statusMessages?: Record<number, string>) => {
    if (isAxiosError<BackendErrorData>(error)) {
        handleStatusError(error, statusMessages)
        return
    }

    message.error("Unexpected error. Please try again later.")
}
