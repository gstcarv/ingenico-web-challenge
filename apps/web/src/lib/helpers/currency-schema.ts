import { z } from "zod";

export const currencyFormSchema = z.object({
    fromCurrency: z.string().min(1, "Please select a currency to convert from"),
    toCurrency: z.string().min(1, "Please select a currency to convert to"),
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    date: z.date().optional(),
});

export type CurrencyFormData = z.infer<typeof currencyFormSchema>;
