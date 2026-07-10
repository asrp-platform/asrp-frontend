export type RegisterFormFields = {
    email: string
    password: string
    repeat_password: string
    firstname: string
    lastname: string
    credentials: string[] | null
    city: string
    state?: string
    postal_code?: string
    country: string
}

export interface ICountry {
    code: string
    name: string
    state_required: boolean
    postal_code_required: boolean
    state_label: string
    postal_code_label: string
    postal_code_pattern: string | null
    supports_us_tax_calculation: boolean
}
