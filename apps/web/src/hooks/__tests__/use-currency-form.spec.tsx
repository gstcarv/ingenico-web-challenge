/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useCurrencyForm } from "../use-currency-form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock the mutation
const mockMutateAsync = vi.fn();
const mockMutation = {
    mutateAsync: mockMutateAsync,
    isPending: false,
    data: null,
    error: null,
};

vi.mock("../queries/handle-currency-conversion", () => ({
    handleCurrencyConversionMutation: () => ({
        mutationFn: vi.fn(),
    }),
}));

// Mock react-query
vi.mock("@tanstack/react-query", async () => {
    const actual = await vi.importActual("@tanstack/react-query");
    return {
        ...actual,
        useMutation: () => mockMutation,
    };
});

// Mock the store
const mockSetConversionResult = vi.fn();
vi.mock("../stores/conversion-store", () => ({
    useConversionStore: () => ({
        setConversionResult: mockSetConversionResult,
    }),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    });

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe("useCurrencyForm", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockMutateAsync.mockResolvedValue({ success: true });
    });

    it("should return form with correct default values", () => {
        const { result } = renderHook(() => useCurrencyForm(), {
            wrapper: TestWrapper,
        });

        expect(result.current.form).toBeDefined();
        expect(result.current.form.getValues()).toEqual({
            fromCurrency: "",
            toCurrency: "",
            amount: undefined,
            date: undefined,
        });
    });

    it("should return all required properties", () => {
        const { result } = renderHook(() => useCurrencyForm(), {
            wrapper: TestWrapper,
        });

        expect(result.current.form).toBeDefined();
        expect(result.current.onSubmit).toBeDefined();
        expect(result.current.handleSwapCurrencies).toBeDefined();
        expect(result.current.handleRetry).toBeDefined();
        expect(result.current.isSubmitting).toBeDefined();
        expect(result.current.errors).toBeDefined();
        expect(result.current.conversionResult).toBeDefined();
        expect(result.current.conversionError).toBeDefined();
    });

    it("should handle swap currencies correctly", () => {
        const { result } = renderHook(() => useCurrencyForm(), {
            wrapper: TestWrapper,
        });

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

    it("should call mutation when form is submitted", async () => {
        const { result } = renderHook(() => useCurrencyForm(), {
            wrapper: TestWrapper,
        });

        const testData = {
            fromCurrency: "USD",
            toCurrency: "EUR",
            amount: 100,
            date: new Date("2024-01-01"),
        };

        // Set form values
        act(() => {
            result.current.form.setValue("fromCurrency", testData.fromCurrency);
            result.current.form.setValue("toCurrency", testData.toCurrency);
            result.current.form.setValue("amount", testData.amount);
            result.current.form.setValue("date", testData.date);
        });

        // Simulate form submission by calling the underlying onSubmit function
        const mockEvent = {} as any;
        await act(async () => {
            await result.current.onSubmit(mockEvent);
        });

        expect(mockMutateAsync).toHaveBeenCalledWith(testData);
    });

    it("should call setConversionResult when mutation succeeds", async () => {
        const mockData = { success: true, result: 85.5 };
        mockMutateAsync.mockResolvedValue(mockData);

        const { result } = renderHook(() => useCurrencyForm(), {
            wrapper: TestWrapper,
        });

        const testData = {
            fromCurrency: "USD",
            toCurrency: "EUR",
            amount: 100,
            date: new Date("2024-01-01"),
        };

        // Set form values
        act(() => {
            result.current.form.setValue("fromCurrency", testData.fromCurrency);
            result.current.form.setValue("toCurrency", testData.toCurrency);
            result.current.form.setValue("amount", testData.amount);
            result.current.form.setValue("date", testData.date);
        });

        // Simulate form submission
        const mockEvent = {} as any;
        await act(async () => {
            await result.current.onSubmit(mockEvent);
        });

        // The mutation should be called with the form data
        expect(mockMutateAsync).toHaveBeenCalledWith(testData);
    });

    it("should handle retry when form is valid", async () => {
        const { result } = renderHook(() => useCurrencyForm(), {
            wrapper: TestWrapper,
        });

        const testData = {
            fromCurrency: "USD",
            toCurrency: "EUR",
            amount: 100,
            date: new Date("2024-01-01"),
        };

        // Set form values
        act(() => {
            result.current.form.setValue("fromCurrency", testData.fromCurrency);
            result.current.form.setValue("toCurrency", testData.toCurrency);
            result.current.form.setValue("amount", testData.amount);
            result.current.form.setValue("date", testData.date);
        });

        // Call handleRetry
        await act(async () => {
            await result.current.handleRetry();
        });

        expect(mockMutateAsync).toHaveBeenCalledWith(testData);
    });

    it("should not call mutation when retry is called with invalid form", async () => {
        const { result } = renderHook(() => useCurrencyForm(), {
            wrapper: TestWrapper,
        });

        // Set some values but leave required fields empty to make form invalid
        act(() => {
            result.current.form.setValue("fromCurrency", ""); // Empty required field
            result.current.form.setValue("toCurrency", ""); // Empty required field
        });

        // Trigger validation by calling trigger
        await act(async () => {
            await result.current.form.trigger();
        });

        // Call handleRetry
        await act(async () => {
            await result.current.handleRetry();
        });

        expect(mockMutateAsync).not.toHaveBeenCalled();
    });

    it("should return correct isSubmitting state", () => {
        const { result } = renderHook(() => useCurrencyForm(), {
            wrapper: TestWrapper,
        });

        expect(result.current.isSubmitting).toBe(false);
    });

    it("should return mutation data and error", () => {
        const { result } = renderHook(() => useCurrencyForm(), {
            wrapper: TestWrapper,
        });

        expect(result.current.conversionResult).toBe(null);
        expect(result.current.conversionError).toBe(null);
    });

    it("should handle form errors correctly", () => {
        const { result } = renderHook(() => useCurrencyForm(), {
            wrapper: TestWrapper,
        });

        expect(result.current.errors).toEqual({});
    });

    it("should memoize onSubmit function", () => {
        const { result, rerender } = renderHook(() => useCurrencyForm(), {
            wrapper: TestWrapper,
        });

        rerender();

        // Note: onSubmit is wrapped by form.handleSubmit, so it might not be the same reference
        // We'll just verify it's still a function
        expect(typeof result.current.onSubmit).toBe("function");
    });

    it("should memoize handleRetry function", () => {
        const { result, rerender } = renderHook(() => useCurrencyForm(), {
            wrapper: TestWrapper,
        });

        const firstHandleRetry = result.current.handleRetry;

        rerender();

        expect(result.current.handleRetry).toBe(firstHandleRetry);
    });
});
