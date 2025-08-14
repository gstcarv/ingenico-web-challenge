import { useConversionStore } from "../../stores/conversion-store";

export const ConversionResult = () => {
    const { conversionResult } = useConversionStore();

    if (!conversionResult) {
        return null;
    }

    // Format currency values using Intl
    const formatCurrency = (amount: number, currencyCode: string) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currencyCode,
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
        }).format(amount);
    };

    // Format exchange rate with more precision
    const formatExchangeRate = (rate: number, fromCurrency: string, toCurrency: string) => {
        const formattedRate = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 4,
            maximumFractionDigits: 6,
        }).format(rate);

        return `1 ${fromCurrency} = ${formattedRate} ${toCurrency}`;
    };

    return (
        <div className="mt-6 p-4 bg-success-50 border border-success-200 rounded-lg">
            <h3 className="text-lg font-semibold text-brand-700 mb-2">Conversion Result</h3>
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-neutral-700 font-medium">Original Amount</span>
                    <span className="text-brand-800 font-bold">
                        {formatCurrency(conversionResult.originalAmount, conversionResult.fromCurrency)}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-neutral-700 font-medium">Converted Amount</span>
                    <span className="text-brand-800 font-bold">
                        {formatCurrency(conversionResult.convertedAmount, conversionResult.toCurrency)}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-neutral-700 font-medium">Exchange Rate</span>
                    <span className="text-brand-800 font-bold">
                        {formatExchangeRate(
                            conversionResult.exchangeRate,
                            conversionResult.fromCurrency,
                            conversionResult.toCurrency,
                        )}
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
