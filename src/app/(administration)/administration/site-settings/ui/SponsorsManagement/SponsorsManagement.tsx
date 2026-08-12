import { Card, Space, message } from "antd"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { handleRequestError } from "@shared/helpers/handleStatusError.ts"

import {
    createSponsor,
    deleteSponsor,
    fetchSponsors,
    SPONSORS_QUERY_KEY,
    uploadSponsorLogo,
} from "./api"
import SponsorCreateForm from "./SponsorCreateForm"
import SponsorsTable from "./SponsorsTable"
import type { SponsorFormValues } from "./types"
import { useCurrentUserPermissionsQuery } from "@shared/backend/queries/usePermissionsQuery.ts"
import { useMemo } from "react"

const SponsorsManagement = () => {
    const queryClient = useQueryClient()

    const { data: permissions = [], isLoading: isPermissionsLoading } =
        useCurrentUserPermissionsQuery()

    const sponsorsQuery = useQuery({
        queryKey: SPONSORS_QUERY_KEY,
        queryFn: fetchSponsors,
    })

    const permissionsActions = useMemo(() => {
        return permissions.map((p) => p.action)
    }, [permissions])

    const canCreate = permissionsActions.includes("legal_documents.create")
    const canDelete = permissionsActions.includes("legal_documents.delete")

    const createMutation = useMutation({
        mutationFn: async ({
            values,
            logoFile,
        }: {
            values: SponsorFormValues
            logoFile: File | null
        }) => {
            let logoUrl = values.logo_url?.trim()

            if (logoFile) {
                logoUrl = await uploadSponsorLogo(logoFile)

                if (!logoUrl) {
                    throw new Error("Logo upload response does not contain a link.")
                }
            }

            return createSponsor({
                name: values.name.trim(),
                link: values.link.trim(),
                short_name: values.short_name?.trim() || undefined,
                logo_url: logoUrl || undefined,
            })
        },
        onSuccess: () => {
            message.success("Sponsor created")
            queryClient.invalidateQueries({ queryKey: SPONSORS_QUERY_KEY })
            queryClient.invalidateQueries({ queryKey: ["sponsors"] })
        },
        onError: (error) => {
            if (error instanceof Error && error.message.includes("Logo upload")) {
                message.error(error.message)
                return
            }

            handleRequestError(error)
        },
    })

    const deleteMutation = useMutation({
        mutationFn: deleteSponsor,
        onSuccess: () => {
            message.success("Sponsor deleted")
            queryClient.invalidateQueries({ queryKey: SPONSORS_QUERY_KEY })
            queryClient.invalidateQueries({ queryKey: ["sponsors"] })
        },
        onError: (error) => handleRequestError(error),
    })

    const handleCreateSponsor = async (values: SponsorFormValues, logoFile: File | null) => {
        try {
            await createMutation.mutateAsync({ values, logoFile })
            return true
        } catch {
            return false
        }
    }

    return (
        <Card title="Sponsors">
            <Space orientation="vertical" size="large" style={{ width: "100%" }}>
                {canCreate && (
                    <SponsorCreateForm
                        isSubmitting={createMutation.isPending}
                        onSubmit={handleCreateSponsor}
                    />
                )}

                <SponsorsTable
                    sponsors={sponsorsQuery.data ?? []}
                    isLoading={sponsorsQuery.isLoading || isPermissionsLoading}
                    canDelete={canDelete}
                    deletingSponsorId={
                        deleteMutation.isPending ? deleteMutation.variables : undefined
                    }
                    onDelete={deleteMutation.mutate}
                />
            </Space>
        </Card>
    )
}

export default SponsorsManagement
