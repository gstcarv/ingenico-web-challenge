import { Field, Select } from "@ingenico-challenge/ui";
import { useQuery } from "@tanstack/react-query";
import { getAvailableCurrenciesQuery } from "../../queries/get-available-currencies";
import { Controller, type Control } from "react-hook-form";
import type { CurrencyFormData } from "../../lib/helpers/currency-schema";

interface CurrencySelectProps {
    label: string;
    name: keyof CurrencyFormData;
    control: Control<CurrencyFormData>;
    className?: string;
    error?: string;
}

function getFlag(code: string) {
    return `https://raw.githubusercontent.com/Lissy93/currency-flags/refs/heads/master/assets/flags_svg/${code.toLowerCase()}.svg`;
}

export const CurrencySelect = ({ label, name, control, className, error }: CurrencySelectProps) => {
    const availableCurrencies = useQuery(getAvailableCurrenciesQuery());

    const currencies = availableCurrencies.data?.data || {};

    return (
        <Field className="flex-1 w-full">
            <Field.Label htmlFor={name}>{label}</Field.Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    return (
                        <Select
                            id={name}
                            value={field.value as string}
                            onChange={field.onChange}
                            className={`w-full shadow-none border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${className || ""}`}
                            prefix={
                                <div
                                    className="w-6 h-6 rounded-full bg-gray-100 bg-neutral-50"
                                    style={{
                                        backgroundImage: `url(${getFlag(field.value as string)})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                ></div>
                            }
                        >
                            <Select.Option disabled value="" selected>
                                Select a currency
                            </Select.Option>

                            {Object.entries(currencies).map(([code, currency]) => (
                                <Select.Option key={code} value={code}>
                                    {code} - {currency.name}
                                </Select.Option>
                            ))}
                        </Select>
                    );
                }}
            />
            {error && <Field.Validation>{error}</Field.Validation>}
        </Field>
    );
};
