"use client"

import type {IDirectorsBoardMember} from "../../../../../../entities/DirectorsBoardMember.ts";
import {useState, useEffect} from "react";
import {DIRECTORS_BOARD_URL} from "../../../../../../shared/backend/adminApiUrls.ts";
import api from "../../../../../../axios.ts";
import {renderer} from "../../(helpers)/renderer.tsx";
import CreateDirectorMemberCard from "../CreateCard/CreateDirectorMemberCard.tsx";

import styles from "./styles.module.scss"



const DirectorsBoard = () => {

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
        return "Hello"
    }

    return (
        <div className={styles.boardContainer}>
            {directorMembers.map((member: IDirectorsBoardMember) => (
                <div className={styles.cardContainer} key={member.id}>
                    <h2 className={styles.cardTitle}>{member.role}</h2>
                    <div className={styles.photoContainer}>
                        <div className={styles.photoInnerContainer}>
                            {member.photo_url && <img src={member.photo_url} alt="" />}
                        </div>
                    </div>
                    <h3 className={styles.nameTitle}>{member.name}</h3>
                    <div className={styles.contentContainer}>
                        {renderer(member.content)}
                    </div>
                </div>)
            )}
            <CreateDirectorMemberCard />
        </div>
    );
};

export default DirectorsBoard;