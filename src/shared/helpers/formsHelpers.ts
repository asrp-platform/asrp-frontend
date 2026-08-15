import { message, type FormInstance } from "antd"
import { isAxiosError, type AxiosError } from "axios"

import type { IValidationError } from "@shared/interfaces.ts"

const defaultStatusMessageMapping: Record<number, string> = {
    400: "Invalid request parameters.",
    401: "Your session has expired. Please sign in again.",
    403: "Not enough permissions to perform this action",
    422: "Validation error. Please check the input data and try again.",
}

interface BackendErrorData {
    detail?: string
    message?: string
}

const hasValidationErrors = (data: unknown): data is { detail: { errors: IValidationError[] } } => {
    return (
        typeof data === "object" &&
        data !== null &&
        "detail" in data &&
        typeof data.detail === "object" &&
        data.detail !== null &&
        "errors" in data.detail &&
        Array.isArray(data.detail.errors)
    )
}

export const clearFormErrors = (form: FormInstance) => {
    form.setFields(
        form.getFieldsError().map(({ name }) => ({
            name,
            errors: [],
        })),
    )
}

const handleStatusError = (
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

const setFormFieldsErrors = (error: AxiosError, form: FormInstance): boolean => {
    if (error.response?.status !== 422 || !hasValidationErrors(error.response.data)) {
        return false
    }

    const backendErrors = error.response.data.detail.errors
    const registeredFields = form.getFieldsError().map(({ name }) => ({
        name,
        path: name.map(String).join("."),
    }))

    const formErrors = backendErrors.map((validationError) => {
        const exactField = registeredFields.find(({ path }) => path === validationError.field)
        const flatFieldName = validationError.field.split(".").at(-1) ?? validationError.field
        const flatField = registeredFields.find(
            ({ name }) => name.length === 1 && String(name[0]) === flatFieldName,
        )

        return {
            name: exactField?.name ?? flatField?.name ?? validationError.field,
            errors: [validationError.message],
        }
    })

    form.setFields(formErrors)

    const firstError = formErrors[0]
    if (firstError) {
        requestAnimationFrame(() => {
            form.scrollToField(firstError.name, {
                behavior: "smooth",
                block: "center",
                focus: true,
            })
        })
    }

    return true
}

type HandleApiErrorArgs = {
    error: unknown
    form?: FormInstance
    statusMessages?: Record<number, string>
}

export const handleApiError = ({ error, form, statusMessages }: HandleApiErrorArgs) => {
    /*
     * Handles API request error and displays message.error or sets formFieldsErrors
     *
     * Processing:
     * 1. Check if error is not an AxiosError instance
     * 2. Silently ignores canceled Axios requests
     * 3. Reposts network errors (undefined error.response means axios got no HTTP-request)
     * 4. Maps HTTP 422 validation errors to Ant Design form fields when a form is provided.
     * 5. Falls back to a status-specific message for all unhandled HTTP errors.
     *
     * Custom status messages override the default messages.
     *
     * @param args.error - The error caught during an API request.
     * @param args.form - Optional Ant Design form instance used to display field-level validation errors.
     * @param args.statusMessages - Optional HTTP status-to-message mapping that overrides default messages.
     * */

    // 1. Проверить isAxiosError
    if (!isAxiosError(error)) {
        message.error("Unexpected error. Please try again later.")
        return
    }

    // 2. Запрос отменен до завершения
    if (error.code === "ERR_CANCELED") {
        return
    }

    // 3. AxiosError, но error.response === undefined
    // отсутствие responses ===  axios не получил HTTP-ответ
    if (error.response === undefined) {
        message.error(
            "Unable to connect to the server. Check your internet connection and try again.",
        )
        return
    }

    // 4. Нормальный HTTP-response ошибки
    if (error.response.status === 422 && form && setFormFieldsErrors(error, form)) {
        return
    }

    handleStatusError(error, statusMessages)
}
