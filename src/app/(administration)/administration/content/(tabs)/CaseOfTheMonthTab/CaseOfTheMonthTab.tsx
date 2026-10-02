"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { message } from "antd"
import { useState } from "react"

import api from "@/axios.ts"
import type { CaseOfTheMonth, CaseTag } from "@entities/CaseOfTheMonth.ts"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"
import {
    CASE_OF_THE_MONTH_CASES_URL,
    CASE_OF_THE_MONTH_TAGS_URL,
    getCaseOfTheMonthByIdUrl,
    getCaseTagByIdUrl,
} from "@shared/backend/restApiUrls/adminApiUrls.ts"
import type { IPaginatedBackendResponse } from "@shared/interfaces.ts"
import { useTableDataQuery } from "@shared/backend/queries/tableDataQuery/useTableDataQuery.ts"
import { DEFAULT_PAGE_SIZE } from "@shared/options.ts"
import { useAdminPermissions } from "@shared/backend/queries/usePermissionsQuery.ts"

import CaseTagsCard from "./components/CaseTagsCard/CaseTagsCard.tsx"
import CasesCard from "./components/CasesCard/CasesCard.tsx"
import CreateCaseModal from "./components/CreateCaseModal/CreateCaseModal.tsx"
import CreateCaseTagModal from "./components/CreateCaseTagModal/CreateCaseTagModal.tsx"
import EditCaseTagModal from "./components/EditCaseTagModal/EditCaseTagModal.tsx"
import styles from "./CaseOfTheMonth.module.scss"
import type {
    CaseOfTheMonthForm,
    CaseOfTheMonthFormValues,
    CaseTagForm,
    CaseTagFormValues,
} from "./types.ts"

type CaseTagsResponse = CaseTag[] | IPaginatedBackendResponse<CaseTag>

interface CreateTagMutationVariables {
    values: CaseTagFormValues
    form: CaseTagForm
}

interface UpdateTagMutationVariables extends CreateTagMutationVariables {
    id: number
}

const CASE_TAGS_QUERY_KEY = ["admin-case-of-the-month-tags"]
const CASES_QUERY_KEY = ["admin-case-of-the-month-cases"]

interface CaseMutationVariables {
    caseId: number | null
    values: CaseOfTheMonthFormValues
    form: CaseOfTheMonthForm
}

const toCasePayload = (values: CaseOfTheMonthFormValues) => ({
    title: values.title.trim(),
    cover_key: values.cover_key || null,
    history: values.history,
    case_findings: values.case_findings,
    virtual_slides: (values.virtual_slides ?? []).map((slide) => slide.trim()).filter(Boolean),
    questions: (values.questions ?? []).map((question) => question.trim()).filter(Boolean),
    publication_month: values.publication_month.format("YYYY-MM-DD"),
    answer: values.answer,
    tag_ids: values.tag_ids ?? [],
})

const CaseOfTheMonthTab = () => {
    const { can } = useAdminPermissions()
    const [isCaseModalOpen, setIsCaseModalOpen] = useState(false)
    const [selectedCase, setSelectedCase] = useState<CaseOfTheMonth | null>(null)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [editingTag, setEditingTag] = useState<CaseTag | null>(null)
    const [page, setPage] = useState(1)
    const [ordering, setOrdering] = useState<string[]>(["-publication_month", "-id"])
    const queryClient = useQueryClient()
    const pageSize = DEFAULT_PAGE_SIZE

    const casesQuery = useTableDataQuery<CaseOfTheMonth>({
        url: CASE_OF_THE_MONTH_CASES_URL,
        queryKey: CASES_QUERY_KEY,
        page,
        pageSize,
        ordering,
        enabled: can("case_of_the_month.view"),
    })

    const tagsQuery = useQuery({
        queryKey: CASE_TAGS_QUERY_KEY,
        queryFn: async () => {
            const response = await api.get<CaseTagsResponse>(CASE_OF_THE_MONTH_TAGS_URL)
            return Array.isArray(response.data) ? response.data : response.data.data
        },
        enabled: can("case_of_the_month.view"),
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

    const saveCaseMutation = useMutation({
        mutationFn: async ({ caseId, values }: CaseMutationVariables) => {
            const payload = toCasePayload(values)

            if (caseId) {
                const response = await api.patch<CaseOfTheMonth>(
                    getCaseOfTheMonthByIdUrl(caseId),
                    payload,
                )
                return response.data
            }

            const response = await api.post<CaseOfTheMonth>(CASE_OF_THE_MONTH_CASES_URL, payload)
            return response.data
        },
        onSuccess: async (_, variables) => {
            message.success(variables.caseId ? "Case updated" : "Case created")
            setIsCaseModalOpen(false)
            setSelectedCase(null)
            await queryClient.invalidateQueries({ queryKey: CASES_QUERY_KEY })
        },
        onError: (error, variables) => handleApiError({ error, form: variables.form }),
    })

    const handleCreateModalClose = () => {
        if (createTagMutation.isPending) return

        setIsCreateModalOpen(false)
    }

    const handleEditModalClose = () => {
        if (updateTagMutation.isPending || deleteTagMutation.isPending) return

        setEditingTag(null)
    }

    const handleCaseModalClose = () => {
        if (saveCaseMutation.isPending) return

        setIsCaseModalOpen(false)
        setSelectedCase(null)
    }

    return (
        <div className={styles.caseOfMonthTab}>
            <CasesCard
                data={casesQuery.data?.data ?? []}
                page={page}
                pageSize={pageSize}
                total={casesQuery.data?.count ?? 0}
                ordering={ordering}
                loading={casesQuery.isLoading || casesQuery.isFetching}
                onCreateCase={() => {
                    setSelectedCase(null)
                    setIsCaseModalOpen(true)
                }}
                onPageChange={setPage}
                onOrderingChange={setOrdering}
                onEditCase={(caseItem) => {
                    setSelectedCase(caseItem)
                    setIsCaseModalOpen(true)
                }}
                canCreate={can("case_of_the_month.create")}
                canUpdate={can("case_of_the_month.update")}
            />
            <CaseTagsCard
                tags={tagsQuery.data ?? []}
                loading={tagsQuery.isLoading}
                onAddTag={() => setIsCreateModalOpen(true)}
                onEditTag={setEditingTag}
                canCreate={can("case_of_the_month.create")}
                canUpdate={can("case_of_the_month.update")}
            />

            {can("case_of_the_month.create") && (
                <CreateCaseTagModal
                    open={isCreateModalOpen}
                    loading={createTagMutation.isPending}
                    onCancel={handleCreateModalClose}
                    onSubmit={(values, form) => createTagMutation.mutate({ values, form })}
                />
            )}

            {(can("case_of_the_month.create") || can("case_of_the_month.update")) && (
                <CreateCaseModal
                    open={isCaseModalOpen}
                    tags={tagsQuery.data ?? []}
                    caseItem={selectedCase}
                    submitting={saveCaseMutation.isPending}
                    canCreate={can("case_of_the_month.create")}
                    canUpdate={can("case_of_the_month.update")}
                    onCancel={handleCaseModalClose}
                    onSubmit={(values, form) =>
                        saveCaseMutation.mutate({
                            caseId: selectedCase?.id ?? null,
                            values,
                            form,
                        })
                    }
                />
            )}

            {(can("case_of_the_month.update") || can("case_of_the_month.delete")) && (
                <EditCaseTagModal
                    tag={editingTag}
                    updating={updateTagMutation.isPending}
                    deleting={deleteTagMutation.isPending}
                    canUpdate={can("case_of_the_month.update")}
                    canDelete={can("case_of_the_month.delete")}
                    onCancel={handleEditModalClose}
                    onSubmit={(values, form) => {
                        if (!editingTag) return

                        updateTagMutation.mutate({ id: editingTag.id, values, form })
                    }}
                    onDelete={() => {
                        if (editingTag) deleteTagMutation.mutate(editingTag.id)
                    }}
                />
            )}
        </div>
    )
}

export default CaseOfTheMonthTab
