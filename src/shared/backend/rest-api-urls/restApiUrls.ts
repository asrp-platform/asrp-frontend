// Auth urls
import { REST_API_URL } from "../../../axios.ts"

export const AUTH_URL = "/auth"
export const REGISTER_URL = `${AUTH_URL}/register`
export const LOGIN_URL = `${AUTH_URL}/login`
export const LOGOUT_URL = `${AUTH_URL}/logout`

// Password reset urls
export const PASSWORD_RESET_URL = `${AUTH_URL}/password-reset`
export const VERIFY_PASSWORD_RESET_TOKEN_URL = `${PASSWORD_RESET_URL}/verify`
export const CONFIRM_PASSWORD_RESET_URL = `${PASSWORD_RESET_URL}/confirm`

// Users urls
export const USERS_URL = "/users"
export const getUserUrl = (user_id: number | string) => `${USERS_URL}/${user_id}`

// User professional information urls
export const getUserProfessionalInformationUrl = (user_id: number | string): string =>
    `${getUserUrl(user_id)}/professional-information`

export const getUserResidenciesUrl = (user_id: number | string): string =>
    `${getUserUrl(user_id)}/residencies`

export const getUserResidencyByIdUrl = (
    userId: number | string,
    residencyId: number | string,
): string => `${getUserUrl(userId)}/residencies/${residencyId}`

export const getUserFellowshipsUrl = (user_id: number | string): string =>
    `${getUserUrl(user_id)}/fellowships`

export const getUserFellowshipByIdUrl = (
    userId: number | string,
    residencyId: number | string,
): string => `${getUserUrl(userId)}/fellowships/${residencyId}`

// Feedback
export const CONTACT_MESSAGE_URL = "/contact-messages"

// Directors board / media
export const getDirectorMemberImageUrl = (imageRelativePath: string) =>
    `${REST_API_URL}/${imageRelativePath.replace(/^\/+/, "")}`

export const DIRECTORS_BOARD_URL = "/directors-board"
export const BYLAWS_URL = `${REST_API_URL}/media/bylaws/bylaws.pdf`
