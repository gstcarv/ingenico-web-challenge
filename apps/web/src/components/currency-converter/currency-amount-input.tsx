import { CurrencyInput } from "@ingenico-challenge/ui";
import { useQuery } from "@tanstack/react-query";
import { Controller, Control, useWatch } from "react-hook-form";
import { getAvailableCurrenciesQuery } from "../../queries/get-available-currencies";
import { CurrencyFormData } from "../../lib/helpers/currency-schema";
import { ReactNode } from "react";

interface CurrencyAmountInputProps {
    control: Control<CurrencyFormData>;
    suffix?: ReactNode;
}

export const CurrencyAmountInput = ({ control, suffix }: CurrencyAmountInputProps) => {
    const { data: availableCurrencies } = useQuery(getAvailableCurrenciesQuery());

    // Watch the fromCurrency to get the selected currency
    const fromCurrency = useWatch({
        control,
        name: "fromCurrency",
    });

    // Function to determine text size based on symbol length
    const getTextSizeClass = (symbol: string) => {
        if (!symbol) return "text-lg";

        const length = symbol.length;
        if (length <= 1) return "text-lg font-semibold";
        if (length <= 2) return "text-base font-semibold";
        if (length <= 3) return "text-sm font-medium";
        return "text-xs font-medium";
    };

    return (
        <Controller
            name="amount"
            control={control}
            render={({ field }) => {
                const selectedCurrency = availableCurrencies?.data?.[fromCurrency];
                const symbol = selectedCurrency?.symbol_native || selectedCurrency?.symbol || "";
                const textSizeClass = getTextSizeClass(symbol);

                return (
                    <CurrencyInput
                        id="amount"
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full shadow-none border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        prefix={symbol && <span className={`${textSizeClass} text-gray-700`}>{symbol}</span>}
                        suffix={suffix}
                    />
                );
            }}
        />
    );
};
