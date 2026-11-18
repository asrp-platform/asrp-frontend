import MembershipApplicationProfessionalInformationFields from "@features/shared/MembershipApplicationProfessionalInformationFields/MembershipApplicationProfessionalInformationFields"
import FormSectionHeader from "../FormSectionHeader/FormSectionHeader"
import FormFieldsGrid from "../FormFieldsGrid/FormFieldsGrid"
const ProfessionalInformationSection = () => (
    <>
        <FormSectionHeader title="Professional information">
            This information helps us understand our membership and tailor programming to the needs
            of our community. If you are not currently affiliated with any institution and are
            applying for the Pathway member category, please enter N/A in the field below and select
            "Other" in the "Job title / Role" field.
        </FormSectionHeader>
        <FormFieldsGrid>
            <MembershipApplicationProfessionalInformationFields />
        </FormFieldsGrid>
    </>
)
export default ProfessionalInformationSection
