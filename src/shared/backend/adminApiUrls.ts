export const ADMIN_URL = "/admin"

// Users
export const STUFF_USERS_URL = `${ADMIN_URL}/users`

export const getUserPermissionsStuffUrl = (userId: string | number) =>
    `${STUFF_USERS_URL}/${userId}/permissions`

export const NAME_CHANGE_REQUESTS_URL = `${STUFF_USERS_URL}/name-change-requests`

// "http://localhost:8000/api/admin/users/name-change-requests"
export const getUserNameChangeRequestById = (userId: number | string, requestId: number | string) =>
    `${STUFF_USERS_URL}/${userId}/name-change-requests/${requestId}`

// Directors Board
export const DIRECTORS_BOARD_ADMIN_URL = `${ADMIN_URL}/directors-board`

export const getDirectorsBoardMemberAdminUrl = (userId: string | number) => {
    return `${DIRECTORS_BOARD_ADMIN_URL}/${userId}`
}

export const DIRECTORS_BOARD_MEMBER_IMAGES_URL = `${DIRECTORS_BOARD_ADMIN_URL}/images`
export const DIRECTORS_BOARD_MEMBER_REORDER_URL = `${DIRECTORS_BOARD_ADMIN_URL}/reorder`
