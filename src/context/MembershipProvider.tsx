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
import type { IUserMembership } from "../entities/Membership.ts"
import { useAuth } from "./AuthProvider.tsx"

interface IMembershipContext {
    membership: IUserMembership | null
    setMembership: Dispatch<SetStateAction<IUserMembership | null>>
    isMembershipLoading: boolean
}

interface MembershipProviderProps {
    children: ReactNode
}

const MembershipContext = createContext<IMembershipContext | null>(null)

export const MembershipProvider = ({ children }: MembershipProviderProps) => {
    const { user, isUserLoading } = useAuth()
    const [membership, setMembership] = useState<IUserMembership | null>(null)
    const [isMembershipLoading, setIsMembershipLoading] = useState<boolean>(false)

    useEffect(() => {
        if (isUserLoading) {
            return
        }

        if (!user) {
            setMembership(null)
            return
        }

        const fetchMembership = async () => {
            try {
                setIsMembershipLoading(true)
                // const response = await api.get<IUserMembership>(CURRENT_USER_MEMBERSHIP)
                // setMembership(response.data)
            } catch (error) {
                console.error(error)
                setMembership(null)
            } finally {
                setIsMembershipLoading(false)
            }
        }

        fetchMembership()
    }, [user, isUserLoading])

    return (
        <MembershipContext.Provider value={{ membership, isMembershipLoading, setMembership }}>
            {children}
        </MembershipContext.Provider>
    )
}

/* eslint-disable */
export const useMembership = (): IMembershipContext => {
    const context = useContext(MembershipContext)
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider")
    }
    return context
}
