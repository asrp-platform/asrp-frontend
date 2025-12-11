// types/payment.ts

import type { IUser } from "./User.ts"

export enum PaymentType {
    ONE_TIME = "ONE_TIME",
    SUBSCRIPTION_INITIAL = "SUBSCRIPTION_INITIAL",
    SUBSCRIPTION_RENEWAL = "SUBSCRIPTION_RENEWAL",
    REFUND = "REFUND",
}

export enum PaymentStatus {
    SUCCEEDED = "SUCCEEDED",
    PROCESSING = "PROCESSING",
    FAILED = "FAILED",
    CANCELED = "CANCELED",
    REQUIRES_PAYMENT_METHOD = "REQUIRES_PAYMENT_METHOD",
}

export enum SubscriptionStatus {
    ACTIVE = "active",
    TRIALING = "trialing",
    PAST_DUE = "past_due",
    CANCELED = "canceled",
    INCOMPLETE = "incomplete",
    INCOMPLETE_EXPIRED = "incomplete_expired",
    UNPAID = "unpaid",
}

export interface IPayment {
    id: number
    created_at: string
    updated_at?: string | null

    type: PaymentType
    status: PaymentStatus

    amount_total: number
    currency: string

    payment_intent_id?: string | null
    charge_id?: string | null
    invoice_id: string
    subscription_id?: string | null
    checkout_session_id?: string | null
    stripe_customer_id?: string | null

    price_id: string
    product_id: string

    billing_reason: string
    receipt_url?: string | null

    livemode: boolean
    description?: string | null

    failure_code?: string | null
    failure_message?: string | null
    payment_method_type?: string | null
    pm_last4?: string | null

    stripe_created_at: string
    _metadata?: Record<string, any> | null

    user_id?: number | null
    user: IUser | null
}
