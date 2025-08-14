import { UseQueryOptions } from "@tanstack/react-query";
import { getApiUrl, fetchCurrency } from "../lib/api";
import { GetCurrenciesResponse } from "../types/currency";
import mocks from "../mocks/currencies.json";

const STALE_TIME = 1000 * 60 * 60 * 24; // 24 hours

export const getAvailableCurrenciesQuery = (): UseQueryOptions<GetCurrenciesResponse> => ({
    queryKey: ["available-currencies"],
    staleTime: STALE_TIME,
    queryFn: async (): Promise<GetCurrenciesResponse> => {
        // eslint-disable-next-line no-constant-condition
        if (1 === 1) {
            return mocks as GetCurrenciesResponse;
        }

        return fetchCurrency<GetCurrenciesResponse>(getApiUrl("/v3/currencies"));
    },
});
