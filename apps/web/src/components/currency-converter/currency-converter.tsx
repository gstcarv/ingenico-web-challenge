import { useState } from "react";
import { CurrencyConverterForm } from "./currency-converter-form";
import type { HistoricalConversionResponse } from "../../types/currency";

export const CurrencyConverter = () => {
    const [conversionResult, setConversionResult] = useState<HistoricalConversionResponse | null>(null);

    const handleConversionResult = (result: HistoricalConversionResponse) => {
        setConversionResult(result);
    };

    return (
        <div className="bg-white w-full md:w-[850px] rounded-lg p-8 shadow-md">
            <CurrencyConverterForm onConversionResult={handleConversionResult} />

            {conversionResult && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Conversion Result</h3>
                    <div className="space-y-2">
                        {Object.entries(conversionResult.data).map(([currencyCode, rate]) => (
                            <div key={currencyCode} className="flex justify-between items-center">
                                <span className="text-green-700 font-medium">{currencyCode}</span>
                                <span className="text-green-800 font-bold">{rate.value.toFixed(4)}</span>
                            </div>
                        ))}
                        <div className="text-sm text-green-600 mt-2">
                            Last updated: {new Date(conversionResult.meta.last_updated_at).toLocaleString()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
