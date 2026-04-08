import { REST_API_URL } from "../../axios.ts"

export const CURRENT_USER_URL = `${REST_API_URL}/users/current-user`

export const CURRENT_USER_AVATAR_URL = `${CURRENT_USER_URL}/avatar`

export const CURRENT_USER_CHANGE_PASSWORD_URL = `${CURRENT_USER_URL}/password-change`

export const CURRENT_USER_NAME_CHANGE_URL = `${CURRENT_USER_URL}/name-change-requests`

export const CURRENT_USER_MEMBERSHIP_URL = `${CURRENT_USER_URL}/membership-requests`
