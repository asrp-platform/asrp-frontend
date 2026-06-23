import { Card, Checkbox, Button, Typography, Space, Flex, Tag } from "antd"
import { SafetyCertificateOutlined, CheckCircleOutlined } from "@ant-design/icons"

import type { IPermission } from "@/entities/Permission"
import type { Dispatch, SetStateAction } from "react"
import { usePermissions } from "@/context/PermissionsProvider.tsx"
import PermissionGuard from "@/shared/ui/PermissionGuard/PermissionGuard.tsx"
import styles from "./AdminCards.module.scss"

const { Title, Text } = Typography

type PermissionsByGroup = Record<string, IPermission[]>

interface Props {
    allPermissions: IPermission[]
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

function formatPermissionGroup(group: string) {
    return group.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}

const UserPermissionsCard = ({
    allPermissions,
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
        setCheckedPermissions(allPermissions.map((p) => p.id))
    }

    const clearAll = () => {
        setCheckedPermissions([])
    }

    const groupedPermissions = groupPermissions(allPermissions)
    const selectedPermissionsCount = checkedPermissions.length
    const totalPermissionsCount = allPermissions.length

    return (
        <PermissionGuard allowed={canView}>
            <Card
                className={styles.permissionsCard}
                loading={loading}
                title={
                    <Space size={10}>
                        <span className={styles.titleIcon}>
                            <SafetyCertificateOutlined />
                        </span>
                        <Flex vertical gap={0}>
                            <Title level={5} className={styles.cardTitle}>
                                Permissions
                            </Title>
                            <Text className={styles.titleHint}>Administrative access control</Text>
                        </Flex>
                    </Space>
                }
                extra={
                    canUpdate && (
                        <Space wrap>
                            <Button size="small" onClick={clearAll}>
                                Clear
                            </Button>
                            <Button size="small" type="primary" ghost onClick={selectAll}>
                                Select all
                            </Button>
                        </Space>
                    )
                }
            >
                <div className={styles.permissionsSummary}>
                    <div>
                        <Text className={styles.summaryLabel}>Selected permissions</Text>
                        <div className={styles.summaryValue}>
                            {selectedPermissionsCount}
                            <span> / {totalPermissionsCount}</span>
                        </div>
                    </div>
                    <Tag className={styles.summaryTag} icon={<CheckCircleOutlined />}>
                        {Object.keys(groupedPermissions).length} groups
                    </Tag>
                </div>

                <div className={styles.permissionGroups}>
                    {Object.entries(groupedPermissions).map(([group, currentGroupPermissions]) => {
                        return (
                            <section key={group} className={styles.permissionGroup}>
                                <div className={styles.permissionGroupHeader}>
                                    <Text strong>{formatPermissionGroup(group)}</Text>
                                    <Tag className={styles.permissionCountTag}>
                                        {currentGroupPermissions.length}
                                    </Tag>
                                </div>

                                <Flex vertical gap={8}>
                                    {currentGroupPermissions.map((p) => (
                                        <Checkbox
                                            key={p.id}
                                            className={styles.permissionCheckbox}
                                            disabled={!canUpdate}
                                            checked={checkedPermissions.includes(p.id)}
                                            onChange={(e) => handleChange(p.id, e.target.checked)}
                                        >
                                            <span className={styles.permissionName}>{p.name}</span>
                                            <span className={styles.permissionAction}>
                                                {p.action}
                                            </span>
                                        </Checkbox>
                                    ))}
                                </Flex>
                            </section>
                        )
                    })}
                </div>

                {canUpdate && (
                    <div className={styles.permissionsFooter}>
                        <Button loading={isPermissionsUpdating} type="primary" onClick={onSave}>
                            Save permissions
                        </Button>
                    </div>
                )}
            </Card>
        </PermissionGuard>
    )
}

export default UserPermissionsCard
