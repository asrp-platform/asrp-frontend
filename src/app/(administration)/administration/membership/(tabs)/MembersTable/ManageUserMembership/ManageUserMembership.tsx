import { useState } from "react"
import type { IUserMembership } from "@entities/Membership.ts"
import { Button, Modal, Tabs, Tooltip } from "antd"
import SuspendOrTerminateForm from "@app/(administration)/administration/membership/(tabs)/MembersTable/ManageUserMembership/SuspendOrTerminateForm/SuspendOrTerminateForm.tsx"
import ComingSoon from "@widgets/ComingSoon/ComingSoon.tsx"
import { useCurrentUserPermissionsQuery } from "@shared/backend/queries/usePermissionsQuery.ts"

interface IProps {
    userMembership: IUserMembership
}

const ManageUserMembership = ({ userMembership }: IProps) => {
    const [open, setOpen] = useState(false)

    const { data: permissions = [] } = useCurrentUserPermissionsQuery()

    const canManageMembership = permissions.map((p) => p.action).includes("memberships.update")

    return (
        <>
            <Tooltip
                title={
                    !canManageMembership ? "У ВАС НЕТ ПРАВ НА ВЫПОЛНЕНИЕ ЭТОГО ДЕЙСТВИЯ" : undefined
                }
            >
                <span>
                    <Button disabled={!canManageMembership} onClick={() => setOpen(true)}>
                        Manage membership
                    </Button>
                </span>
            </Tooltip>
            <Modal
                title="Manage membership"
                open={open}
                onCancel={() => setOpen(false)}
                destroyOnHidden
                footer={null}
                width={800}
            >
                <Tabs
                    defaultActiveKey={"1"}
                    items={[
                        {
                            label: "Suspend or Terminate",
                            key: "1",
                            children: (
                                <SuspendOrTerminateForm
                                    userMembership={userMembership}
                                    setOpen={setOpen}
                                />
                            ),
                        },
                        {
                            label: "Upgrade to Honorary",
                            key: "2",
                            children: <ComingSoon />,
                        },
                        {
                            label: "Restore membership",
                            key: "3",
                            children: <ComingSoon />,
                        },
                    ]}
                />
            </Modal>
        </>
    )
}

export default ManageUserMembership
