"use client"

import { useCurrentUserPaymentQuery } from "@/shared/backend/queries/useCurrentUserPaymentQuery.ts"
import { PaymentStatusEnum, type IPayment } from "@/entities/Payments.ts"
import { Empty, Spin, Table } from "antd"
import clsx from "clsx"
import styles from "@/app/(main)/(account)/account/payments/ui/PaymentsTable.module.scss"

const formatPaymentValue = (value: string) => value.split("_").join(" ").toLowerCase()

const formatPaymentAmount = (amount: string, currency: string) => {
    const parsedAmount = Number(amount)

    if (Number.isNaN(parsedAmount)) {
        return `${amount} ${currency}`
    }

    return `${(parsedAmount / 100).toFixed(2)} ${currency}`
}

const formatPaymentDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(new Date(date))

const getStatusClassName = (status: PaymentStatusEnum) =>
    clsx(styles.paymentStatus, {
        [styles.paymentStatusSuccess]: status === PaymentStatusEnum.SUCCEEDED,
        [styles.paymentStatusPending]: status === PaymentStatusEnum.PENDING,
        [styles.paymentStatusDanger]:
            status === PaymentStatusEnum.FAILED ||
            status === PaymentStatusEnum.CANCELED ||
            status === PaymentStatusEnum.EXPIRED,
        [styles.paymentStatusRefunded]: status === PaymentStatusEnum.REFUNDED,
    })

const PaymentsTable = () => {
    const { data: payments, isLoading } = useCurrentUserPaymentQuery()
    const paymentItems = payments?.data ?? []

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (_amount: string, payment: IPayment) =>
                formatPaymentAmount(payment.amount, payment.currency),
        },
        {
            title: "Currency",
            dataIndex: "currency",
            key: "currency",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: PaymentStatusEnum) => (
                <span className={getStatusClassName(status)}>{formatPaymentValue(status)}</span>
            ),
        },
        {
            title: "Purpose",
            dataIndex: "purpose",
            key: "purpose",
        },
        {
            title: "Created",
            dataIndex: "created_at",
            key: "created_at",
        },
    ]

    return (
        <div className={styles.payments}>
            <div className={styles.tableContainer}>
                <Table
                    columns={columns}
                    dataSource={paymentItems}
                    rowKey="id"
                    loading={isLoading}
                    className={styles.paymentsTable}
                    scroll={{ x: "max-content" }}
                />
            </div>

            <div className={styles.mobileList}>
                {isLoading && (
                    <div className={styles.mobileLoading}>
                        <Spin />
                    </div>
                )}

                {!isLoading && paymentItems.length === 0 && <Empty description="No payments yet" />}

                {!isLoading &&
                    paymentItems.map((payment: IPayment) => (
                        <article className={styles.paymentCard} key={payment.id}>
                            <div className={styles.paymentCardHeader}>
                                <div>
                                    <div className={styles.paymentPurpose}>
                                        {formatPaymentValue(payment.purpose)}
                                    </div>
                                    <div className={styles.paymentDate}>
                                        {formatPaymentDate(payment.created_at)}
                                    </div>
                                </div>
                                <span className={getStatusClassName(payment.status)}>
                                    {formatPaymentValue(payment.status)}
                                </span>
                            </div>

                            <dl className={styles.paymentMeta}>
                                <div>
                                    <dt>Amount</dt>
                                    <dd>{formatPaymentAmount(payment.amount, payment.currency)}</dd>
                                </div>
                                <div>
                                    <dt>ID</dt>
                                    <dd>{payment.id}</dd>
                                </div>
                            </dl>
                        </article>
                    ))}
            </div>
        </div>
    )
}

export default PaymentsTable
