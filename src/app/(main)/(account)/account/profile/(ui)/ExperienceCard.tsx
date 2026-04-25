import { Card, message, Spin, Typography } from "antd"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"

import api from "@/axios"
import type { IUser } from "@/entities/User"
import styles from "@/app/(main)/(account)/account/profile/(ui)/styles.module.scss"
import ExperienceForm, {
    type IExperienceFormValues,
} from "@/app/(main)/(account)/account/profile/(forms)/ExperienceForm"
import { useState } from "react"

interface IExperienceEntity extends IExperienceFormValues {
    id: number
}

interface IProps {
    user: IUser
    title: string
    subtitle: string
    addButtonText: string
    closeButtonText: string
    deleteEntityLabel: string
    queryScope: "residencies" | "fellowships" | "jobs"
    getCollectionUrl: (_userId: number) => string
    getByIdUrl: (_userId: number, _entityId: number) => string
}

const { Text } = Typography

const getExperienceQueryKey = (userId: number, queryScope: IProps["queryScope"]) => [
    "profile-experiences",
    userId,
    queryScope,
]

const getExperienceQueriesRoot = (userId: number) => ["profile-experiences", userId]

const getDeleteErrorMessage = (error: unknown, deleteEntityLabel: string) => {
    if (isAxiosError<{ detail?: string }>(error)) {
        return error.response?.data?.detail ?? `Failed to delete ${deleteEntityLabel}`
    }

    return `Failed to delete ${deleteEntityLabel}`
}

const getErrorMessage = (error: unknown, defaultMessage: string): string => {
    if (isAxiosError<{ detail?: string; message?: string; error?: string }>(error)) {
        return (
            error.response?.data?.detail ||
            error.response?.data?.message ||
            error.response?.data?.error ||
            defaultMessage
        )
    }

    return defaultMessage
}
const ExperienceCard = ({
    user,
    title,
    subtitle,
    addButtonText,
    closeButtonText,
    deleteEntityLabel,
    queryScope,
    getCollectionUrl,
    getByIdUrl,
}: IProps) => {
    const queryClient = useQueryClient()
    const [isCreating, setIsCreating] = useState(false)

    const { data: entities = [], isLoading } = useQuery<IExperienceEntity[]>({
        queryKey: getExperienceQueryKey(user.id, queryScope),
        queryFn: async () => {
            const response = await api.get<IExperienceEntity[]>(getCollectionUrl(user.id))
            return response.data
        },
    })

    const createMutation = useMutation({
        mutationFn: async (values: IExperienceFormValues) => {
            const response = await api.post<IExperienceEntity>(getCollectionUrl(user.id), values)
            return response.data
        },
        onSuccess: async () => {
            setIsCreating(false)
            await queryClient.invalidateQueries({ queryKey: getExperienceQueriesRoot(user.id) })
            message.success(`Successfully created ${deleteEntityLabel.toLowerCase()}`)
        },
        onError: (error) => {
            const errorMsg = getErrorMessage(
                error,
                `Failed to create ${deleteEntityLabel.toLowerCase()}`,
            )
            message.error(errorMsg)
        },
    })

    const updateMutation = useMutation({
        mutationFn: async ({ id, values }: { id: number; values: IExperienceFormValues }) => {
            const response = await api.put<IExperienceEntity>(getByIdUrl(user.id, id), values)
            return response.data
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: getExperienceQueriesRoot(user.id) })
            message.success(`Successfully updated ${deleteEntityLabel.toLowerCase()}`)
        },
        onError: (error) => {
            const errorMsg = getErrorMessage(
                error,
                `Failed to update ${deleteEntityLabel.toLowerCase()}`,
            )
            message.error(errorMsg)
        },
    })

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(getByIdUrl(user.id, id))
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: getExperienceQueriesRoot(user.id) })
        },
        onError: (error) => {
            message.error(getDeleteErrorMessage(error, deleteEntityLabel))
        },
    })

    return (
        <Card title={title} className={styles.card}>
            <Text className={styles.residencySubtitle}>{subtitle}</Text>

            <div className={styles.residenciesContainer}>
                {isLoading && <Spin />}

                {entities.map((entity) => {
                    const isLastResidency = queryScope === "residencies" && entities.length === 1

                    return (
                        <ExperienceForm
                            key={entity.id}
                            initialValues={entity}
                            isDeleteDisabled={isLastResidency}
                            deleteDisabledReason={
                                isLastResidency ? "At least one residency is required." : undefined
                            }
                            onSubmit={async (values) => {
                                await updateMutation.mutateAsync({ id: entity.id, values })
                            }}
                            onDelete={async () => {
                                await deleteMutation.mutateAsync(entity.id)
                            }}
                            deleteEntityLabel={deleteEntityLabel}
                        />
                    )
                })}

                {isCreating && (
                    <ExperienceForm
                        startInEditMode
                        onSubmit={async (values) => {
                            await createMutation.mutateAsync(values)
                        }}
                        deleteEntityLabel={deleteEntityLabel}
                    />
                )}
            </div>

            <button
                onClick={() => setIsCreating((prev) => !prev)}
                className={styles.addResidencyButton}
            >
                {isCreating ? closeButtonText : addButtonText}
            </button>
        </Card>
    )
}

export default ExperienceCard
