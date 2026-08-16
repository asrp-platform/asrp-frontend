import { Alert, Select, Skeleton } from "antd"
import { Sparkles } from "lucide-react"

import MembershipComparison from "@app/(main)/(account)/account/membership/(ui)/QuickActions/components/UpgradeMembership/(ui)/MembershipComparison/MembershipComparison.tsx"
import UpgradeSummary from "@app/(main)/(account)/account/membership/(ui)/QuickActions/components/UpgradeMembership/(ui)/UpgradeSummary/UpgradeSummary.tsx"
import type { IMembershipType } from "@entities/Membership.ts"
import CustomButton from "@shared/ui/Buttons/CustomButton.tsx"

import { formatMembershipPrice } from "../../formatMembershipPrice.ts"
import styles from "./UpgradeMembershipContent.module.scss"

interface UpgradeMembershipContentProps {
    currentType?: IMembershipType
    availableTypes: IMembershipType[]
    selectedType?: IMembershipType
    selectedTypeId?: number
    priceDifference: number
    isMembershipLoading: boolean
    isMembershipError: boolean
    isMembershipFetching: boolean
    isMembershipTypesLoading: boolean
    isMembershipTypesError: boolean
    isMembershipTypesFetching: boolean
    onSelectType: (typeId: number) => void
    onRetryMembership: () => void
    onRetryMembershipTypes: () => void
}

const UpgradeMembershipContent = ({
    currentType,
    availableTypes,
    selectedType,
    selectedTypeId,
    priceDifference,
    isMembershipLoading,
    isMembershipError,
    isMembershipFetching,
    isMembershipTypesLoading,
    isMembershipTypesError,
    isMembershipTypesFetching,
    onSelectType,
    onRetryMembership,
    onRetryMembershipTypes,
}: UpgradeMembershipContentProps) => {
    if (isMembershipLoading || isMembershipTypesLoading) {
        return (
            <div className={styles.loader} role="status" aria-label="Loading upgrade options">
                <Skeleton active title={{ width: "45%" }} paragraph={{ rows: 4 }} />
                <Skeleton.Input active block />
            </div>
        )
    }

    if (isMembershipError || !currentType) {
        return (
            <Alert
                showIcon
                type="error"
                title="Unable to load your membership"
                description="We could not retrieve your current membership details. Please try again."
                action={
                    <CustomButton loading={isMembershipFetching} onClick={onRetryMembership}>
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
                        onClick={onRetryMembershipTypes}
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

            <MembershipComparison currentType={currentType} selectedType={selectedType} />

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
                    label: `${type.name} - ${formatMembershipPrice(type.price_usd)}`,
                }))}
                onChange={onSelectType}
            />

            {selectedType && (
                <UpgradeSummary selectedType={selectedType} priceDifference={priceDifference} />
            )}

            <p className={styles.checkoutNote}>
                You will be redirected to Stripe to complete the secure payment.
            </p>
        </>
    )
}

export default UpgradeMembershipContent
