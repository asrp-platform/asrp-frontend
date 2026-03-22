"use client"

import {
    createContext,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"
import api from "../axios.ts"
import type { IUser } from "../entities/User.ts"
import { CURRENT_USER_URL } from "../shared/backend/currentUserUrls.ts"

interface IAuthContext {
    user: IUser | null
    setUser: Dispatch<SetStateAction<IUser | null>>
    fetchUser: () => Promise<void>
    isUserLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<IAuthContext | null>(null)

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<null | IUser>(null)
    const [isUserLoading, setIsUserLoading] = useState<boolean>(true)

    const fetchUser = useCallback(async () => {
        try {
            setIsUserLoading(true)
            const response = await api.get<IUser>(CURRENT_USER_URL, { withCredentials: true })
            setUser(response.data)
        } catch (error) {
            console.error(error)
            setUser(null)
        } finally {
            setIsUserLoading(false)
        }
    }, [setUser, setIsUserLoading])

    useEffect(() => {
        fetchUser()
    }, [setIsUserLoading, setUser, fetchUser])

    return (
        <AuthContext.Provider value={{ user, setUser, fetchUser, isUserLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

/* eslint-disable */
export const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider")
    }
    return context
}
