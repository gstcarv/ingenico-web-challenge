import { useConversionStore } from "../../stores/conversion-store";

export const ConversionResult = () => {
    const { conversionResult } = useConversionStore();

    if (!conversionResult) {
        return null;
    }

    return (
        <div className="mt-6 p-4 bg-success-50 border border-success-200 rounded-lg">
            <h3 className="text-lg font-semibold text-brand-700 mb-2">Conversion Result</h3>
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-neutral-700 font-medium">Original Amount</span>
                    <span className="text-brand-800 font-bold">
                        {conversionResult.originalAmount} {conversionResult.fromCurrency}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-neutral-700 font-medium">Converted Amount</span>
                    <span className="text-brand-800 font-bold">
                        {conversionResult.convertedAmount} {conversionResult.toCurrency}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-neutral-700 font-medium">Exchange Rate</span>
                    <span className="text-brand-800 font-bold">
                        1 {conversionResult.fromCurrency} = {conversionResult.exchangeRate.toFixed(4)}{" "}
                        {conversionResult.toCurrency}
                    </span>
                </div>
                <div className="text-sm text-neutral-600 mt-2">
                    Date: {conversionResult.date} | Last updated:{" "}
                    {new Date(conversionResult.lastUpdatedAt).toLocaleString()}
                </div>
            </div>
        </div>
    );
};
