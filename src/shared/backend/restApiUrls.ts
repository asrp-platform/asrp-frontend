const domain = "http://localhost:8000"

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

export const getUserPasswordChangeUrl = (user_id: number | string) =>
    `${getUserUrl(user_id)}/password-change`

// http:127.0.0.1:8000/api/users/current-user
export const CURRENT_USER_URL = `${USERS_URL}/current-user`


// Feedback
// "http://localhost:8000/api/contact-messages"
export const CONTACT_MESSAGE_URL = `${REST_API_URL}/contact-messages`

// "http://localhost:8000/api/contact-messages/:messageId"
export const getContactMessageUrl = (message_id: number | string) =>
    `${CONTACT_MESSAGE_URL}/${message_id}`

// "http://localhost:8000/api/contact-messages/:messageId/answers"
export const getContactMessageAnswersUrl = (message_id: number | string) =>
    `${getContactMessageUrl(message_id)}/answers`

// News and events
// http://localhost:8000/api/news
export const NEWS_URL = `${REST_API_URL}/news`

// http://localhost:8000/api/news/:id
export const getNewsDetailUrl = (id: number | string) => `${NEWS_URL}/${id}`

// http://localhost:8000/api/news/images
export const UPLOAD_NEWS_IMAGE_URL = `${NEWS_URL}/images`

// http://localhost:8000/api/media/news_uploaded/{image_name}
export const getNewsImageUrl = (imageRelativePath: string) => `${REST_API_URL}/${imageRelativePath}`

// Membership
// http://localhost:8000/api/membership
export const MEMBERSHIPS_URL = `${REST_API_URL}/memberships`

// http://localhost:8000/api/memberships/membership-types
export const MEMBERSHIP_TYPE_URL = `${MEMBERSHIPS_URL}/membership-types`

// http://localhost:8000/api/memberships/membership-types/:id
export const getMembershipTypeById = (id: number | string) => `${MEMBERSHIP_TYPE_URL}/${id}`

// http://localhost:8000/api/memberships/:id/checkout-sessions
export const getMembershipCheckoutLink = (id: number | string) =>
    `${MEMBERSHIP_TYPE_URL}/${id}/checkout-sessions`

// User membership
// http://localhost:8000/api/membership/user-memberships
export const USER_MEMBERSHIP_URL = `${MEMBERSHIPS_URL}/user-memberships`

// http://localhost:8000/api/membership/user-memberships/current-user-membership
export const CURRENT_USER_MEMBERSHIP = `${USER_MEMBERSHIP_URL}/current-user-membership`

// Payments
// http://localhost:8000/api/payments
export const PAYMENTS_URL = `${REST_API_URL}/payments`

// http://localhost:8000/api/payments/donations/checkout-sessions
export const MAKE_DONATION_URL = `${PAYMENTS_URL}/donations/checkout-sessions`

// http://localhost:8000/api/memberships/checkout-sessions/:sessionId
export const getMembershipCheckoutSessionData = (sessionId: string) =>
    `${PAYMENTS_URL}/checkout-sessions/${sessionId}`

// Sponsorship Requests
export const SPONSORSHIP_REQUESTS_URL = `${REST_API_URL}/sponsorship-requests`

// Permissions
// http://localhost:8000/api/permissions
export const PERMISSIONS_URL = `${REST_API_URL}/permissions`
