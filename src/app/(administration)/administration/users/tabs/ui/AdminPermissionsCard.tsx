import { Card, Checkbox, Button, Divider, Row, Col, Typography, Space } from "antd"
import { SafetyCertificateOutlined } from "@ant-design/icons"

import type { IPermission } from "../../../../../../entities/Permission"
import type { Dispatch, SetStateAction } from "react"
import { usePermissions } from "../../../../../../context/PermissionsProvider.tsx"
import PermissionGuard from "../../../../../../shared/ui/PermissionGuard/PermissionGuard.tsx"

const { Title, Text } = Typography

interface Props {
    allPermissions: IPermission[]
    selectedUserPermissions: IPermission[]
    checkedPermissions: number[]
    setCheckedPermissions: Dispatch<SetStateAction<number[]>>
    loading: boolean
    onSave: () => void
}

const UserPermissionsCard = ({
    allPermissions,
    selectedUserPermissions,
    checkedPermissions,
    setCheckedPermissions,
    loading,
    onSave,
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

    return (
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

            <PermissionGuard allowed={canView}>
                <Row gutter={[16, 12]}>
                    {allPermissions.map((permission) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={permission.id}>
                            <Checkbox
                                disabled={!canUpdate}
                                checked={checkedPermissions.includes(permission.id)}
                                onChange={(e) => handleChange(permission.id, e.target.checked)}
                            >
                                {permission.name}
                            </Checkbox>
                        </Col>
                    ))}
                </Row>
            </PermissionGuard>

            <Divider />

            {canUpdate && (
                <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                    <Button type="primary" onClick={onSave}>
                        Save permissions
                    </Button>
                </Space>
            )}
        </Card>
    )
}

export default UserPermissionsCard
