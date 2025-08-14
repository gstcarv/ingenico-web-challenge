import { UseMutationOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { fetchCurrency } from "../lib/api";
import { HistoricalConversionParams, currencyFormSchema } from "../lib/helpers/currency-schema";
import { HistoricalConversionResponse, ProcessedConversionResponse } from "../types/currency";
import dayjs from "dayjs";

export const handleCurrencyConversion = createServerFn({ method: "POST" })
    .validator((params: unknown) => {
        return currencyFormSchema.parse(params);
    })
    .handler(async (ctx) => {
        let { date } = ctx.data;
        const { fromCurrency, toCurrency, amount } = ctx.data;

        if (!date) {
            date = dayjs().subtract(1, "day").toDate();
        }

        const params = {
            date: date?.toISOString().split("T")[0] || "",
            base_currency: fromCurrency,
            currencies: toCurrency,
        };

        const response = await fetchCurrency<HistoricalConversionResponse>("/v3/historical", params);

        // Processar os dados da API para calcular a conversão
        const exchangeRate = response.data[toCurrency]?.value;

        if (!exchangeRate) {
            throw new Error(`Exchange rate not found for ${toCurrency}`);
        }

        const convertedAmount = amount * exchangeRate;

        const processedResponse: ProcessedConversionResponse = {
            originalAmount: amount,
            convertedAmount: Number(convertedAmount.toFixed(2)),
            fromCurrency,
            toCurrency,
            exchangeRate,
            date: params.date,
            lastUpdatedAt: response.meta.last_updated_at,
        };

        return processedResponse;
    });

// Query options para conversão histórica
export const handleCurrencyConversionMutation = (): UseMutationOptions<
    ProcessedConversionResponse,
    Error,
    HistoricalConversionParams
> => ({
    mutationKey: ["historical-conversion"],
    mutationFn: async (params: HistoricalConversionParams): Promise<ProcessedConversionResponse> => {
        return handleCurrencyConversion({ data: params });
    },
});
