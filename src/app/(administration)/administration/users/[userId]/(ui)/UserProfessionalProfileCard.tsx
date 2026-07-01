"use client"

import { Alert, Card, Empty, Skeleton, Space, Tag, Typography } from "antd"
import { useQuery } from "@tanstack/react-query"
import { isAxiosError } from "axios"

import api from "@/axios.ts"
import type {
    IUserFellowship,
    IUserJob,
    IUserProfessionalInformation,
    IUserResidency,
} from "@entities/User.ts"
import {
    getUserFellowshipsUrl,
    getUserJobsUrl,
    getUserProfessionalInformationUrl,
    getUserResidenciesUrl,
} from "@shared/backend/restApiUrls/restApiUrls.ts"
import { formatDatetime } from "@shared/helpers/formatDatetime.ts"
import BooleanTag from "@shared/ui/Tags/BooleanTag/BooleanTag.tsx"
import ProfileFieldList from "@app/(administration)/administration/users/[userId]/(ui)/components/ProfileFieldList.tsx"
import styles from "@app/(administration)/administration/users/[userId]/(ui)/styles.module.scss"

interface IProps {
    userId: string
}

type ExperienceItem = (IUserResidency | IUserFellowship | IUserJob) & {
    created_at?: string
    updated_at?: string
}

const { Text } = Typography

const getErrorMessage = (error: unknown) => {
    if (isAxiosError<{ detail?: string; message?: string; error?: string }>(error)) {
        return (
            error.response?.data?.detail ||
            error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to load this section"
        )
    }

    return "Failed to load this section"
}

const SectionError = ({ error }: { error: unknown }) => (
    <Alert type="error" showIcon message={getErrorMessage(error)} />
)

const ExperienceList = ({
    title,
    items,
    isLoading,
    error,
    variant,
}: {
    title: string
    items?: ExperienceItem[]
    isLoading: boolean
    error: unknown
    variant: "jobs" | "residencies" | "fellowships"
}) => {
    const sectionClassNameByVariant = {
        jobs: styles.profileSectionJobs,
        residencies: styles.profileSectionResidencies,
        fellowships: styles.profileSectionFellowships,
    }

    if (isLoading) {
        return (
            <section className={`${styles.profileSection} ${sectionClassNameByVariant[variant]}`}>
                <h3 className={styles.sectionTitle}>{title}</h3>
                <Skeleton active paragraph={{ rows: 3 }} />
            </section>
        )
    }

    if (error) {
        return (
            <section className={`${styles.profileSection} ${sectionClassNameByVariant[variant]}`}>
                <h3 className={styles.sectionTitle}>{title}</h3>
                <SectionError error={error} />
            </section>
        )
    }

    return (
        <section className={`${styles.profileSection} ${sectionClassNameByVariant[variant]}`}>
            <h3 className={styles.sectionTitle}>{title}</h3>

            {!items?.length ? (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={`No ${title.toLowerCase()}`}
                />
            ) : (
                <div className={styles.experienceList}>
                    {items.map((item) => {
                        const location = [item.city, item.state, item.country]
                            .filter(Boolean)
                            .join(", ")

                        return (
                            <article className={styles.experienceCard} key={item.id}>
                                <div className={styles.experienceHeader}>
                                    <div>
                                        <h4>{item.institution || "-"}</h4>
                                        <Text type="secondary">{item.speciality || "-"}</Text>
                                    </div>

                                    {item.current_position && <Tag color="green">Current</Tag>}
                                </div>

                                <dl className={styles.compactFieldGrid}>
                                    <div>
                                        <dt>Location</dt>
                                        <dd>{location || "-"}</dd>
                                    </div>
                                    <div>
                                        <dt>Years</dt>
                                        <dd>{item.years_from_to || "-"}</dd>
                                    </div>
                                    <div>
                                        <dt>Created at</dt>
                                        <dd>{formatDatetime(item.created_at) || "-"}</dd>
                                    </div>
                                    <div>
                                        <dt>Updated at</dt>
                                        <dd>{formatDatetime(item.updated_at) || "-"}</dd>
                                    </div>
                                </dl>
                            </article>
                        )
                    })}
                </div>
            )}
        </section>
    )
}

const UserProfessionalProfileCard = ({ userId }: IProps) => {
    const {
        data: professionalInformation,
        isLoading: isProfessionalInformationLoading,
        error: professionalInformationError,
    } = useQuery({
        queryKey: ["admin-user-professional-information", userId],
        queryFn: async () => {
            const response = await api.get<IUserProfessionalInformation | null>(
                getUserProfessionalInformationUrl(userId),
            )
            return response.data
        },
        retry: false,
    })

    const {
        data: jobs,
        isLoading: areJobsLoading,
        error: jobsError,
    } = useQuery({
        queryKey: ["admin-user-jobs", userId],
        queryFn: async () => {
            const response = await api.get<ExperienceItem[]>(getUserJobsUrl(userId))
            return response.data
        },
        retry: false,
    })

    const {
        data: residencies,
        isLoading: areResidenciesLoading,
        error: residenciesError,
    } = useQuery({
        queryKey: ["admin-user-residencies", userId],
        queryFn: async () => {
            const response = await api.get<ExperienceItem[]>(getUserResidenciesUrl(userId))
            return response.data
        },
        retry: false,
    })

    const {
        data: fellowships,
        isLoading: areFellowshipsLoading,
        error: fellowshipsError,
    } = useQuery({
        queryKey: ["admin-user-fellowships", userId],
        queryFn: async () => {
            const response = await api.get<ExperienceItem[]>(getUserFellowshipsUrl(userId))
            return response.data
        },
        retry: false,
    })

    return (
        <Card className={styles.profileCard}>
            <Space direction="vertical" size={24} style={{ width: "100%" }}>
                {isProfessionalInformationLoading ? (
                    <section className={styles.profileSection}>
                        <h3 className={styles.sectionTitle}>Medical education</h3>
                        <Skeleton active paragraph={{ rows: 3 }} />
                    </section>
                ) : professionalInformationError ? (
                    <section className={styles.profileSection}>
                        <h3 className={styles.sectionTitle}>Medical education</h3>
                        <SectionError error={professionalInformationError} />
                    </section>
                ) : professionalInformation ? (
                    <>
                        <ProfileFieldList
                            title="Medical education"
                            variant="education"
                            fields={[
                                {
                                    label: "Medical school",
                                    value: professionalInformation.medical_school,
                                },
                                {
                                    label: "Country of medical school",
                                    value: professionalInformation.medical_school_country,
                                },
                                {
                                    label: "Years",
                                    value: professionalInformation.years_from_to,
                                },
                                {
                                    label: "Updated at",
                                    value: formatDatetime(professionalInformation.updated_at),
                                },
                            ]}
                        />

                        <ProfileFieldList
                            title="Professional status"
                            variant="status"
                            fields={[
                                {
                                    label: "Board-certified pathologist",
                                    value: (
                                        <BooleanTag
                                            value={
                                                professionalInformation.is_board_certified_pathologist
                                            }
                                        />
                                    ),
                                },
                                {
                                    label: "U.S. pathology trainee",
                                    value: (
                                        <BooleanTag
                                            value={professionalInformation.is_us_pathology_trainee}
                                        />
                                    ),
                                },
                                {
                                    label: "U.S. lab professional",
                                    value: (
                                        <BooleanTag
                                            value={professionalInformation.is_us_lab_professional}
                                        />
                                    ),
                                },
                            ]}
                        />
                    </>
                ) : (
                    <section className={styles.profileSection}>
                        <h3 className={styles.sectionTitle}>Medical education</h3>
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="No professional information"
                        />
                    </section>
                )}

                <ExperienceList
                    title="Jobs"
                    variant="jobs"
                    items={jobs}
                    isLoading={areJobsLoading}
                    error={jobsError}
                />
                <ExperienceList
                    title="Residencies"
                    variant="residencies"
                    items={residencies}
                    isLoading={areResidenciesLoading}
                    error={residenciesError}
                />
                <ExperienceList
                    title="Fellowships"
                    variant="fellowships"
                    items={fellowships}
                    isLoading={areFellowshipsLoading}
                    error={fellowshipsError}
                />
            </Space>
        </Card>
    )
}

export default UserProfessionalProfileCard
