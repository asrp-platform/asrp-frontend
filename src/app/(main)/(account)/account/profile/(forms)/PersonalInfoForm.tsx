"use client"

import styles from "@/app/(main)/(account)/account/profile/(ui)/styles.module.scss"
import { Button, Col, Form, type FormProps, Input, message, Row, Select } from "antd"
import type { IUser } from "@/entities/User.ts"
import { useEffect, useMemo, useState } from "react"
import { isAxiosError } from "axios"
import { setFormFieldsErrors } from "@/shared/helpers/setFormFieldsErrors.ts"
import api from "@/axios.ts"
import ChangeNameModal from "@/app/(main)/(account)/account/profile/(ui)/RequestNameChangeModal.tsx"
import { CURRENT_USER_URL } from "@shared/backend/restApiUrls/currentUserUrls.ts"
import { credentialsOptions } from "@shared/options.ts"
import type { Credentials } from "@features/MembershipApplicationForm/types.ts"
import { clearFormErrors } from "@shared/helpers/formsHelpers.ts"
import { useCountriesQuery } from "@shared/backend/queries/useCountriesQuery.ts"

interface IProps {
    user: IUser
}

type FieldType = {
    firstname: string
    lastname: string
    middlename?: string
    suffix?: string
    credentials?: Credentials[]
    email: string
    phone_number?: string
    country: string
    state?: string
    postal_code?: string
    city: string
    preferred_name: string
}

const normalizeCountryCode = (
    countryValue: string | null | undefined,
    countries?: { code: string; name: string }[],
) => {
    if (!countryValue) {
        return undefined
    }

    const normalizedCountryValue = countryValue.trim().toLowerCase()
    const matchedCountry = countries?.find(
        (country) =>
            country.code.toLowerCase() === normalizedCountryValue ||
            country.name.toLowerCase() === normalizedCountryValue,
    )

    if (matchedCountry) {
        return matchedCountry.code
    }

    if (
        ["us", "usa", "u.s.", "u.s.a.", "united states", "united states of america"].includes(
            normalizedCountryValue,
        )
    ) {
        return "US"
    }

    return countryValue
}

const PersonalInfoForm = ({ user }: IProps) => {
    const [form] = Form.useForm()
    const { data: countries, isLoading: isCountriesLoading } = useCountriesQuery()

    const [isLoading, setIsLoading] = useState(false)
    const [nameChangeModalOpen, setNameChangeModalOpen] = useState(false)
    const watchedCountryCode = Form.useWatch<FieldType["country"]>("country", form)
    const initialCountryCode = useMemo(
        () => normalizeCountryCode(user.country, countries),
        [countries, user.country],
    )
    const selectedCountryCode = watchedCountryCode ?? initialCountryCode
    const selectedCountry = countries?.find((country) => country.code === selectedCountryCode)
    const isUsaSelected = selectedCountryCode === "US"

    useEffect(() => {
        if (initialCountryCode) {
            form.setFieldValue("country", initialCountryCode)
        }
    }, [form, initialCountryCode])

    useEffect(() => {
        if (selectedCountryCode && !isUsaSelected) {
            form.setFieldsValue({ state: undefined, postal_code: undefined })
        }
    }, [form, isUsaSelected, selectedCountryCode])

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        clearFormErrors(form)
        const {
            email: _email,
            firstname: _firstname,
            lastname: _lastname,
            middlename: _middlename,
            ...updateData
        } = values
        try {
            setIsLoading(true)
            await api.patch(CURRENT_USER_URL, {
                ...updateData,
                credentials: updateData.credentials?.join(","),
            })
            message.success("Successfully updated user data")
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.status === 422) {
                    setFormFieldsErrors(error, form)
                }
            }
        } finally {
            setIsLoading(false)
        }
    }

    const initialValues = useMemo(() => {
        const selectedCredentials = user.credentials
            ? user.credentials
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean)
            : []

        return {
            firstname: user.firstname,
            lastname: user.lastname,
            preferred_name: user.preferred_name,
            credentials: selectedCredentials,
            middlename: user.middlename,
            suffix: user.suffix,
            email: user.email,
            country: initialCountryCode,
            city: user.city,
            state: user.state,
            postal_code: user.postal_code,
            phone_number: user.phone_number,
        }
    }, [initialCountryCode, user])

    return (
        <div>
            <h2 className={styles.titleLevelTwo}>Personal information</h2>

            <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item label="First name" name="firstname" rules={[{ required: true }]}>
                            <Input className={styles.antInputDisabled} disabled />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Last name" name="lastname" rules={[{ required: true }]}>
                            <Input className={styles.antInputDisabled} disabled />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Middle name" name="middlename">
                            <Input className={styles.antInputDisabled} disabled />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Preferred name" name="preferred_name">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Suffix" name="suffix">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item<FieldType> name="credentials" label="Credentials">
                            <Select
                                mode="multiple"
                                options={credentialsOptions.map((credential) => ({
                                    label: credential,
                                    value: credential,
                                }))}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Email" name="email">
                            <Input className={styles.antInputDisabled} disabled />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Phone" name="phone_number">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="Country" name="country" rules={[{ required: true }]}>
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
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item label="City" name="city" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    {isUsaSelected && (
                        <>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label={selectedCountry?.state_label || "State"}
                                    name="state"
                                    rules={[{ required: true, message: "Please enter your state" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    label={selectedCountry?.postal_code_label || "ZIP"}
                                    name="postal_code"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter your ZIP code",
                                        },
                                        ...(selectedCountry?.postal_code_pattern
                                            ? [
                                                  {
                                                      pattern: new RegExp(
                                                          selectedCountry.postal_code_pattern,
                                                      ),
                                                      message: "Please enter a valid ZIP code",
                                                  },
                                              ]
                                            : []),
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </>
                    )}
                </Row>

                <div className={styles.personalInfoActions}>
                    <Button
                        type="link"
                        danger
                        className={styles.linkButton}
                        onClick={() => setNameChangeModalOpen(true)}
                    >
                        Request name change (moderator approval required)
                    </Button>

                    <Button type="primary" danger htmlType="submit" loading={isLoading}>
                        Save changes
                    </Button>
                </div>
            </Form>
            <ChangeNameModal
                open={nameChangeModalOpen}
                setNameChangeModalOpen={setNameChangeModalOpen}
            />
        </div>
    )
}

export default PersonalInfoForm
