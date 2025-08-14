import { Field, Select } from "@ingenico-challenge/ui";
import { useQuery } from "@tanstack/react-query";
import { getAvailableCurrenciesQuery } from "../../queries/get-available-currencies";

interface CurrencySelectProps {
    label: string;
    id: string;
    className?: string;
}

export const CurrencySelect = ({ label, id, className }: CurrencySelectProps) => {
    const availableCurrencies = useQuery(getAvailableCurrenciesQuery());

    const currencies = availableCurrencies.data?.data || {};

    return (
        <Field className="flex-1 w-full">
            <Field.Label htmlFor={id}>{label}</Field.Label>
            <Select
                id={id}
                className={`w-full shadow-none border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${className || ""}`}
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
        </Field>
    );
};
