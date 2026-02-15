import { Card, Typography } from "antd"
import styles from "./styles.module.scss"
import ResidencyForm from "../(forms)/ResidencyForm"
import type {
    IUser,
    IUserResidency,
    IUserResidencyFormValues,
} from "../../../../../../entities/User"
import { useEffect, useState } from "react"
import api from "../../../../../../axios"
import {
    getUserResidenciesUrl,
    getUserResidencyByIdUrl,
} from "../../../../../../shared/backend/restApiUrls"
import { isAxiosError } from "axios"

interface IProps {
    user: IUser
}

const { Text } = Typography

const ResidencyCard = ({ user }: IProps) => {
    const [userResidencies, setUserResidencies] = useState<IUserResidency[]>([])

    const [isCreating, setIsCreating] = useState(false)

    useEffect(() => {
        const fetchUserResidencies = async () => {
            try {
                const response = await api.get<IUserResidency[]>(getUserResidenciesUrl(user.id))
                setUserResidencies(response.data)
            } catch (error) {
                if (isAxiosError(error)) {
                    console.error(error)
                }
            }
        }

        fetchUserResidencies()
    }, [user.id])

    const handleCreate = async (values: IUserResidencyFormValues) => {
        const response = await api.post<IUserResidency>(getUserResidenciesUrl(user.id), values)

        setUserResidencies((prev) => [...prev, response.data])

        setIsCreating(false)
    }

    const handleUpdate = async (id: number, values: IUserResidencyFormValues) => {
        const response = await api.put<IUserResidency>(getUserResidencyByIdUrl(user.id, id), values)

        setUserResidencies((prev) => prev.map((r) => (r.id === id ? response.data : r)))
    }

    const handleDelete = async (id: number) => {
        try {
            await api.delete(getUserResidencyByIdUrl(user.id, id))
            setUserResidencies((prev) => prev.filter((r) => r.id !== id))
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error)
            }
        }
    }

    return (
        <Card title="Residency" className={styles.card}>
            <Text className={styles.residencySubtitle}>
                If you are a medical student, residency applicant, or otherwise do not have
                residency training to report, please enter N/A.
            </Text>

            <div className={styles.residenciesContainer}>
                {userResidencies.map((residency) => (
                    <ResidencyForm
                        key={residency.id}
                        initialValues={residency}
                        onSubmit={(values) => handleUpdate(residency.id, values)}
                        onDelete={() => handleDelete(residency.id)}
                    />
                ))}

                {isCreating && <ResidencyForm startInEditMode onSubmit={handleCreate} />}
            </div>

            <button onClick={() => setIsCreating(true)} className={styles.addResidencyButton}>
                + Add residency
            </button>
        </Card>
    )
}

export default ResidencyCard
