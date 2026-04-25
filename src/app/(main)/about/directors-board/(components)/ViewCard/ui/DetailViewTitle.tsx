"use client"

import styles from "@/app/(main)/about/directors-board/(components)/ViewCard/ui/styles.module.scss"
import type { IDirectorsBoardMember } from "@/entities/DirectorsBoardMember.ts"

interface IProps {
    member: IDirectorsBoardMember
}

const DetailViewTitle = ({ member }: IProps) => {
    return (
        <div>
            <h2 className={styles.cardTitle}>{member.role}</h2>
            <h3 className={styles.nameTitle}>{member.name}</h3>
        </div>
    )
}

export default DetailViewTitle
