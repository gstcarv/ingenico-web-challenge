import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useCallback } from "react";
import { currencyFormSchema, type CurrencyFormData } from "../lib/helpers/currency-schema";
import { handleCurrencyConversionMutation } from "../queries/handle-currency-conversion";
import { useConversionStore } from "../stores/conversion-store";

export const useCurrencyForm = () => {
    const { setConversionResult } = useConversionStore();
    const isInitialMount = useRef(true);

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

    // Auto-submit when fromCurrency, toCurrency, or date changes (but not amount)
    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            // Skip on initial mount
            if (isInitialMount.current) {
                isInitialMount.current = false;
                return;
            }

            // Only auto-submit if the change is not the amount field
            if (name !== "amount" && value.fromCurrency && value.toCurrency && value.amount && value.amount > 0) {
                form.handleSubmit(onSubmit)();
            }
        });

        return () => subscription.unsubscribe();
    }, [form, onSubmit]);

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
