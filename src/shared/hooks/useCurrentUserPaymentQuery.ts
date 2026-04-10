import { CURRENT_USER_PAYMENTS_URL } from "../backend/currentUserUrls.ts"
import type { IPaginatedBackendResponse } from "../types/interfaces.ts"
import type { IPayment } from "../../entities/Payments.ts"
import { useQuery } from "@tanstack/react-query"
import api from "../../axios.ts"

type CurrentUserPaymentsResponse = IPaginatedBackendResponse<IPayment>

export const CURRENT_USER_PAYMENTS_QUERY_KEY = ["current-user-payments"]

const fetchCurrentUserPayments = async (): Promise<CurrentUserPaymentsResponse> => {
    const { data } = await api.get<CurrentUserPaymentsResponse>(CURRENT_USER_PAYMENTS_URL)
    return data
}

export const useCurrentUserPaymentQuery = () => {
    return useQuery({
        queryKey: CURRENT_USER_PAYMENTS_QUERY_KEY,
        queryFn: fetchCurrentUserPayments,
        staleTime: 1000 * 60 * 5,
    })
}
