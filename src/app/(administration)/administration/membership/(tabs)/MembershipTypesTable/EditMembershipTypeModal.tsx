"use client"

import { Button, Flex, Form, Input, InputNumber, message, Modal } from "antd"
import type { IMembershipType } from "@entities/Membership.ts"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "antd/es/form/Form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { handleStatusError } from "@shared/helpers/handleStatusError.ts"
import { MEMBERSHIP_TYPES_ADMIN_URL } from "@shared/backend/restApiUrls/admin/membershipsAdminUrls.ts"
import api from "@/axios.ts"

interface IProps {
    membershipType: IMembershipType
}

type FieldType = {
    name: string
    description: string
    price_usd: number
}

const EditMembershipTypeModal = ({ membershipType }: IProps) => {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState<boolean>(false)
    const [form] = useForm<FieldType>()

    const initialValues = useMemo(
        () => ({
            name: membershipType.name,
            description: membershipType.description,
        }),
        [membershipType],
    )

    const updateMutation = useMutation({
        mutationFn: async (values: FieldType) => {
            await api.patch(`${MEMBERSHIP_TYPES_ADMIN_URL}/${membershipType.id}`, values)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["membership-types"] })
            setOpen(false)
            message.success(`${membershipType.type} membership type updated`)
        },
        onError: (error) => {
            handleStatusError(error)
        },
    })

    const handleCancel = () => {
        if (updateMutation.isPending) return

        setOpen(false)
        form.resetFields()
    }

    useEffect(() => {
        if (!open || !membershipType) {
            return
        }

        form.setFieldsValue({
            name: membershipType.name,
            description: membershipType.description,
            price_usd: membershipType.price_usd,
        })
    }, [open, form, membershipType])

    return (
        <>
            <Button onClick={() => setOpen(!open)}>Edit</Button>

            <Modal
                open={open}
                onCancel={handleCancel}
                footer={null}
                closable={!updateMutation.isPending}
            >
                <Form
                    disabled={updateMutation.isPending}
                    form={form}
                    onFinish={(values) => updateMutation.mutate(values)}
                    initialValues={initialValues}
                    layout="vertical"
                >
                    <Form.Item
                        label={"Membership Type Name"}
                        name={"name"}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: "Please enter a membership type name",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"Description"}
                        name={"description"}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: "Please enter a description",
                            },
                        ]}
                    >
                        <Input.TextArea rows={5} />
                    </Form.Item>

                    <Form.Item
                        label={`${
                            membershipType.type.charAt(0).toUpperCase() +
                            membershipType.type.slice(1).toLowerCase()
                        } membership price`}
                        name={"price_usd"}
                        rules={[
                            {
                                required: true,
                                message: "Please enter a price",
                            },
                        ]}
                    >
                        <InputNumber step={1} prefix="$" style={{ width: "100%" }} />
                    </Form.Item>

                    <Flex justify={"flex-end"}>
                        <Button loading={updateMutation.isPending} type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Flex>
                </Form>
            </Modal>
        </>
    )
}

export default EditMembershipTypeModal
