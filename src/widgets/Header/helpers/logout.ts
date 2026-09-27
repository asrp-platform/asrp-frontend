import api from "@/axios.ts"
import { LOGOUT_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import { queryClient } from "@/shared/queryClient.ts"

export const handleLogout = async () => {
    try {
        await api.post(LOGOUT_URL, {}, { withCredentials: true })
    } catch (error) {
        console.error("Logout request failed", error)
    } finally {
        localStorage.removeItem("accessToken")
        queryClient.removeQueries({ queryKey: ["current-user"] })
        window.location.reload()
    }
}
