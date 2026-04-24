import type { IUser } from "@/entities/User"
import {
    getUserResidenciesUrl,
    getUserResidencyByIdUrl,
} from "@/shared/backend/rest-api-urls/restApiUrls.ts"
import ExperienceCard from "@/app/(main)/(account)/account/profile/(ui)/ExperienceCard"

interface IProps {
    user: IUser
}

const ResidencyCard = ({ user }: IProps) => {
    return (
        <ExperienceCard
            user={user}
            title="Residency"
            subtitle="If you are a medical student, residency applicant, U.S.-based laboratory professional, or otherwise do not have residency training to report, please enter N/A in the required fields below."
            addButtonText="+ Add residency"
            deleteEntityLabel="residency"
            queryScope="residencies"
            getCollectionUrl={getUserResidenciesUrl}
            getByIdUrl={getUserResidencyByIdUrl}
        />
    )
}

export default ResidencyCard
