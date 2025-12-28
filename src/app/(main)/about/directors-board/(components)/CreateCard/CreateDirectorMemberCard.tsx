"use client"

import {useState} from "react";
import {CirclePlus} from "lucide-react";

import styles from "./styles.module.scss"

const CreateDirectorMemberCard = () => {

    const [createMode, setCreateMode] = useState<boolean>(false)

    if (!createMode) {
        return (
            <div className={styles.createCard} onClick={() => setCreateMode(!createMode)}>
                <CirclePlus width={32} height={32} className={styles.addMemberIcon} />
            </div>
        )
    }



    return (
        <div>
            Hello
        </div>
    );
};

export default CreateDirectorMemberCard;