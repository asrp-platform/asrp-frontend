// Users
import { ADMIN_URL } from "@/axios.ts"

export const ADMIN_USERS_URL = `${ADMIN_URL}/users`

export const getStuffUsersUrl = (userId: string | number) => `${ADMIN_USERS_URL}/${userId}`

export const getUserPermissionsStuffUrl = (userId: string | number) =>
    `${ADMIN_USERS_URL}/${userId}/permissions`

export const NAME_CHANGE_REQUESTS_URL = `${ADMIN_USERS_URL}/name-change-requests`

export const getUserNameChangeRequestById = (userId: number | string, requestId: number | string) =>
    `${ADMIN_USERS_URL}/${userId}/name-change-requests/${requestId}`

// Permissions
export const PERMISSIONS_LIST_URL = `${ADMIN_URL}/permissions`

// Directors Board
export const DIRECTORS_BOARD_ADMIN_URL = `${ADMIN_URL}/directors-board`

export const getDirectorsBoardMemberAdminUrl = (userId: string | number) => {
    return `${DIRECTORS_BOARD_ADMIN_URL}/${userId}`
}

export const DIRECTORS_BOARD_MEMBER_IMAGES_URL = `${DIRECTORS_BOARD_ADMIN_URL}/images`
export const DIRECTORS_BOARD_MEMBER_REORDER_URL = `${DIRECTORS_BOARD_ADMIN_URL}/reorder`

// Legal documents
// "http://localhost:8000/api/admin/legal-documents"
export const LEGAL_DOCUMENTS_ADMIN_URL = `${ADMIN_URL}/legal-documents`

// "http://localhost:8000/api/admin/legal-documents/bylaws"
export const BYLAWS_ADMIN_URL = `${LEGAL_DOCUMENTS_ADMIN_URL}/bylaws`

// Feedback
export const CONTACT_MESSAGES_ADMIN_URL = `${ADMIN_URL}/contact-messages`

//Answer for feedback
export const getReplyUrl = (messageId: number) =>
    `${CONTACT_MESSAGES_ADMIN_URL}/${messageId}/answers`
