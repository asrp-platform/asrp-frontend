import { ADMIN_URL } from "@/axios.ts"

export const MEMBERSHIP_REQUESTS_ADMIN_URL = `${ADMIN_URL}/membership-requests`
export const MEMBERSHIPS_ADMIN_URLS = `${ADMIN_URL}/memberships`
export const MEMBERS_ADMIN_URL = `${MEMBERSHIPS_ADMIN_URLS}/members`

export const MEMBERSHIP_TYPES_ADMIN_URL = `${ADMIN_URL}/membership-types`
export const MEMBERSHIP_DOWNGRADE_REQUESTS_ADMIN_URL = `${MEMBERSHIP_TYPES_ADMIN_URL}/downgrade-requests`

export const getMembershipRestrictionsUrl = (membershipId: string | number) =>
    `${MEMBERSHIPS_ADMIN_URLS}/${membershipId}/restrictions`

export const getMembershipDowngradeRequestByIdUrl = (downgradeRequestId: string | number) =>
    `${MEMBERSHIP_DOWNGRADE_REQUESTS_ADMIN_URL}/${downgradeRequestId}`
