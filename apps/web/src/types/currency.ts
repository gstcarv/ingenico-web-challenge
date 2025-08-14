export interface Currency {
    symbol: string;
    name: string;
    symbol_native: string;
    decimal_digits: number;
    rounding: number;
    code: string;
    name_plural: string;
    type: "fiat" | "crypto" | "metal";
    countries: string[];
    icon_name?: string;
}

export interface GetCurrenciesResponse {
    data: Record<string, Currency>;
}

// Interfaces para conversão histórica
export interface HistoricalConversionRate {
    code: string;
    value: number;
}

export interface HistoricalConversionResponse {
    data: Record<string, HistoricalConversionRate>;
    meta: {
        last_updated_at: string;
    };
}
