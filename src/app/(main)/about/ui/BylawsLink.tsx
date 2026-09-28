import LegalDocumentLink from "@shared/ui/LegalDocumentLink/LegalDocumentLink.tsx"
import { BYLAWS_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"

interface BylawsLinkProps {
    className?: string
}

const BylawsLink = ({ className }: BylawsLinkProps) => {
    return <LegalDocumentLink endpoint={BYLAWS_URL} label="View Our Bylaws" className={className} />
}

export default BylawsLink
