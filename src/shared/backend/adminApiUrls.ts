const domain = "http://localhost:8000"

// "http://localhost:8000/api/stuff"
export const STUFF_URL = `${domain}/api/stuff`

//
export const STUFF_USERS_URL = `${STUFF_URL}/users`

export const getUserByIdStuffUrl = (userId: number | string) => `${STUFF_USERS_URL}/${userId}`

export const getUserPermissionsStuffUrl = (userId: string | number) =>
    `${STUFF_USERS_URL}/${userId}/permissions`

export const getUserMembershipStuffUrl = (userId: string | number) =>
    `${STUFF_USERS_URL}/${userId}/user-membership`

// Membership url
// "http://localhost:8000/api/stuff/membership"
export const STUFF_MEMBERSHIP_URL = `${STUFF_URL}/memberships`

// User memberships
// "http://localhost:8000/api/stuff/membership/user-memberships"
export const STUFF_USER_MEMBERSHIPS_URL = `${STUFF_MEMBERSHIP_URL}/user-memberships`

export const getStuffUserMembershipUrlById = (id: string | number) =>
    `${STUFF_USER_MEMBERSHIPS_URL}/${id}`


// Payments
export const STUFF_PAYMENTS_URL = `${STUFF_URL}/payments`