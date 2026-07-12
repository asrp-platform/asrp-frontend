import { Form, Input, Select } from "antd"
import { useEffect } from "react"
import styles from "@app/(auth)/registration/styles.module.scss"
import type { ICountry, RegisterFormFields } from "@app/(auth)/registration/(ui)/types.ts"

interface IProps {
    countries?: ICountry[]
    isCountriesLoading: boolean
}

const LocationSection = ({ countries, isCountriesLoading }: IProps) => {
    const form = Form.useFormInstance<RegisterFormFields>()
    const selectedCountryCode = Form.useWatch<RegisterFormFields["country"]>("country")
    const selectedCountry = countries?.find((country) => country.code === selectedCountryCode)
    const isUsaSelected = selectedCountry?.code === "US"

    useEffect(() => {
        if (selectedCountryCode && !isUsaSelected) {
            form.setFieldsValue({ state: undefined, postal_code: undefined })
        }
    }, [form, isUsaSelected, selectedCountryCode])

    return (
        <>
            <h2>Location</h2>
            <div className={styles.twoFieldContainer}>
                <Form.Item<RegisterFormFields>
                    label="Country"
                    name="country"
                    rules={[{ required: true, message: "Please select your country" }]}
                >
                    <Select
                        showSearch
                        loading={isCountriesLoading}
                        placeholder="Select country"
                        optionFilterProp="label"
                        options={countries?.map((country) => ({
                            value: country.code,
                            label: country.name,
                        }))}
                    />
                </Form.Item>

                <Form.Item<RegisterFormFields>
                    label="City"
                    name="city"
                    rules={[{ required: true, message: "Please enter your city" }]}
                >
                    <Input />
                </Form.Item>
            </div>

            {isUsaSelected && (
                <div className={styles.twoFieldContainer}>
                    <Form.Item<RegisterFormFields>
                        label={selectedCountry?.state_label || "State"}
                        name="state"
                        rules={[{ required: true, message: "Please enter your state" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<RegisterFormFields>
                        label={selectedCountry?.postal_code_label || "ZIP"}
                        name="postal_code"
                        rules={[
                            { required: true, message: "Please enter your ZIP code" },
                            ...(selectedCountry?.postal_code_pattern
                                ? [
                                      {
                                          pattern: new RegExp(selectedCountry.postal_code_pattern),
                                          message: "Please enter a valid ZIP code",
                                      },
                                  ]
                                : []),
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </div>
            )}
        </>
    )
}

export default LocationSection
