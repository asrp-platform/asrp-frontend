import { useQuery } from "@tanstack/react-query"
import api from "@/axios.ts"
import type { ICountry } from "@app/(auth)/registration/(ui)/types.ts"
import { COUNTRIES_URL } from "@shared/backend/restApiUrls/restApiUrls.ts"

export const COUNTRIES_QUERY_KEY = ["countries"]

export const useCountriesQuery = () => {
    return useQuery({
        queryKey: COUNTRIES_QUERY_KEY,
        queryFn: async () => {
            const response = await api.get<ICountry[]>(COUNTRIES_URL)
            return response.data
        },
        staleTime: 1000 * 60 * 10,
    })
}
