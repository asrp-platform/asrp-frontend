const domain = "http://localhost:8000"

// "http://localhost:8000/api/admin"
export const ADMIN_URL = `${domain}/api/admin`

//
export const STUFF_USERS_URL = `${ADMIN_URL}/users`


export const getUserPermissionsStuffUrl = (userId: string | number) =>
    `${STUFF_USERS_URL}/${userId}/permissions`


// "http://localhost:8000/api/admin/directors-board"
export const DIRECTORS_BOARD_ADMIN_URL = `${ADMIN_URL}/directors-board`


// "http://localhost:8000/api/admin/directors-board/:id"
export const getDirectorsBoardMemberAdminUrl = (userId: string | number) => {
    return `${DIRECTORS_BOARD_ADMIN_URL}/${userId}`
}


// "http://localhost:8000/api/admin/directors-board/images"
export const DIRECTORS_BOARD_MEMBER_IMAGES_URL = `${DIRECTORS_BOARD_ADMIN_URL}/images`