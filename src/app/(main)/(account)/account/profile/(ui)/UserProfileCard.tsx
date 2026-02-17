"use client"

import { Card, Divider } from "antd"

import styles from "./styles.module.scss"
import type { IUser } from "../../../../../../entities/User.ts"
import PersonalInfoForm from "../(forms)/PersonalInfoForm.tsx"
import ProfessionalInfoForm from "../(forms)/ProfessionalInfoForm.tsx"

interface IProps {
    user: IUser
}

const UserProfileCard = ({ user }: IProps) => {
    return (
        <Card className={styles.card}>
            <PersonalInfoForm user={user} />
            <Divider />
            <ProfessionalInfoForm user={user} />
        </Card>
    )
}

export default UserProfileCard
