import type { IUser } from "@/entities/User"
import ExperienceCard from "@/app/(main)/(account)/account/profile/(ui)/ExperienceCard"
import { getUserJobByIdUrl, getUserJobsUrl } from "@/shared/backend/rest-api-urls/restApiUrls"

interface IProps {
    user: IUser
}

const JobCard = ({ user }: IProps) => {
    return (
        <ExperienceCard
            user={user}
            title="Job"
            subtitle="Add your current or previous professional position details."
            addButtonText="+ Add job"
            deleteEntityLabel="job"
            queryScope="jobs"
            getCollectionUrl={getUserJobsUrl}
            getByIdUrl={getUserJobByIdUrl}
        />
    )
}

export default JobCard
