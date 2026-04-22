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
import { getUserPermissionsStuffUrl } from "../shared/backend/rest-api-urls/admin/adminApiUrls.ts"

interface IPermissionsContext {
    permissions: string[]
    setPermissions: Dispatch<SetStateAction<string[]>>
    isPermissionsLoading: boolean
}

interface PermissionsProviderProps {
    children: ReactNode
}

const PermissionsContext = createContext<IPermissionsContext | null>(null)

export const PermissionsProvider = ({ children }: PermissionsProviderProps) => {
    const { user, isUserLoading } = useAuth()
    const [permissions, setPermissions] = useState<string[]>([])
    const [isPermissionsLoading, setIsPermissionsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (isUserLoading || !user) {
            return
        }
        if (user && !user.admin) {
            return
        }
        const fetchUsersPermissions = async () => {
            try {
                setIsPermissionsLoading(true)
                const response = await api.get<IPermission[]>(getUserPermissionsStuffUrl(user.id))
                setPermissions(response.data.map((p) => p.action))
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
