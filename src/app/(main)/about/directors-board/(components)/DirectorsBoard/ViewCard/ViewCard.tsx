"use client"

import {renderer} from "../../../(helpers)/renderer.tsx";
import type {IDirectorsBoardMember} from "../../../../../../../entities/DirectorsBoardMember.ts";
import {Button} from "antd";

import styles from "./styles.module.scss";
import CardPhoto from "./ui/CardPhoto.tsx";


interface IProps {
    member: IDirectorsBoardMember;
    adminView: boolean;
}


const ViewCard = ({member, adminView}: IProps) => {


    const onDragStart = (memberCard: IDirectorsBoardMember) => {
        console.log(memberCard);
    }


    return (
        <div
            className={styles.cardContainer}
            key={member.id}
            draggable={adminView}
            onDragStart={() => onDragStart(member)}
        >
            <h2 className={styles.cardTitle}>{member.role}</h2>
            <CardPhoto member={member} />
            <h3 className={styles.nameTitle}>{member.name}</h3>
            <div className={styles.contentContainer}>
                {renderer(member.content)}
            </div>
            {adminView && (
                <div className={styles.adminFooter}>
                    <Button type={"primary"}>Edit</Button>
                </div>
            )}
        </div>
    );
};

export default ViewCard;