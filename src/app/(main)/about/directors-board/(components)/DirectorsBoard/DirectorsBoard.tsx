"use client"

import type {IDirectorsBoardMember} from "../../../../../../entities/DirectorsBoardMember.ts";
import {useState, useEffect, useMemo} from "react";
import api from "../../../../../../axios.ts";
import CreateDirectorMemberCard from "./CreateCard/CreateDirectorMemberCard.tsx";

import styles from "./styles.module.scss"
import {DIRECTORS_BOARD_URL} from "../../../../../../shared/backend/restApiUrls.ts";
import {useAuth} from "../../../../../../context/AuthProvider.tsx";

import CircularProgress from "@mui/material/CircularProgress";
import ViewCard from "./ViewCard/ViewCard.tsx";
import {reorder} from "../../(helpers)/reorderer.ts";

const DirectorsBoard = () => {

    const { user } = useAuth();

    const adminView = useMemo(() => {
        if (!user) return false
        return user?.stuff
    }, [user])

    const [directorMembers, setDirectorMembers] = useState<IDirectorsBoardMember[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchDirectorMembers = async () => {

            try {
                setIsLoading(true);
                const response = await api.get<IDirectorsBoardMember[]>(DIRECTORS_BOARD_URL);
                setDirectorMembers(response.data)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchDirectorMembers()
    }, [])

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <CircularProgress size={24} />
            </div>
        )
    }


    if (directorMembers) {
        reorder(directorMembers, 0, 3)
    }


    return (
        <div className={styles.boardContainer}>
            {directorMembers.sort((a, b) => a.order - b.order).map((member: IDirectorsBoardMember) =>
                <ViewCard
                    key={member.id}
                    member={member}
                    adminView={adminView}
                />
            )}
            { user?.stuff && <CreateDirectorMemberCard /> }
        </div>
    );
};

export default DirectorsBoard;