"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { message } from "antd"
import { useState } from "react"

import api from "@/axios.ts"
import type { CaseTag } from "@entities/CaseOfTheMonth.ts"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"
import {
    CASE_OF_THE_MONTH_TAGS_URL,
    getCaseTagByIdUrl,
} from "@shared/backend/restApiUrls/adminApiUrls.ts"
import type { IPaginatedBackendResponse } from "@shared/interfaces.ts"

import CaseTagsCard from "./components/CaseTagsCard/CaseTagsCard.tsx"
import CasesCard from "./components/CasesCard/CasesCard.tsx"
import CreateCaseTagModal from "./components/CreateCaseTagModal/CreateCaseTagModal.tsx"
import EditCaseTagModal from "./components/EditCaseTagModal/EditCaseTagModal.tsx"
import styles from "./CaseOfTheMonth.module.scss"
import type { CaseTagForm, CaseTagFormValues } from "./types.ts"

type CaseTagsResponse = CaseTag[] | IPaginatedBackendResponse<CaseTag>

interface CreateTagMutationVariables {
    values: CaseTagFormValues
    form: CaseTagForm
}

interface UpdateTagMutationVariables extends CreateTagMutationVariables {
    id: number
}

const CASE_TAGS_QUERY_KEY = ["admin-case-of-the-month-tags"]

const CaseOfTheMonthTab = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [editingTag, setEditingTag] = useState<CaseTag | null>(null)
    const queryClient = useQueryClient()

    const tagsQuery = useQuery({
        queryKey: CASE_TAGS_QUERY_KEY,
        queryFn: async () => {
            const response = await api.get<CaseTagsResponse>(CASE_OF_THE_MONTH_TAGS_URL)
            return Array.isArray(response.data) ? response.data : response.data.data
        },
    })

    const createTagMutation = useMutation({
        mutationFn: async ({ values }: CreateTagMutationVariables) => {
            const response = await api.post<CaseTag>(CASE_OF_THE_MONTH_TAGS_URL, {
                name: values.name.trim(),
            })
            return response.data
        },
        onSuccess: () => {
            message.success("Case tag created")
            setIsCreateModalOpen(false)
            queryClient.invalidateQueries({ queryKey: CASE_TAGS_QUERY_KEY })
        },
        onError: (error, variables) => handleApiError({ error, form: variables.form }),
    })

    const updateTagMutation = useMutation({
        mutationFn: async ({ id, values }: UpdateTagMutationVariables) => {
            const response = await api.patch<CaseTag>(getCaseTagByIdUrl(id), {
                name: values.name.trim(),
            })
            return response.data
        },
        onSuccess: () => {
            message.success("Case tag updated")
            setEditingTag(null)
            queryClient.invalidateQueries({ queryKey: CASE_TAGS_QUERY_KEY })
        },
        onError: (error, variables) => handleApiError({ error, form: variables.form }),
    })

    const deleteTagMutation = useMutation({
        mutationFn: async (tagId: number) => {
            await api.delete(getCaseTagByIdUrl(tagId))
        },
        onSuccess: () => {
            message.success("Case tag deleted")
            setEditingTag(null)
            queryClient.invalidateQueries({ queryKey: CASE_TAGS_QUERY_KEY })
        },
        onError: (error) => handleApiError({ error }),
    })

    const handleCreateModalClose = () => {
        if (createTagMutation.isPending) return

        setIsCreateModalOpen(false)
    }

    const handleEditModalClose = () => {
        if (updateTagMutation.isPending || deleteTagMutation.isPending) return

        setEditingTag(null)
    }

    return (
        <div className={styles.caseOfMonthTab}>
            <CasesCard />
            <CaseTagsCard
                tags={tagsQuery.data ?? []}
                loading={tagsQuery.isLoading}
                onAddTag={() => setIsCreateModalOpen(true)}
                onEditTag={setEditingTag}
            />

            <CreateCaseTagModal
                open={isCreateModalOpen}
                loading={createTagMutation.isPending}
                onCancel={handleCreateModalClose}
                onSubmit={(values, form) => createTagMutation.mutate({ values, form })}
            />

            <EditCaseTagModal
                tag={editingTag}
                updating={updateTagMutation.isPending}
                deleting={deleteTagMutation.isPending}
                onCancel={handleEditModalClose}
                onSubmit={(values, form) => {
                    if (!editingTag) return

                    updateTagMutation.mutate({ id: editingTag.id, values, form })
                }}
                onDelete={() => {
                    if (editingTag) deleteTagMutation.mutate(editingTag.id)
                }}
            />
        </div>
    )
}

export default CaseOfTheMonthTab
