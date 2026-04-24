"use client"

import type { IDirectorsBoardMember } from "@/entities/DirectorsBoardMember.ts"
import { useState, useEffect, useMemo } from "react"
import api from "@/axios.ts"
import CreateDirectorMemberCard from "@/app/(main)/about/directors-board/(components)/CreateCard/CreateDirectorMemberCard.tsx"

import styles from "@/app/(main)/about/directors-board/(components)/DirectorsBoard/styles.module.scss"
import { useAuth } from "@/context/AuthProvider.tsx"

import CircularProgress from "@mui/material/CircularProgress"
import ViewCard from "@/app/(main)/about/directors-board/(components)/ViewCard/ViewCard.tsx"
import { usePermissions } from "@/context/PermissionsProvider.tsx"
import { useIsMobile } from "@/shared/hooks/useIsMobile.ts"
import { DIRECTORS_BOARD_URL } from "@/shared/backend/rest-api-urls/restApiUrls.ts"

const DirectorsBoard = () => {
    const { user, isUserLoading } = useAuth()
    const { permissions, isPermissionsLoading } = usePermissions()
    const isMobile = useIsMobile()

    const [directorMembers, setDirectorMembers] = useState<IDirectorsBoardMember[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [draggingCard, setDraggingCard] = useState<IDirectorsBoardMember | null>(null)

    const canManageDirectorMembers = useMemo(() => {
        return user?.admin && permissions.includes("director_board.update")
    }, [user?.admin, permissions])

    const canCreate = useMemo(() => {
        return user?.admin && permissions.includes("director_board.create") && !isMobile
    }, [user?.admin, permissions, isMobile])

    const isAccessContextPending = isUserLoading || (Boolean(user?.admin) && isPermissionsLoading)

    useEffect(() => {
        const fetchDirectorMembers = async () => {
            try {
                setIsLoading(true)
                const response = await api.get<IDirectorsBoardMember[]>(DIRECTORS_BOARD_URL)
                setDirectorMembers(response.data)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDirectorMembers()
    }, [])

    if (isLoading || isAccessContextPending) {
        return (
            <div className={styles.loadingContainer}>
                <CircularProgress size={24} />
            </div>
        )
    }

    return (
        <div className={styles.boardContainer}>
            {directorMembers
                .sort((a, b) => b.order - a.order)
                .map((member) => (
                    <ViewCard
                        key={member.id}
                        member={member}
                        directorMembers={directorMembers}
                        setDirectorMembers={setDirectorMembers}
                        draggingCard={draggingCard}
                        setDraggingCard={setDraggingCard}
                        canManageDirectorMembers={canManageDirectorMembers}
                    />
                ))}
            {canCreate && <CreateDirectorMemberCard />}
        </div>
    )
}

export default DirectorsBoard
