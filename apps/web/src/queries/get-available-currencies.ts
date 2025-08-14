import { UseQueryOptions } from "@tanstack/react-query";
import { fetchCurrency } from "../lib/api";
import { GetCurrenciesResponse } from "../types/currency";

const STALE_TIME = 1000 * 60 * 60 * 24; // 24 hours

export const getAvailableCurrenciesQuery = (): UseQueryOptions<GetCurrenciesResponse> => ({
    queryKey: ["available-currencies"],
    staleTime: STALE_TIME,
    queryFn: async (): Promise<GetCurrenciesResponse> => {
        return fetchCurrency<GetCurrenciesResponse>("/v3/currencies");
    },
});
