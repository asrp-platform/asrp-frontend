"use client"

import { Alert, Modal, Select, Skeleton } from "antd"
import { ArrowRight, CreditCard, Sparkles } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { useMemo, useState } from "react"

import api from "@/axios.ts"
import type { IMembershipType } from "@entities/Membership.ts"
import { useCurrentUserMembershipQuery } from "@shared/backend/queries/membership/useCurrentUserMembershipQuery.ts"
import { useMembershipTypesQuery } from "@shared/backend/queries/membership/useMembershipTypesQuery.ts"
import { CURRENT_USER_MEMBERSHIP_UPGRADE_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"
import { handleApiError } from "@shared/helpers/formsHelpers.ts"
import type { PaymentCheckoutResponse } from "@shared/interfaces.ts"
import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"

import styles from "./UpgradeMembership.module.scss"

const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    }).format(price)

const UpgradeMembership = () => {
    const [open, setOpen] = useState(false)
    const [selectedTypeId, setSelectedTypeId] = useState<number>()

    const {
        data: membership,
        isLoading: isMembershipLoading,
        isError: isMembershipError,
        isFetching: isMembershipFetching,
        refetch: refetchMembership,
    } = useCurrentUserMembershipQuery()
    const {
        data: membershipTypes,
        isLoading: isMembershipTypesLoading,
        isError: isMembershipTypesError,
        isFetching: isMembershipTypesFetching,
        refetch: refetchMembershipTypes,
    } = useMembershipTypesQuery({ is_purchasable: true }, open && !!membership)

    const currentType = membership?.membership_type
    const availableTypes = useMemo(() => {
        if (!currentType) return []

        return (membershipTypes ?? []).filter(
            (type) => type.id !== currentType.id && type.price_usd > currentType.price_usd,
        )
    }, [currentType, membershipTypes])

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

    const renderContent = () => {
        if (isMembershipLoading || isMembershipTypesLoading) {
            return (
                <div className={styles.loader} role="status" aria-label="Loading upgrade options">
                    <Skeleton active title={{ width: "45%" }} paragraph={{ rows: 4 }} />
                    <Skeleton.Input active block />
                </div>
            )
        }

        if (isMembershipError || !membership) {
            return (
                <Alert
                    showIcon
                    type="error"
                    title="Unable to load your membership"
                    description="We could not retrieve your current membership details. Please try again."
                    action={
                        <CustomButton
                            loading={isMembershipFetching}
                            onClick={() => void refetchMembership()}
                        >
                            Try again
                        </CustomButton>
                    }
                />
            )
        }

        if (isMembershipTypesError) {
            return (
                <Alert
                    showIcon
                    type="error"
                    title="Unable to load upgrade options"
                    description="We could not retrieve the available membership types. Please try again."
                    action={
                        <CustomButton
                            loading={isMembershipTypesFetching}
                            onClick={() => void refetchMembershipTypes()}
                        >
                            Try again
                        </CustomButton>
                    }
                />
            )
        }

        if (!availableTypes.length) {
            return (
                <Alert
                    showIcon
                    type="info"
                    title="You already have the highest available membership"
                    description="There are no purchasable membership types above your current plan."
                />
            )
        }

        return (
            <>
                <div className={styles.intro}>
                    <span className={styles.icon}>
                        <Sparkles size={22} aria-hidden />
                    </span>
                    <div>
                        <h4>Unlock a higher membership level</h4>
                        <p>
                            Choose a new membership type and pay only the difference in price. Your
                            upgrade becomes active after payment is completed.
                        </p>
                    </div>
                </div>

                <div className={styles.comparison}>
                    <div className={styles.membershipCard}>
                        <span>Current membership</span>
                        <strong>{membership.membership_type.name}</strong>
                        <p>{formatPrice(membership.membership_type.price_usd)}</p>
                    </div>
                    <ArrowRight className={styles.arrow} size={22} aria-hidden />
                    <div className={`${styles.membershipCard} ${styles.targetCard}`}>
                        <span>New membership</span>
                        <strong>{selectedType?.name ?? "Select a type"}</strong>
                        <p>{selectedType ? formatPrice(selectedType.price_usd) : "—"}</p>
                    </div>
                </div>

                <label className={styles.selectLabel} htmlFor="membership-upgrade-type">
                    Membership type
                </label>
                <Select
                    id="membership-upgrade-type"
                    className={styles.select}
                    size="large"
                    value={selectedTypeId}
                    placeholder="Select a higher membership type"
                    options={availableTypes.map((type) => ({
                        value: type.id,
                        label: `${type.name} · ${formatPrice(type.price_usd)}`,
                    }))}
                    onChange={setSelectedTypeId}
                />

                {selectedType && (
                    <div className={styles.summary}>
                        <div>
                            <CreditCard size={20} aria-hidden />
                            <span>Amount due now</span>
                        </div>
                        <strong>{formatPrice(priceDifference)}</strong>
                        {selectedType.description && <p>{selectedType.description}</p>}
                    </div>
                )}

                <p className={styles.checkoutNote}>
                    You will be redirected to Stripe to complete the secure payment.
                </p>
            </>
        )
    }

    const canSubmit = !!selectedType && !isMembershipTypesError

    return (
        <>
            <CustomButton
                variant="green"
                loading={isMembershipLoading}
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
                <div className={styles.content}>{renderContent()}</div>

                <div className={styles.actions}>
                    <CustomButton disabled={upgradeMutation.isPending} onClick={handleClose}>
                        Cancel
                    </CustomButton>
                    <CustomButton
                        variant="green"
                        loading={upgradeMutation.isPending}
                        disabled={!canSubmit}
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
