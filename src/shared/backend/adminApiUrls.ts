const domain = process.env.NEXT_PUBLIC_API_URL

// "http://localhost:8000/api/admin"
export const ADMIN_URL = `${domain}/api/admin`

// Users

// "http://localhost:8000/api/admin/users"
export const STUFF_USERS_URL = `${ADMIN_URL}/users`

// "http://localhost:8000/api/admin/users/:userId/permissions"
export const getUserPermissionsStuffUrl = (userId: string | number) =>
    `${STUFF_USERS_URL}/${userId}/permissions`

// "http://localhost:8000/api/admin/users/name-change-requests"
export const NAME_CHANGE_REQUESTS_URL = `${STUFF_USERS_URL}/name-change-requests`

// "http://localhost:8000/api/admin/users/name-change-requests"
export const getUserNameChangeRequestById = (userId: number | string, requestId: number | string) =>
    `${STUFF_USERS_URL}/${userId}/name-change-requests/${requestId}`

// Permissions
export const PERMISSIONS_LIST_URL = `${ADMIN_URL}/permissions`

// Directors Board
// "http://localhost:8000/api/admin/directors-board"
export const DIRECTORS_BOARD_ADMIN_URL = `${ADMIN_URL}/directors-board`
// "http://localhost:8000/api/admin/directors-board/:id"
export const getDirectorsBoardMemberAdminUrl = (userId: string | number) => {
    return `${DIRECTORS_BOARD_ADMIN_URL}/${userId}`
}
// "http://localhost:8000/api/admin/directors-board/images"
export const DIRECTORS_BOARD_MEMBER_IMAGES_URL = `${DIRECTORS_BOARD_ADMIN_URL}/images`
// "http://localhost:8000/api/admin/directors-board/images"
export const DIRECTORS_BOARD_MEMBER_REORDER_URL = `${DIRECTORS_BOARD_ADMIN_URL}/reorder`

// Legal documents
// "http://localhost:8000/api/admin/legal-documents"
export const LEGAL_DOCUMENTS_ADMIN_URL = `${ADMIN_URL}/legal-documents`

// "http://localhost:8000/api/admin/legal-documents/bylaws"
export const BYLAWS_ADMIN_URL = `${LEGAL_DOCUMENTS_ADMIN_URL}/bylaws`
