import { Card, Checkbox, Button, Divider, Row, Typography, Space, Flex } from "antd"
import { SafetyCertificateOutlined } from "@ant-design/icons"

import type { IPermission } from "@/entities/Permission"
import type { Dispatch, SetStateAction } from "react"
import { usePermissions } from "@/context/PermissionsProvider.tsx"
import PermissionGuard from "@/shared/ui/PermissionGuard/PermissionGuard.tsx"

const { Title, Text } = Typography

type PermissionsByGroup = Record<string, IPermission[]>

interface Props {
    allPermissions: IPermission[]
    selectedUserPermissions: IPermission[]
    checkedPermissions: number[]
    setCheckedPermissions: Dispatch<SetStateAction<number[]>>
    loading: boolean
    onSave: () => void
    isPermissionsUpdating: boolean
}

function groupPermissions(permissions: IPermission[]) {
    return permissions.reduce<PermissionsByGroup>((acc, permission) => {
        const [group, action] = permission.action.split(".")

        if (!group || !action) return acc

        if (!acc[group]) {
            acc[group] = []
        }

        acc[group].push(permission)

        return acc
    }, {})
}

const UserPermissionsCard = ({
    allPermissions,
    selectedUserPermissions,
    checkedPermissions,
    setCheckedPermissions,
    loading,
    onSave,
    isPermissionsUpdating,
}: Props) => {
    const { permissions } = usePermissions()

    const canView = permissions.includes("permissions.view")
    const canUpdate = permissions.includes("permissions.update")

    const handleChange = (id: number, checked: boolean) => {
        if (checked) {
            setCheckedPermissions((prev) => [...prev, id])
        } else {
            setCheckedPermissions((prev) => prev.filter((p) => p !== id))
        }
    }

    const selectAll = () => {
        setCheckedPermissions(selectedUserPermissions.map((p) => p.id))
    }

    const clearAll = () => {
        setCheckedPermissions([])
    }

    const groupedPermissions = groupPermissions(allPermissions)

    console.log(Object.entries(groupedPermissions))

    return (
        <PermissionGuard allowed={canView}>
            <Card
                loading={loading}
                title={
                    <Space>
                        <SafetyCertificateOutlined />
                        <Title level={5} style={{ margin: 0 }}>
                            Permissions
                        </Title>
                    </Space>
                }
                extra={
                    canUpdate && (
                        <Space>
                            <Button size="small" onClick={selectAll}>
                                Select all
                            </Button>
                            <Button size="small" onClick={clearAll}>
                                Clear
                            </Button>
                        </Space>
                    )
                }
            >
                <Text type="secondary">Manage administrative permissions for this user.</Text>

                <Divider />

                <Row gutter={[16, 12]}>
                    {Object.entries(groupedPermissions).map(([group, currentGroupPermissions]) => {
                        return (
                            <Flex key={group} vertical gap={10}>
                                <h4>
                                    {group
                                        .replace(/_/g, " ")
                                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                                </h4>
                                {currentGroupPermissions.map((p) => (
                                    <Checkbox
                                        key={p.id}
                                        disabled={!canUpdate}
                                        checked={checkedPermissions.includes(p.id)}
                                        onChange={(e) => handleChange(p.id, e.target.checked)}
                                    >
                                        {p.name}
                                    </Checkbox>
                                ))}
                            </Flex>
                        )
                    })}
                </Row>

                <Divider />

                {canUpdate && (
                    <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                        <Button loading={isPermissionsUpdating} type="primary" onClick={onSave}>
                            Save permissions
                        </Button>
                    </Space>
                )}
            </Card>
        </PermissionGuard>
    )
}

export default UserPermissionsCard
