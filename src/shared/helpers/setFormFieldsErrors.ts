import type { IValidationError } from "@/shared/types/interfaces.ts"
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
        }
    }
}
