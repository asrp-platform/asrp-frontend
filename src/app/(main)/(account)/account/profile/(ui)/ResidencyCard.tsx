import { Card, Typography } from "antd"
import styles from "./styles.module.scss"
import ResidencyForm from "../(forms)/ResidencyForm.tsx"
import type { IUser, IUserResidency } from "../../../../../../entities/User.ts"
import { useEffect, useState } from "react"
import api from "../../../../../../axios.ts"
import {
    getUserResidenciesUrl,
    getUserResidencyByIdUrl,
} from "../../../../../../shared/backend/restApiUrls.ts"
import { isAxiosError } from "axios"

interface IProps {
    user: IUser
}

const { Text } = Typography

const ResidencyCard = ({ user }: IProps) => {
    const [userResidencies, setUserResidencies] = useState<IUserResidency[]>([])

    const updateResidency = async (residencyId: number | string, values: any) => {
        try {
            await api.put<IUserResidency>(getUserResidencyByIdUrl(user.id, residencyId), values)
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                throw error
            }
        }
    }

    useEffect(() => {
        console.log("Mounted")
        const fetchUserResidencies = async () => {
            try {
                const response = await api.get<IUserResidency[]>(getUserResidenciesUrl(user.id))
                setUserResidencies(response.data)
            } catch (error: unknown) {
                if (isAxiosError(error)) {
                    console.error(error)
                }
            }
        }
        fetchUserResidencies()
    }, [user.id])

    return (
        <Card title="Residency" className={styles.card}>
            <Text className={styles.residencySubtitle}>
                If you are a medical student, residency applicant, U.S.-based laboratory
                professional, or otherwise do not have residency training to report, please enter
                N/A in the required fields below.
            </Text>
            <div className={styles.residenciesContainer}>
                {userResidencies.map((residency: IUserResidency) => (
                    <ResidencyForm
                        key={residency.id}
                        residency={residency}
                        onSubmit={updateResidency}
                    />
                ))}
            </div>
        </Card>
    )
}

export default ResidencyCard
