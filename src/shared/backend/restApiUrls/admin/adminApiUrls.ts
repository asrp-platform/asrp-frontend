import { ADMIN_URL } from "@/axios.ts"

// Users
export const ADMIN_USERS_URL = `${ADMIN_URL}/users`
export const NAME_CHANGE_REQUESTS_URL = `${ADMIN_USERS_URL}/name-change-requests`
export const getAdminUsersUrl = (userId: string | number) => `${ADMIN_USERS_URL}/${userId}`
export const getUserBanAdminUrl = (userId: string | number) => `${ADMIN_USERS_URL}/${userId}/ban`

export const getUserNameChangeRequestById = (userId: number | string, requestId: number | string) =>
    `${ADMIN_USERS_URL}/${userId}/name-change-requests/${requestId}`

// Permissions
export const PERMISSIONS_LIST_URL = `${ADMIN_URL}/permissions`
export const getUserPermissionsAdminUrl = (userId: string | number) =>
    `${ADMIN_USERS_URL}/${userId}/permissions`

// Directors Board
export const DIRECTORS_BOARD_ADMIN_URL = `${ADMIN_URL}/directors-board`
export const DIRECTORS_BOARD_MEMBER_IMAGES_URL = `${DIRECTORS_BOARD_ADMIN_URL}/images`
export const DIRECTORS_BOARD_MEMBER_REORDER_URL = `${DIRECTORS_BOARD_ADMIN_URL}/reorder`
export const getDirectorsBoardMemberAdminUrl = (userId: string | number) =>
    `${DIRECTORS_BOARD_ADMIN_URL}/${userId}`

// Legal documents
export const LEGAL_DOCUMENTS_ADMIN_URL = `${ADMIN_URL}/legal-documents`
export const BYLAWS_ADMIN_URL = `${LEGAL_DOCUMENTS_ADMIN_URL}/bylaws`
export const SPONSORS_ADMIN_URL = `${LEGAL_DOCUMENTS_ADMIN_URL}/sponsors`
export const SPONSORS_LOGOS_ADMIN_URL = `${SPONSORS_ADMIN_URL}/logos`
export const getSponsorAdminUrl = (sponsorId: number | string) =>
    `${SPONSORS_ADMIN_URL}/${sponsorId}`

// Feedback
export const CONTACT_MESSAGES_ADMIN_URL = `${ADMIN_URL}/contact-messages`
export const getContactMessageReplyUrl = (messageId: number) =>
    `${CONTACT_MESSAGES_ADMIN_URL}/${messageId}/answers`

export const HEAR_ABOUT_STATISTICS_ADMIN_URL = `${ADMIN_URL}/feedback-additional-info/hear-about-stats`

// Payments
export const PAYMENTS_ADMIN_URL = `${ADMIN_URL}/payments`

// Webinars
export const WEBINARS_ADMIN_URL = `${ADMIN_URL}/webinars`
