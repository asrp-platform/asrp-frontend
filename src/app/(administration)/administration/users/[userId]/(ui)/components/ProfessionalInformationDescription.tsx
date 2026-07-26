import type { IUserPrivate } from "@entities/User.ts"

import ProfileFieldList from "@app/(administration)/administration/users/[userId]/(ui)/components/ProfileFieldList.tsx"

type IProps = {
    user: IUserPrivate
}

const ProfessionalInformationDescription = ({ user }: IProps) => {
    return (
        <ProfileFieldList
            title="Professional information"
            variant="professional"
            fields={[
                {
                    label: "Languages spoken",
                    value: user.languages_spoken,
                },
                {
                    label: "Professional interests",
                    value: user.professional_interests,
                },
                {
                    label: "Description",
                    value: user.description,
                    wide: true,
                },
            ]}
        />
    )
}

export default ProfessionalInformationDescription
