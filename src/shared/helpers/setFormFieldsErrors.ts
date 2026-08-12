import type { IValidationError } from "@/shared/types/interfaces.ts"
import { isAxiosError, type AxiosError } from "axios"
import type { FormInstance } from "antd"
import { handleRequestError, handleStatusError } from "@/shared/helpers/handleStatusError.ts"

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

export const setFormFieldsErrors = (error: AxiosError, form: FormInstance): boolean => {
    if (error.response?.status !== 422 || !hasValidationErrors(error.response.data)) {
        return false
    }

    const backendErrors: IValidationError[] = error.response.data.detail.errors
    const registeredFields = form.getFieldsError().map(({ name }) => ({
        name,
        path: name.map(String).join("."),
    }))

    const formErrors = backendErrors.map((error) => {
        const exactField = registeredFields.find(({ path }) => path === error.field)
        const flatFieldName = error.field.split(".").at(-1) ?? error.field
        const flatField = registeredFields.find(
            ({ name }) => name.length === 1 && String(name[0]) === flatFieldName,
        )

        return {
            name: exactField?.name ?? flatField?.name ?? error.field,
            errors: [error.message],
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

export const handleFormError = (
    error: unknown,
    form: FormInstance,
    statusMessages?: Record<number, string>,
) => {
    if (!isAxiosError(error)) {
        handleRequestError(error)
        return
    }

    if (!setFormFieldsErrors(error, form)) {
        handleStatusError(error, statusMessages)
    }
}
