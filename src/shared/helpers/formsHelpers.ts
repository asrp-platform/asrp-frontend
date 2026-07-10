import type { FormInstance } from "antd"

export const clearFormErrors = (form: FormInstance) => {
    form.setFields(
        form.getFieldsError().map(({ name }) => ({
            name,
            errors: [],
        })),
    )
}
