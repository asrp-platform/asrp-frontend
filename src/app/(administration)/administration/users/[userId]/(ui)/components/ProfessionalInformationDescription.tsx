import { Descriptions } from "antd"
import type { IUser } from "@entities/User.ts"

type IProps = {
    user: IUser
}

const ProfessionalInformationDescription = ({ user }: IProps) => {
    return (
        <Descriptions
            title="Professional information"
            bordered
            size="small"
            column={{ xs: 1, md: 2 }}
        >
            <Descriptions.Item label="Institution">{user.institution || "—"}</Descriptions.Item>

            <Descriptions.Item label="Role">{user.role || "—"}</Descriptions.Item>

            <Descriptions.Item label="Languages spoken">
                {user.languages_spoken || "—"}
            </Descriptions.Item>

            <Descriptions.Item label="Professional interests">
                {user.professional_interests || "—"}
            </Descriptions.Item>

            <Descriptions.Item label="Description" span={2}>
                {user.description || "—"}
            </Descriptions.Item>
        </Descriptions>
    )
}

export default ProfessionalInformationDescription
