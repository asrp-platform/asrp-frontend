const domain = process.env.NEXT_PUBLIC_API_URL

export const REST_API_URL = `${domain}/api`

// Auth urls
// http:127.0.0.1:8000/api/auth
export const AUTH_URL = `${REST_API_URL}/auth`

export const REGISTER_URL = `${AUTH_URL}/register`

export const LOGIN_URL = `${AUTH_URL}/login`
export const LOGOUT_URL = `${AUTH_URL}/logout`

export const REFRESH_URL = `${AUTH_URL}/refresh`

// http:127.0.0.1:8000/api/auth/password-reset
export const PASSWORD_RESET_URL = `${AUTH_URL}/password-reset`

// http:127.0.0.1:8000/api/auth/password-reset/verify
export const VERIFY_PASSWORD_RESET_TOKEN_URL = `${PASSWORD_RESET_URL}/verify`

// http:127.0.0.1:8000/api/auth/password-reset/confirm
export const CONFIRM_PASSWORD_RESET_URL = `${PASSWORD_RESET_URL}/confirm`

// Media urls
export const getAvatarUrl = (avatarPath: string) => `${REST_API_URL}/${avatarPath}`

// Users urls
// http:127.0.0.1:8000/api/users
export const USERS_URL = `${REST_API_URL}/users`

// http:127.0.0.1:8000/api/users/:user_id
export const getUserUrl = (user_id: number | string) => `${USERS_URL}/${user_id}`

// http:127.0.0.1:8000/api/users/:user_id/avatar
export const putUserAvatarUrl = (user_id: number | string) => `${getUserUrl(user_id)}/avatar`

export const getUserPasswordChangeUrl = (user_id: number | string) =>
    `${getUserUrl(user_id)}/password-change`

// http:127.0.0.1:8000/api/users/current-user
export const CURRENT_USER_URL = `${USERS_URL}/current-user`

// User professional information urls

// http:127.0.0.1:8000/api/users/:user_id/professional-information
export const getUserProfessionalInformationUrl = (user_id: number | string): string =>
    `${getUserUrl(user_id)}/professional-information`

// http:127.0.0.1:8000/api/users/:user_id/residencies
export const getUserResidenciesUrl = (user_id: number | string): string =>
    `${getUserUrl(user_id)}/residencies`

// http:127.0.0.1:8000/api/users/:user_id/residencies/:residencyId
export const getUserResidencyByIdUrl = (
    userId: number | string,
    residencyId: number | string
): string => `${getUserUrl(userId)}/residencies/${residencyId}`

// http:127.0.0.1:8000/api/users/:user_id/fellowships
export const getUserFellowshipsUrl = (user_id: number | string): string =>
    `${getUserUrl(user_id)}/fellowships`

// http:127.0.0.1:8000/api/users/:user_id/fellowships/:fellowshipId
export const getUserFellowshipByIdUrl = (
    userId: number | string,
    residencyId: number | string
): string => `${getUserUrl(userId)}/fellowships/${residencyId}`

// Feedback
// "http://localhost:8000/api/contact-messages"
export const CONTACT_MESSAGE_URL = `${REST_API_URL}/contact-messages`

// http://localhost:8000/api/media/news_uploaded/{image_name}
export const getDirectorMemberImageUrl = (imageRelativePath: string) =>
    `${REST_API_URL}/${imageRelativePath}`

// "http://localhost:8000/api/directors-board"
export const DIRECTORS_BOARD_URL = `${REST_API_URL}/directors-board`

// http://localhost:8000/api/media/bylaws/bylaws.pdf
export const BYLAWS_URL = `${REST_API_URL}/media/bylaws/bylaws.pdf`
