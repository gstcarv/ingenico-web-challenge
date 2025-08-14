import { describe, it, expect } from "vitest";
import { currencyFormSchema } from "../currency-schema";

describe("currency-schema", () => {
    describe("currencyFormSchema", () => {
        it("should validate correct form data", () => {
            const validData = {
                fromCurrency: "USD",
                toCurrency: "EUR",
                amount: 100,
                date: new Date("2024-01-15"),
            };

            const result = currencyFormSchema.safeParse(validData);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data).toEqual(validData);
            }
        });

        it("should validate form data without date", () => {
            const validData = {
                fromCurrency: "USD",
                toCurrency: "EUR",
                amount: 100,
            };

            const result = currencyFormSchema.safeParse(validData);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data).toEqual(validData);
            }
        });

        it("should validate minimum amount", () => {
            const validData = {
                fromCurrency: "USD",
                toCurrency: "EUR",
                amount: 0.01,
            };

            const result = currencyFormSchema.safeParse(validData);

            expect(result.success).toBe(true);
        });

        it("should reject empty fromCurrency", () => {
            const invalidData = {
                fromCurrency: "",
                toCurrency: "EUR",
                amount: 100,
            };

            const result = currencyFormSchema.safeParse(invalidData);

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe("Please select a currency to convert from");
            }
        });

        it("should reject empty toCurrency", () => {
            const invalidData = {
                fromCurrency: "USD",
                toCurrency: "",
                amount: 100,
            };

            const result = currencyFormSchema.safeParse(invalidData);

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe("Please select a currency to convert to");
            }
        });

        it("should reject zero amount", () => {
            const invalidData = {
                fromCurrency: "USD",
                toCurrency: "EUR",
                amount: 0,
            };

            const result = currencyFormSchema.safeParse(invalidData);

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe("Amount must be greater than 0");
            }
        });

        it("should reject negative amount", () => {
            const invalidData = {
                fromCurrency: "USD",
                toCurrency: "EUR",
                amount: -100,
            };

            const result = currencyFormSchema.safeParse(invalidData);

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe("Amount must be greater than 0");
            }
        });

        it("should reject amount less than 0.01", () => {
            const invalidData = {
                fromCurrency: "USD",
                toCurrency: "EUR",
                amount: 0.005,
            };

            const result = currencyFormSchema.safeParse(invalidData);

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe("Amount must be greater than 0");
            }
        });

        it("should reject string amount", () => {
            const invalidData = {
                fromCurrency: "USD",
                toCurrency: "EUR",
                amount: "100",
            };

            const result = currencyFormSchema.safeParse(invalidData);

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe("Amount must be greater than 0");
            }
        });

        it("should reject missing amount", () => {
            const invalidData = {
                fromCurrency: "USD",
                toCurrency: "EUR",
            };

            const result = currencyFormSchema.safeParse(invalidData);

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe("Amount must be greater than 0");
            }
        });

        it("should reject missing fromCurrency", () => {
            const invalidData = {
                toCurrency: "EUR",
                amount: 100,
            };

            const result = currencyFormSchema.safeParse(invalidData);

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe("Invalid input: expected string, received undefined");
            }
        });

        it("should reject missing toCurrency", () => {
            const invalidData = {
                fromCurrency: "USD",
                amount: 100,
            };

            const result = currencyFormSchema.safeParse(invalidData);

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe("Invalid input: expected string, received undefined");
            }
        });

        it("should validate large amounts", () => {
            const validData = {
                fromCurrency: "USD",
                toCurrency: "EUR",
                amount: 999999.99,
            };

            const result = currencyFormSchema.safeParse(validData);

            expect(result.success).toBe(true);
        });

        it("should validate decimal amounts", () => {
            const validData = {
                fromCurrency: "USD",
                toCurrency: "EUR",
                amount: 123.45,
            };

            const result = currencyFormSchema.safeParse(validData);

            expect(result.success).toBe(true);
        });

        it("should validate with different currency codes", () => {
            const validData = {
                fromCurrency: "JPY",
                toCurrency: "GBP",
                amount: 1000,
            };

            const result = currencyFormSchema.safeParse(validData);

            expect(result.success).toBe(true);
        });
    });
});
