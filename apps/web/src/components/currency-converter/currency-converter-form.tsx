import { Button, DatePicker, Field } from "@ingenico-challenge/ui";
import { ArrowLeftRight, ArrowUpDown, Calendar } from "lucide-react";
import { CurrencySelect } from "./currency-select";
import { CurrencyAmountInput } from "./currency-amount-input";
import { ConvertButton } from "./convert-button";
import { useCurrencyForm } from "../../hooks/use-currency-form";
import { Controller } from "react-hook-form";

export const CurrencyConverterForm = () => {
    const { form, onSubmit, handleSwapCurrencies, handleRetry, isSubmitting, errors, conversionError } =
        useCurrencyForm();

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-6">
                <CurrencySelect
                    label="From"
                    name="fromCurrency"
                    control={form.control}
                    error={errors.fromCurrency?.message}
                />

                <Button
                    variant="outline"
                    size="sm"
                    className="w-10 h-10 rounded-full mt-5"
                    type="button"
                    onClick={handleSwapCurrencies}
                    aria-label="Swap currencies"
                >
                    <ArrowLeftRight className="hidden lg:block" aria-hidden="true" />
                    <ArrowUpDown className="lg:hidden" aria-hidden="true" />
                </Button>

                <CurrencySelect
                    label="To"
                    name="toCurrency"
                    control={form.control}
                    error={errors.toCurrency?.message}
                />
            </div>

            <Field>
                <Field.Label htmlFor="amount">Value</Field.Label>
                <CurrencyAmountInput
                    control={form.control}
                    suffix={
                        <Controller
                            name="date"
                            control={form.control}
                            render={({ field: dateField }) => (
                                <DatePicker
                                    value={dateField.value}
                                    onChange={dateField.onChange}
                                    renderInput={({ onClick, value }) => (
                                        <Button variant="outline" size="sm" type="button" onClick={onClick}>
                                            <Calendar className="size-4 mr-2" /> {value || "Select a date"}
                                        </Button>
                                    )}
                                />
                            )}
                        />
                    }
                />

                {errors.amount && <Field.Validation>{errors.amount.message}</Field.Validation>}
            </Field>

            <div className="pt-2">
                <ConvertButton
                    isSubmitting={isSubmitting}
                    hasError={!!conversionError}
                    onRetry={handleRetry}
                    onSubmit={onSubmit}
                />
            </div>
        </form>
    );
};
