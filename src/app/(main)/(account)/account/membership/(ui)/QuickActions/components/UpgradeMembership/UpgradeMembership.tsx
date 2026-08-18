"use client"

import { Modal } from "antd"
import { useMutation } from "@tanstack/react-query"
import { useMemo, useState } from "react"

import api from "@/axios.ts"
import UpgradeMembershipContent from "@app/(main)/(account)/account/membership/(ui)/QuickActions/components/UpgradeMembership/(ui)/UpgradeMembershipContent/UpgradeMembershipContent.tsx"
import type { IMembershipType } from "@entities/Membership.ts"
import { useCurrentUserMembershipQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipQuery.ts"
import { useMembershipTypesQuery } from "@shared/backend/queries/membership/useMembershipTypesQuery.ts"
import { CURRENT_USER_MEMBERSHIP_UPGRADE_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"
import type { PaymentCheckoutResponse } from "@shared/interfaces.ts"
import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"

import styles from "./UpgradeMembership.module.scss"

const UpgradeMembership = () => {
    const [open, setOpen] = useState(false)
    const [selectedTypeId, setSelectedTypeId] = useState<number>()

    const membershipQuery = useCurrentUserMembershipQuery()
    const membershipTypesQuery = useMembershipTypesQuery(
        { is_purchasable: true },
        open && !!membershipQuery.data,
    )

    const currentType = membershipQuery.data?.membership_type
    const availableTypes = useMemo(() => {
        if (!currentType) return []

        return (membershipTypesQuery.data ?? []).filter(
            (type) => type.id !== currentType.id && type.price_usd > currentType.price_usd,
        )
    }, [currentType, membershipTypesQuery.data])

    const selectedType = availableTypes.find((type) => type.id === selectedTypeId)
    const priceDifference =
        currentType && selectedType ? selectedType.price_usd - currentType.price_usd : 0

    const upgradeMutation = useMutation({
        mutationFn: async (targetMembershipType: IMembershipType) => {
            const response = await api.post<PaymentCheckoutResponse>(
                CURRENT_USER_MEMBERSHIP_UPGRADE_URL,
                { target_membership_type_id: targetMembershipType.id },
            )

            return response.data
        },
        onSuccess: ({ checkout_session_url }) => {
            window.location.assign(checkout_session_url)
        },
        onError: (error) => {
            handleApiError({
                error,
                statusMessages: {
                    422: "This membership type is not available as an upgrade.",
                    502: "The payment page could not be created. Please try again.",
                },
            })
        },
    })

    const handleClose = () => {
        if (upgradeMutation.isPending) return

        setOpen(false)
        setSelectedTypeId(undefined)
        upgradeMutation.reset()
    }

    const handleUpgrade = () => {
        if (selectedType) {
            upgradeMutation.mutate(selectedType)
        }
    }

    return (
        <>
            <CustomButton
                variant="green"
                loading={membershipQuery.isLoading}
                onClick={() => setOpen(true)}
            >
                Upgrade membership
            </CustomButton>

            <Modal
                title="Upgrade membership"
                open={open}
                footer={null}
                centered
                getContainer={false}
                closable={!upgradeMutation.isPending}
                maskClosable={!upgradeMutation.isPending}
                onCancel={handleClose}
            >
                <div className={styles.content}>
                    <UpgradeMembershipContent
                        currentType={currentType}
                        availableTypes={availableTypes}
                        selectedType={selectedType}
                        selectedTypeId={selectedTypeId}
                        priceDifference={priceDifference}
                        isMembershipLoading={membershipQuery.isLoading}
                        isMembershipError={membershipQuery.isError}
                        isMembershipFetching={membershipQuery.isFetching}
                        isMembershipTypesLoading={membershipTypesQuery.isLoading}
                        isMembershipTypesError={membershipTypesQuery.isError}
                        isMembershipTypesFetching={membershipTypesQuery.isFetching}
                        onSelectType={setSelectedTypeId}
                        onRetryMembership={() => void membershipQuery.refetch()}
                        onRetryMembershipTypes={() => void membershipTypesQuery.refetch()}
                    />
                </div>

                <div className={styles.actions}>
                    <CustomButton disabled={upgradeMutation.isPending} onClick={handleClose}>
                        Cancel
                    </CustomButton>
                    <CustomButton
                        variant="green"
                        loading={upgradeMutation.isPending}
                        disabled={!selectedType || membershipTypesQuery.isError}
                        onClick={handleUpgrade}
                    >
                        Continue to payment
                    </CustomButton>
                </div>
            </Modal>
        </>
    )
}

export default UpgradeMembership
