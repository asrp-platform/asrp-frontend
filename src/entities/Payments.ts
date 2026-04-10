/* eslint-disable */
// @ts-ignore
export enum PaymentProvider {
    STRIPE = "STRIPE",
}

/* eslint-disable */
// @ts-ignore
export enum PaymentStatusEnum {
    PENDING = "PENDING",
    SUCCEEDED = "SUCCEEDED",
    FAILED = "FAILED",
    CANCELED = "CANCELED",
    EXPIRED = "EXPIRED",
    REFUNDED = "REFUNDED",
}

/* eslint-disable */
// @ts-ignore
export enum PaymentPurposeEnum {
    MEMBERSHIP_APPLICATION = "MEMBERSHIP_APPLICATION",
    MEMBERSHIP_RENEWAL = "MEMBERSHIP_RENEWAL",
    DONATION = "DONATION",
}

export interface IPayment {
    id: string
    provider: PaymentProvider
    amount: string
    currency: string
    status: PaymentStatusEnum
    purpose: PaymentPurposeEnum
    provider_data: Record<string, unknown> | null
    user_id: number | null
    created_at: string
    updated_at: string
}
