import { Button, Image, Popconfirm, Table, Typography } from "antd"
import { DeleteOutlined, LinkOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"

import type { Sponsor } from "./types"

const { Text } = Typography

interface IProps {
    sponsors: Sponsor[]
    isLoading: boolean
    canDelete: boolean
    deletingSponsorId?: number
    onDelete: (sponsorId: number) => void
}

const SponsorsTable = ({ sponsors, isLoading, canDelete, deletingSponsorId, onDelete }: IProps) => {
    const columns: ColumnsType<Sponsor> = [
        {
            title: "Logo",
            dataIndex: "logo_url",
            key: "logo_url",
            width: 96,
            render: (value: string | null, record) =>
                value ? (
                    <Image
                        src={value}
                        alt={record.name}
                        width={56}
                        height={40}
                        style={{ objectFit: "contain" }}
                    />
                ) : (
                    <Text type="secondary">No logo</Text>
                ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Short name",
            dataIndex: "short_name",
            key: "short_name",
            render: (value: string | null) => value || <Text type="secondary">-</Text>,
        },
        {
            title: "Link",
            dataIndex: "link",
            key: "link",
            render: (value: string) => (
                <Button
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={<LinkOutlined />}
                >
                    Open
                </Button>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            width: 160,
            render: (_, record) =>
                canDelete ? (
                    <Popconfirm
                        title="Delete sponsor?"
                        description="This sponsor will be removed from the public sponsors list."
                        okText="Delete"
                        okButtonProps={{ danger: true }}
                        cancelText="Cancel"
                        onConfirm={() => onDelete(record.id)}
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            loading={deletingSponsorId === record.id}
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                ) : null,
        },
    ]

    return (
        <Table
            rowKey="id"
            loading={isLoading}
            dataSource={sponsors}
            columns={columns}
            pagination={false}
            scroll={{ x: "max-content" }}
        />
    )
}

export default SponsorsTable
