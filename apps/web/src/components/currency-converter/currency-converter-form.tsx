import { Button, CurrencyInput, DatePicker, Field } from "@ingenico-challenge/ui";
import { ArrowLeftRight, ArrowUpDown, Calendar } from "lucide-react";
import { Controller } from "react-hook-form";
import { CurrencySelect } from "./currency-select";
import { useCurrencyForm } from "../../hooks/use-currency-form";

export const CurrencyConverterForm = () => {
    const { form, onSubmit, handleSwapCurrencies, isSubmitting, errors } = useCurrencyForm();

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
                >
                    <ArrowLeftRight className="hidden lg:block" />
                    <ArrowUpDown className="lg:hidden" />
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
                <Controller
                    name="amount"
                    control={form.control}
                    render={({ field }) => (
                        <CurrencyInput
                            id="amount"
                            value={field.value}
                            onChange={field.onChange}
                            className="w-full shadow-none border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                    )}
                />
                {errors.amount && <Field.Validation>{errors.amount.message}</Field.Validation>}
            </Field>

            <div className="pt-2">
                <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Converting..." : "Convert"}
                </Button>
            </div>
        </form>
    );
};
