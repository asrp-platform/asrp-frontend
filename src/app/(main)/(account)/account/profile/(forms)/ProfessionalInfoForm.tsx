"use client"

import { Alert, Button, Checkbox, Col, Form, type FormProps, Input, message, Row } from "antd"

import styles from "@/app/(main)/(account)/account/profile/(ui)/styles.module.scss"
import { useEffect } from "react"
import { getUserProfessionalInformationUrl } from "@shared/backend/restApiUrls/restApiUrls"
import type { IUserPrivate, IUserProfessionalInformation } from "@/entities/User"
import api from "@/axios"
import { clearFormErrors, handleApiError } from "@shared/helpers/formsHelpers.ts"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import FormSkeleton from "@widgets/FormSkeleton/FormSkeleton.tsx"

type FieldType = {
    medical_school: string
    medical_school_country: string
    years_from_to: string

    is_board_certified_pathologist: boolean
    is_us_pathology_trainee: boolean
    is_us_lab_professional: boolean
}

interface IProps {
    user: IUserPrivate
}

const ProfessionalInfoForm = ({ user }: IProps) => {
    const queryClient = useQueryClient()
    const [form] = Form.useForm()

    const professionalInfoUrl = getUserProfessionalInformationUrl(user.id)

    const {
        data: professionalInformation,
        isLoading: isProfessionalInfoLoading,
        isError,
        error: professionalInfoError,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["professional-information", user.id],
        queryFn: async () => {
            const response = await api.get<IUserProfessionalInformation | null>(professionalInfoUrl)
            return response.data
        },
    })

    const updateProfessionalInfo = useMutation({
        mutationFn: async (values: FieldType) => {
            await api.put(professionalInfoUrl, values)
        },
        onSuccess: async () => {
            message.success("Successfully updated professional information")
            await queryClient.invalidateQueries({
                queryKey: ["professional-information", user.id],
            })
        },
        onError: (error) => {
            handleApiError({ error, form })
        },
    })

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        clearFormErrors(form)
        updateProfessionalInfo.mutate(values)
    }

    useEffect(() => {
        if (professionalInformation) {
            form.setFieldsValue(professionalInformation)
        } else {
            form.resetFields()
        }
    }, [form, professionalInformation])

    useEffect(() => {
        if (professionalInfoError) {
            handleApiError({ error: professionalInfoError })
        }
    }, [professionalInfoError])

    return (
        <div>
            <h3 className={styles.titleLevelTwo}>Professional information</h3>
            <h3 className={styles.titleLevelThree}>Medical School</h3>
            {isProfessionalInfoLoading ? (
                <FormSkeleton rows={3} />
            ) : isError ? (
                <Alert
                    showIcon
                    type="error"
                    title="Unable to load professional information"
                    description="Please try loading the form again."
                    action={
                        <Button loading={isFetching} onClick={() => void refetch()}>
                            Try again
                        </Button>
                    }
                />
            ) : (
                <Form
                    form={form}
                    layout="vertical"
                    className={styles.professionalInfoForm}
                    onFinish={onFinish}
                >
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item name="medical_school" label="Medical school" required>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="medical_school_country"
                                label="Country of medical school"
                                required
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item name="years_from_to" label="Years (from – to)" required>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <h3 className={styles.titleLevelThree}>Professional status</h3>
                    <Form.Item
                        name="is_board_certified_pathologist"
                        valuePropName="checked"
                        style={{ marginBottom: 0 }}
                    >
                        <Checkbox>
                            Board-certified or board-eligible pathologist actively practicing in the
                            United States
                        </Checkbox>
                    </Form.Item>

                    <Form.Item
                        name="is_us_pathology_trainee"
                        valuePropName="checked"
                        style={{ marginBottom: 0 }}
                    >
                        <Checkbox>
                            Pathology resident, fellow, or medical student actively enrolled in a
                            U.S. program
                        </Checkbox>
                    </Form.Item>

                    <Form.Item
                        name="is_us_lab_professional"
                        valuePropName="checked"
                        style={{ marginBottom: 0 }}
                        required
                    >
                        <Checkbox>Other U.S.-based laboratory professional</Checkbox>
                    </Form.Item>

                    <div className={styles.professionalInfoActions}>
                        <Button
                            loading={updateProfessionalInfo.isPending}
                            type="primary"
                            danger
                            htmlType="submit"
                        >
                            Save changes
                        </Button>
                    </div>
                </Form>
            )}
        </div>
    )
}

export default ProfessionalInfoForm
