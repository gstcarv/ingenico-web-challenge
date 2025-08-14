import { renderHook, act } from "@testing-library/react";
import { useCurrencyForm } from "../use-currency-form";

describe("useCurrencyForm", () => {
    it("should initialize with default values", () => {
        const { result } = renderHook(() => useCurrencyForm());

        expect(result.current.form.getValues()).toEqual({
            fromCurrency: "",
            toCurrency: "",
            amount: 0,
            date: undefined,
        });
    });

    it("should handle form submission with valid data", async () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation();
        const { result } = renderHook(() => useCurrencyForm());

        // Set form values
        act(() => {
            result.current.form.setValue("fromCurrency", "USD");
            result.current.form.setValue("toCurrency", "EUR");
            result.current.form.setValue("amount", 100);
        });

        // Submit form
        await act(async () => {
            await result.current.onSubmit();
        });

        expect(consoleSpy).toHaveBeenCalledWith("Form submitted:", {
            fromCurrency: "USD",
            toCurrency: "EUR",
            amount: 100,
            date: undefined,
        });

        consoleSpy.mockRestore();
    });

    it("should swap currencies correctly", () => {
        const { result } = renderHook(() => useCurrencyForm());

        // Set initial values
        act(() => {
            result.current.form.setValue("fromCurrency", "USD");
            result.current.form.setValue("toCurrency", "EUR");
        });

        // Swap currencies
        act(() => {
            result.current.handleSwapCurrencies();
        });

        expect(result.current.form.getValues("fromCurrency")).toBe("EUR");
        expect(result.current.form.getValues("toCurrency")).toBe("USD");
    });

    it("should validate required fields", async () => {
        const { result } = renderHook(() => useCurrencyForm());

        // Try to submit without setting required fields
        await act(async () => {
            await result.current.onSubmit();
        });

        const errors = result.current.form.formState.errors;
        expect(errors.fromCurrency).toBeDefined();
        expect(errors.toCurrency).toBeDefined();
        expect(errors.amount).toBeDefined();
    });
});
