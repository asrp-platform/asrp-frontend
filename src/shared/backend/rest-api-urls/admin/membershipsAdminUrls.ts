import { ADMIN_URL } from "@/axios.ts"

export const MEMBERSHIP_REQUESTS_ADMIN_URL = `${ADMIN_URL}/membership-requests`

export const MEMBERSHIPS_ADMIN_URLS = `${ADMIN_URL}/memberships`

export const MEMBERSHIP_DOWNGRADE_REQUESTS_ADMIN_URL = `${MEMBERSHIPS_ADMIN_URLS}/types/downgrade-requests`

export const getMembershipDowngradeRequestByIdUrl = (downgradeRequestId: string | number) =>
    `${MEMBERSHIP_DOWNGRADE_REQUESTS_ADMIN_URL}/${downgradeRequestId}`
