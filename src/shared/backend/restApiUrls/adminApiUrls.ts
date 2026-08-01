import { ADMIN_URL } from "@/axios.ts"

// Users
export const ADMIN_USERS_URL = `${ADMIN_URL}/users`
export const NAME_CHANGE_REQUESTS_URL = `${ADMIN_USERS_URL}/name-change-requests`
export const getAdminUserUrl = (userId: string | number) => `${ADMIN_USERS_URL}/${userId}`
export const getAdminUserBanUrl = (userId: string | number) => `${getAdminUserUrl(userId)}/ban`

export const getAdminUserNameChangeRequestUrl = (
    userId: number | string,
    requestId: number | string,
) => `${getAdminUserUrl(userId)}/name-change-requests/${requestId}`

// Permissions
export const PERMISSIONS_LIST_URL = `${ADMIN_URL}/permissions`
export const getAdminUserPermissionsUrl = (userId: string | number) =>
    `${getAdminUserUrl(userId)}/permissions`

// Directors Board
export const DIRECTORS_BOARD_ADMIN_URL = `${ADMIN_URL}/directors-board`
export const DIRECTORS_BOARD_MEMBER_IMAGES_URL = `${DIRECTORS_BOARD_ADMIN_URL}/images`
export const DIRECTORS_BOARD_MEMBER_REORDER_URL = `${DIRECTORS_BOARD_ADMIN_URL}/reorder`
export const getAdminDirectorsBoardMemberUrl = (userId: string | number) =>
    `${DIRECTORS_BOARD_ADMIN_URL}/${userId}`

// Legal documents
export const LEGAL_DOCUMENTS_ADMIN_URL = `${ADMIN_URL}/legal-documents`
export const BYLAWS_ADMIN_URL = `${LEGAL_DOCUMENTS_ADMIN_URL}/bylaws`
export const SPONSORS_ADMIN_URL = `${LEGAL_DOCUMENTS_ADMIN_URL}/sponsors`
export const SPONSORS_LOGOS_ADMIN_URL = `${SPONSORS_ADMIN_URL}/logos`
export const getAdminSponsorUrl = (sponsorId: number | string) =>
    `${SPONSORS_ADMIN_URL}/${sponsorId}`

// Feedback
export const CONTACT_MESSAGES_ADMIN_URL = `${ADMIN_URL}/contact-messages`
export const getAdminContactMessageAnswerUrl = (messageId: number) =>
    `${CONTACT_MESSAGES_ADMIN_URL}/${messageId}/answers`

export const HEAR_ABOUT_STATISTICS_ADMIN_URL = `${ADMIN_URL}/feedback-additional-info/hear-about-stats`

// Payments
export const PAYMENTS_ADMIN_URL = `${ADMIN_URL}/payments`

// Webinars
export const WEBINARS_ADMIN_URL = `${ADMIN_URL}/webinars`

// Memberships
export const MEMBERSHIP_REQUESTS_ADMIN_URL = `${ADMIN_URL}/membership-requests`
export const MEMBERSHIPS_ADMIN_URL = `${ADMIN_URL}/memberships`
export const MEMBERS_ADMIN_URL = `${MEMBERSHIPS_ADMIN_URL}/members`
export const MEMBERSHIP_TYPES_ADMIN_URL = `${ADMIN_URL}/membership-types`
export const MEMBERSHIP_DOWNGRADE_REQUESTS_ADMIN_URL = `${MEMBERSHIP_TYPES_ADMIN_URL}/downgrade-requests`

export const getAdminMembershipRestrictionUrl = (membershipId: string | number) =>
    `${MEMBERSHIPS_ADMIN_URL}/${membershipId}/restrictions`

export const getAdminMembershipDowngradeRequestUrl = (downgradeRequestId: string | number) =>
    `${MEMBERSHIP_DOWNGRADE_REQUESTS_ADMIN_URL}/${downgradeRequestId}`

export const getAdminMembershipTypeUrl = (membershipTypeId: string | number) =>
    `${MEMBERSHIP_TYPES_ADMIN_URL}/${membershipTypeId}`

export const getAdminMembershipRequestUrl = (membershipRequestId: string | number) =>
    `${MEMBERSHIP_REQUESTS_ADMIN_URL}/${membershipRequestId}`
