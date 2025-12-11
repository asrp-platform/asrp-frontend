"use client"

import {
    createContext,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react"
import type { IPermission } from "../entities/Permission.ts"
import { useAuth } from "./AuthProvider.tsx"
import api from "../axios.ts"
import { getUserPermissionsStuffUrl } from "../shared/backend/adminApiUrls.ts"

interface IPermissionsContext {
    permissions: IPermission[]
    setPermissions: Dispatch<SetStateAction<IPermission[]>>
    isPermissionsLoading: boolean
}

interface PermissionsProviderProps {
    children: ReactNode
}

const PermissionsContext = createContext<IPermissionsContext | null>(null)

export const PermissionsProvider = ({ children }: PermissionsProviderProps) => {
    const { user, isUserLoading } = useAuth()
    const [permissions, setPermissions] = useState<IPermission[]>([])
    const [isPermissionsLoading, setIsPermissionsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (isUserLoading) {
            return
        }
        if (!user) {
            return
        }
        const fetchUsersPermissions = async () => {
            try {
                setIsPermissionsLoading(true)
                const response = await api.get<IPermission[]>(getUserPermissionsStuffUrl(user.id))
                setPermissions(response.data)
            } catch (error) {
                console.error(error)
            } finally {
                setIsPermissionsLoading(false)
            }
        }

        fetchUsersPermissions()
    }, [user, isUserLoading])

    return (
        <PermissionsContext.Provider value={{ permissions, setPermissions, isPermissionsLoading }}>
            {children}
        </PermissionsContext.Provider>
    )
}

/* eslint-disable */
export const usePermissions = (): IPermissionsContext => {
    const context = useContext(PermissionsContext)
    if (!context) {
        throw new Error("useAuth must be used within a PermissionsProvider")
    }
    return context
}
