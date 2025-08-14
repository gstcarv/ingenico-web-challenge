import { UseMutationOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { fetchCurrency } from "../lib/api";
import { HistoricalConversionParams, currencyFormSchema } from "../lib/helpers/currency-schema";
import { HistoricalConversionResponse } from "../types/currency";
import dayjs from "dayjs";

export const handleCurrencyConversion = createServerFn({ method: "POST" })
    .validator((params: unknown) => {
        return currencyFormSchema.parse(params);
    })
    .handler(async (ctx) => {
        let { date } = ctx.data;
        const { fromCurrency, toCurrency } = ctx.data;

        if (!date) {
            date = dayjs().subtract(1, "day").toDate();
        }

        const params = {
            date: date?.toISOString().split("T")[0] || "",
            base_currency: fromCurrency,
            currencies: toCurrency,
        };

        const response = await fetchCurrency<HistoricalConversionResponse>("/v3/historical", params);

        return response;
    });

// Query options para conversão histórica
export const handleCurrencyConversionMutation = (): UseMutationOptions<
    HistoricalConversionResponse,
    Error,
    HistoricalConversionParams
> => ({
    mutationKey: ["historical-conversion"],
    mutationFn: async (params: HistoricalConversionParams): Promise<HistoricalConversionResponse> => {
        return handleCurrencyConversion({ data: params });
    },
});
