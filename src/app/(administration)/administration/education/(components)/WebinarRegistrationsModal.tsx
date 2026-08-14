"use client"

import { useQuery } from "@tanstack/react-query"
import { Alert, Button, Modal, Table, Tag } from "antd"
import type { ColumnsType } from "antd/es/table"
import { Users } from "lucide-react"
import { useState } from "react"

import api from "@/axios.ts"
import type { IWebinar } from "@entities/News.ts"
import { getWebinarRegistrationsAdminUrl } from "@shared/backend/restApiUrls/adminApiUrls.ts"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"
import type { IPaginatedBackendResponse } from "@shared/interfaces.ts"

interface IRegistrantUser {
    id: number
    firstname?: string
    lastname?: string
    preferred_name?: string | null
    email?: string
}

interface IWebinarRegistration extends IRegistrantUser {
    user?: IRegistrantUser
    registered_at?: string
    created_at?: string
}

type RegistrationsResponse =
    | IPaginatedBackendResponse<IWebinarRegistration>
    | IWebinarRegistration[]

interface IProps {
    webinar: IWebinar
}

const getRegistrantUser = (registration: IWebinarRegistration) => registration.user ?? registration

const WebinarRegistrationsModal = ({ webinar }: IProps) => {
    const [open, setOpen] = useState(false)

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["webinar-registrations", webinar.id],
        queryFn: async () => {
            const response = await api.get<RegistrationsResponse>(
                getWebinarRegistrationsAdminUrl(webinar.id),
                { params: { page_size: 50 } },
            )

            return Array.isArray(response.data) ? response.data : response.data.data
        },
        enabled: open,
    })

    const columns: ColumnsType<IWebinarRegistration> = [
        {
            title: "Name",
            key: "name",
            render: (_, registration) => {
                const user = getRegistrantUser(registration)
                const name = [user.preferred_name || user.firstname, user.lastname]
                    .filter(Boolean)
                    .join(" ")

                return name || "-"
            },
        },
        {
            title: "Email",
            key: "email",
            render: (_, registration) => getRegistrantUser(registration).email || "-",
        },
        {
            title: "Registered at",
            key: "registered_at",
            render: (_, registration) => {
                const value = registration.registered_at ?? registration.created_at
                return value ? formatDatetime(value) : "-"
            },
        },
    ]

    return (
        <>
            <Button icon={<Users size={15} />} onClick={() => setOpen(true)}>
                Registrations
            </Button>
            <Modal
                open={open}
                title={`Registrations: ${webinar.title}`}
                width={760}
                footer={null}
                onCancel={() => setOpen(false)}
            >
                {isError ? (
                    <Alert
                        type="error"
                        showIcon
                        title="Unable to load registrations"
                        action={<Button onClick={() => void refetch()}>Try again</Button>}
                    />
                ) : (
                    <Table
                        rowKey={(registration) =>
                            `${getRegistrantUser(registration).id}-${registration.registered_at ?? registration.created_at ?? "registration"}`
                        }
                        columns={columns}
                        dataSource={data ?? []}
                        loading={isLoading}
                        pagination={{ pageSize: 10, showSizeChanger: false }}
                        locale={{
                            emptyText: <Tag>No registrations yet</Tag>,
                        }}
                    />
                )}
            </Modal>
        </>
    )
}

export default WebinarRegistrationsModal
