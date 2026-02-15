import { Card, Typography } from "antd"
import styles from "./styles.module.scss"
import FellowshipForm from "../(forms)/FellowhipForm.tsx"
import type {
    IUser,
    IUserFellowship,
    IUserFellowshipFormValues,
} from "../../../../../../entities/User"
import { useEffect, useState } from "react"
import api from "../../../../../../axios"
import {
    getUserFellowshipsUrl,
    getUserFellowshipByIdUrl,
} from "../../../../../../shared/backend/restApiUrls"
import { isAxiosError } from "axios"

interface IProps {
    user: IUser
}

const { Text } = Typography

const FellowshipCard = ({ user }: IProps) => {
    const [userFellowships, setUserFellowships] = useState<IUserFellowship[]>([])

    const [isCreating, setIsCreating] = useState(false)

    useEffect(() => {
        const fetchUserFellowships = async () => {
            try {
                const response = await api.get<IUserFellowship[]>(getUserFellowshipsUrl(user.id))
                setUserFellowships(response.data)
            } catch (error) {
                if (isAxiosError(error)) {
                    console.error(error)
                }
            }
        }

        fetchUserFellowships()
    }, [user.id])

    const handleCreate = async (values: IUserFellowshipFormValues) => {
        const response = await api.post<IUserFellowship>(getUserFellowshipsUrl(user.id), values)

        setUserFellowships((prev) => [...prev, response.data])

        setIsCreating(false)
    }

    const handleUpdate = async (id: number, values: IUserFellowshipFormValues) => {
        const response = await api.put<IUserFellowship>(
            getUserFellowshipByIdUrl(user.id, id),
            values
        )

        setUserFellowships((prev) => prev.map((f) => (f.id === id ? response.data : f)))
    }

    const handleDelete = async (id: number) => {
        try {
            await api.delete(getUserFellowshipByIdUrl(user.id, id))

            setUserFellowships((prev) => prev.filter((f) => f.id !== id))
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error)
            }
        }
    }

    return (
        <Card title="Fellowship" className={styles.card}>
            <Text className={styles.residencySubtitle}>
                If you do not have fellowship training to report, please enter N/A.
            </Text>

            <div className={styles.residenciesContainer}>
                {userFellowships.map((fellowship) => (
                    <FellowshipForm
                        key={fellowship.id}
                        initialValues={fellowship}
                        onSubmit={(values: IUserFellowshipFormValues) =>
                            handleUpdate(fellowship.id, values)
                        }
                        onDelete={() => handleDelete(fellowship.id)}
                    />
                ))}

                {isCreating && <FellowshipForm startInEditMode onSubmit={handleCreate} />}
            </div>

            <button onClick={() => setIsCreating(true)} className={styles.addResidencyButton}>
                + Add fellowship
            </button>
        </Card>
    )
}

export default FellowshipCard
