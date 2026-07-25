"use client"

import type { IDirectorsBoardMember } from "@/entities/DirectorsBoardMember.ts"
import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import api from "@/axios.ts"
import CreateDirectorMemberCard from "@/app/(main)/about/directors-board/(components)/CreateCard/CreateDirectorMemberCard.tsx"

import styles from "@/app/(main)/about/directors-board/(components)/DirectorsBoard/styles.module.scss"

import Skeleton from "@mui/material/Skeleton"
import ViewCard from "@/app/(main)/about/directors-board/(components)/ViewCard/ViewCard.tsx"
import { useIsMobile } from "@/shared/hooks/useIsMobile.ts"
import { useCurrentUserQuery } from "@shared/backend/queries/useCurrentUserQuery.ts"
import { useCurrentUserPermissionsQuery } from "@shared/backend/queries/usePermissionsQuery.ts"
import { DIRECTORS_BOARD_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"

const SKELETON_CARDS_COUNT = 4
const DIRECTORS_BOARD_QUERY_KEY = ["directors-board"]

const DirectorsBoardSkeleton = () => (
    <div className={styles.boardContainer} aria-label="Loading board members" aria-busy="true">
        {Array.from({ length: SKELETON_CARDS_COUNT }, (_, index) => (
            <div className={styles.skeletonCard} key={index}>
                <Skeleton variant="text" width="45%" height={38} />
                <Skeleton variant="rounded" width={180} height={180} />
                <Skeleton variant="text" width="55%" height={32} />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="85%" />
                <Skeleton variant="rounded" width={100} height={32} />
            </div>
        ))}
    </div>
)

const DirectorsBoard = () => {
    const queryClient = useQueryClient()
    const { data: currentUser, isLoading: isCurrentUserLoading } = useCurrentUserQuery()
    const { data: permissions = [], isLoading: isPermissionsLoading } =
        useCurrentUserPermissionsQuery()
    const { data: fetchedDirectorMembers = [], isLoading: isDirectorMembersLoading } = useQuery({
        queryKey: DIRECTORS_BOARD_QUERY_KEY,
        queryFn: async () => {
            const response = await api.get<IDirectorsBoardMember[]>(DIRECTORS_BOARD_URL)
            return response.data
        },
        staleTime: 1000 * 60 * 5,
    })
    const isMobile = useIsMobile()

    const [draggingCard, setDraggingCard] = useState<IDirectorsBoardMember | null>(null)
    const directorMembers = [...fetchedDirectorMembers].sort((a, b) => b.order - a.order)
    const setDirectorMembers = (members: IDirectorsBoardMember[]) => {
        queryClient.setQueryData(DIRECTORS_BOARD_QUERY_KEY, members)
    }

    const canManageDirectorMembers = Boolean(
        currentUser?.admin && permissions.some(({ action }) => action === "directors_board.update"),
    )
    const canCreate = Boolean(
        currentUser?.admin &&
        permissions.some(({ action }) => action === "directors_board.create") &&
        !isMobile,
    )

    const isAccessContextPending =
        isCurrentUserLoading || (Boolean(currentUser?.admin) && isPermissionsLoading)

    if (isDirectorMembersLoading || isAccessContextPending) {
        return <DirectorsBoardSkeleton />
    }

    return (
        <div className={styles.boardContainer}>
            {directorMembers.map((member) => (
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
