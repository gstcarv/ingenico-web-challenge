import { CurrencyConverterForm } from "./currency-converter-form";
import { ConversionResult } from "./conversion-result";

export const CurrencyConverter = () => {
    return (
        <div className="bg-white w-full lg:w-[850px] rounded-lg p-8 shadow-md transition-[height]">
            <CurrencyConverterForm />
            <ConversionResult />
        </div>
    );
};
