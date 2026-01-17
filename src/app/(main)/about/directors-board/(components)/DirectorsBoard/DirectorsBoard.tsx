"use client"

import type {IDirectorsBoardMember} from "../../../../../../entities/DirectorsBoardMember.ts";
import {useState, useEffect} from "react";
import api from "../../../../../../axios.ts";
import CreateDirectorMemberCard from "../CreateCard/CreateDirectorMemberCard.tsx";

import styles from "./styles.module.scss"
import {DIRECTORS_BOARD_URL} from "../../../../../../shared/backend/restApiUrls.ts";
import {useAuth} from "../../../../../../context/AuthProvider.tsx";

import CircularProgress from "@mui/material/CircularProgress";
import ViewCard from "../ViewCard/ViewCard.tsx";



const DirectorsBoard = () => {

    const { user } = useAuth();

    const [directorMembers, setDirectorMembers] = useState<IDirectorsBoardMember[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [draggingCard, setDraggingCard] = useState<IDirectorsBoardMember | null>(null)

    const draggable = user?.stuff

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

    return (
        <div className={styles.boardContainer}>
            {directorMembers.sort((a, b) => b.order - a.order).map((member) => <ViewCard
                key={member.id}
                member={member}
                directorMembers={directorMembers}
                setDirectorMembers={setDirectorMembers}
                draggingCard={draggingCard}
                setDraggingCard={setDraggingCard}
                draggable={draggable}
            />)}
            { user?.stuff && <CreateDirectorMemberCard /> }
        </div>
    );
};

export default DirectorsBoard;