import type { IValidationError } from "../types/interfaces.ts"
import type { AxiosError } from "axios"
import type { FormInstance } from "antd"

function hasValidationErrors(data: unknown): data is { detail: { errors: IValidationError[] } } {
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

export const setFormFieldsErrors = (error: AxiosError, form: FormInstance) => {
    if (!error.response) {
        return
    }

    if (error.response.status === 422) {
        if (hasValidationErrors(error.response.data)) {
            const backendErrors: IValidationError[] = error.response.data.detail.errors

            form.setFields(
                backendErrors.map((error) => ({
                    name: error.field,
                    errors: [error.message],
                })),
            )
        }
    }
}
