import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { currencyFormSchema, type CurrencyFormData } from "../lib/helpers/currency-schema";
import { handleCurrencyConversionMutation } from "../queries/handle-currency-conversion";
import { useConversionStore } from "../stores/conversion-store";

export const useCurrencyForm = () => {
    const { setConversionResult } = useConversionStore();

    const form = useForm<CurrencyFormData>({
        resolver: zodResolver(currencyFormSchema),
        defaultValues: {
            fromCurrency: "",
            toCurrency: "",
            amount: undefined,
            date: undefined,
        },
    });

    const conversionMutation = useMutation({
        ...handleCurrencyConversionMutation(),
        onSuccess: (data) => {
            setConversionResult(data);
        },
    });

    const onSubmit = useCallback(
        async (data: CurrencyFormData) => {
            return conversionMutation.mutateAsync(data);
        },
        [conversionMutation],
    );

    const handleSwapCurrencies = () => {
        const fromCurrency = form.getValues("fromCurrency");
        const toCurrency = form.getValues("toCurrency");

        form.setValue("fromCurrency", toCurrency);
        form.setValue("toCurrency", fromCurrency);
    };

    const handleRetry = useCallback(async () => {
        const formData = form.getValues();
        if (form.formState.isValid) {
            return conversionMutation.mutateAsync(formData);
        }
    }, [form, conversionMutation]);

    return {
        form,
        onSubmit: form.handleSubmit(onSubmit),
        handleSwapCurrencies,
        handleRetry,
        isSubmitting: form.formState.isSubmitting || conversionMutation.isPending,
        errors: form.formState.errors,
        conversionResult: conversionMutation.data,
        conversionError: conversionMutation.error,
    };
};
