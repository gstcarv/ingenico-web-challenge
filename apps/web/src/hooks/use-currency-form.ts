import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { currencyFormSchema, type CurrencyFormData } from "../lib/helpers/currency-schema";
import { handleCurrencyConversionMutation } from "../queries/handle-currency-conversion";

export const useCurrencyForm = () => {
    const form = useForm<CurrencyFormData>({
        resolver: zodResolver(currencyFormSchema),
        defaultValues: {
            fromCurrency: "",
            toCurrency: "",
            amount: 0,
            date: undefined,
        },
    });

    const conversionMutation = useMutation({
        ...handleCurrencyConversionMutation(),
    });

    const onSubmit = async (data: CurrencyFormData) => {
        return conversionMutation.mutateAsync(data);
    };

    const handleSwapCurrencies = () => {
        const fromCurrency = form.getValues("fromCurrency");
        const toCurrency = form.getValues("toCurrency");

        form.setValue("fromCurrency", toCurrency);
        form.setValue("toCurrency", fromCurrency);
    };

    return {
        form,
        onSubmit: form.handleSubmit(onSubmit),
        handleSwapCurrencies,
        isSubmitting: form.formState.isSubmitting || conversionMutation.isPending,
        errors: form.formState.errors,
        conversionResult: conversionMutation.data,
        conversionError: conversionMutation.error,
    };
};
