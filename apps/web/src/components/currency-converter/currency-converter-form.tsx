import { Button, CurrencyInput, DatePicker, Field } from "@ingenico-challenge/ui";
import { ArrowLeftRight, ArrowUpDown, Calendar } from "lucide-react";
import { CurrencySelect } from "./currency-select";

export const CurrencyConverterForm = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-6">
                <CurrencySelect label="From" id="from-currency" />

                <Button variant="outline" size="sm" className="w-10 h-10 rounded-full mt-5" type="button">
                    <ArrowLeftRight className="hidden lg:block" />
                    <ArrowUpDown className="lg:hidden" />
                </Button>

                <CurrencySelect label="To" id="to-currency" />
            </div>

            <Field>
                <Field.Label htmlFor="currency-value">Value</Field.Label>
                <CurrencyInput
                    id="currency-value"
                    className="w-full shadow-none border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    suffix={
                        <DatePicker
                            renderInput={({ onClick }) => (
                                <Button variant="outline" size="sm" type="button" onClick={onClick}>
                                    <Calendar className="size-4 mr-2" /> Select a date
                                </Button>
                            )}
                        />
                    }
                />
            </Field>

            <div className="pt-2">
                <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    type="submit"
                >
                    Convert
                </Button>
            </div>
        </div>
    );
};
