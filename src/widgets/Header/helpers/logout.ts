import api from "../../../axios.ts"
import { LOGOUT_URL } from "../../../shared/backend/restApiUrls.ts"

export const handleLogout = async () => {
    await api.post(LOGOUT_URL)
    localStorage.removeItem("accessToken")
    window.location.reload()
}
