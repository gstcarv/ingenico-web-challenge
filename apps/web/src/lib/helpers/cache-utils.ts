import type { HistoricalConversionParams } from "./currency-schema";

/**
 * Creates a consistent cache key for currency conversion requests
 */
export const createConversionCacheKey = (params: HistoricalConversionParams): string => {
    const { fromCurrency, toCurrency, amount, date } = params;
    const dateString = date ? date.toISOString().split("T")[0] : "latest";
    return `${fromCurrency}-${toCurrency}-${amount}-${dateString}`;
};

/**
 * Checks if two conversion parameters are equivalent
 */
export const areConversionParamsEqual = (
    params1: HistoricalConversionParams,
    params2: HistoricalConversionParams,
): boolean => {
    return createConversionCacheKey(params1) === createConversionCacheKey(params2);
};
