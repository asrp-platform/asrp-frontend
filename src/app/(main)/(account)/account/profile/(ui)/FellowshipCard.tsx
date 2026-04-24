import type { IUser } from "@/entities/User"
import {
    getUserFellowshipsUrl,
    getUserFellowshipByIdUrl,
} from "@/shared/backend/rest-api-urls/restApiUrls.ts"
import ExperienceCard from "@/app/(main)/(account)/account/profile/(ui)/ExperienceCard"

interface IProps {
    user: IUser
}

const FellowshipCard = ({ user }: IProps) => {
    return (
        <ExperienceCard
            user={user}
            title="Fellowship"
            subtitle="If you have not secured a fellowship or you practice without fellowship training, please enter N/A in the required fields below."
            addButtonText="+ Add fellowship"
            deleteEntityLabel="fellowship"
            queryScope="fellowships"
            getCollectionUrl={getUserFellowshipsUrl}
            getByIdUrl={getUserFellowshipByIdUrl}
        />
    )
}

export default FellowshipCard
