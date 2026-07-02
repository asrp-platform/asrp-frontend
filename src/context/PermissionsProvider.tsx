"use client"

import {
    createContext,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from "react"
import type { IPermission } from "@/entities/Permission.ts"
import api from "@/axios.ts"
import { useCurrentUserQuery } from "@shared/backend/queries/useCurrentUserQuery.ts"
import { getUserPermissionsAdminUrl } from "@/shared/backend/restApiUrls/admin/adminApiUrls"

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
    const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUserQuery()
    const [permissions, setPermissions] = useState<string[]>([])
    const [isPermissionsLoading, setIsPermissionsLoading] = useState<boolean>(false)

    // Before paint: staff users need permissions for UI that depends on them — avoids one frame
    // without Edit / admin controls, then a late pop-in when the fetch completes.
    useLayoutEffect(() => {
        if (isCurrentUserLoading) {
            return
        }
        if (!currentUser || !currentUser.admin) {
            setPermissions([])
            setIsPermissionsLoading(false)
            return
        }
        setIsPermissionsLoading(true)
    }, [isCurrentUserLoading, currentUser])

    useEffect(() => {
        if (isCurrentUserLoading || !currentUser?.admin) {
            return
        }

        const fetchUsersPermissions = async () => {
            try {
                const response = await api.get<IPermission[]>(
                    getUserPermissionsAdminUrl(currentUser.id),
                )
                setPermissions(response.data.map((p) => p.action))
            } catch (error) {
                console.error(error)
            } finally {
                setIsPermissionsLoading(false)
            }
        }

        fetchUsersPermissions()
    }, [currentUser, isCurrentUserLoading])

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
