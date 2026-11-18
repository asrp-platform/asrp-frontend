import { isAxiosError } from "axios"

/** A failed password confirmation is independent of bearer-token authentication. */
export const isCurrentPasswordError = (error: unknown): boolean => {
    if (!isAxiosError<{ detail?: unknown }>(error)) return false
    const path = error.config?.url?.split(/[?#]/, 1)[0].replace(/\/$/, "")
    return (
        error.config?.method?.toLowerCase() === "post" &&
        Boolean(path?.endsWith("/users/current-user/password-change")) &&
        (error.response?.status === 401 || error.response?.status === 403) &&
        (error.response.data?.detail === "Wrong password" ||
            error.response.data?.detail === "Invalid password")
    )
}
