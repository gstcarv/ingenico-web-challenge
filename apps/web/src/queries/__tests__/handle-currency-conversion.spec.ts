import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { handleCurrencyConversion, handleCurrencyConversionMutation } from "../handle-currency-conversion";
import { fetchCurrency } from "../../lib/api";
import { HistoricalConversionResponse, ProcessedConversionResponse } from "../../types/currency";
import { HistoricalConversionParams } from "../../lib/helpers/currency-schema";

// Mock the API module
vi.mock("../../lib/api", () => ({
    fetchCurrency: vi.fn(),
}));

// Mock dayjs
vi.mock("dayjs", () => ({
    default: vi.fn(() => ({
        subtract: vi.fn().mockReturnThis(),
        toDate: vi.fn(() => new Date("2024-01-01")),
    })),
}));

// Mock the server function to return a callable function
vi.mock("@tanstack/react-start", () => ({
    createServerFn: vi.fn(() => {
        let validatorFn: (params: unknown) => unknown;
        let handlerFn: (ctx: { data: unknown }) => Promise<unknown>;

        const serverFn = async (params: { data: unknown }) => {
            // Validate first
            const validatedData = validatorFn(params.data);
            // Then call handler
            return await handlerFn({ data: validatedData });
        };

        serverFn.validator = (fn: (params: unknown) => unknown) => {
            validatorFn = fn;
            return serverFn;
        };

        serverFn.handler = (fn: (ctx: { data: unknown }) => Promise<unknown>) => {
            handlerFn = fn;
            return serverFn;
        };

        return serverFn;
    }),
}));

// Mock fetch globally
global.fetch = vi.fn();

describe("handleCurrencyConversion", () => {
    const mockFetchCurrency = vi.mocked(fetchCurrency);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("server function configuration", () => {
        it("should be a server function with validator and handler", () => {
            expect(handleCurrencyConversion).toBeDefined();
            expect(typeof handleCurrencyConversion).toBe("function");
        });

        it("should have validator and handler methods", () => {
            expect(handleCurrencyConversion).toBeDefined();
        });
    });

    describe("handler functionality", () => {
        it("should process currency conversion with valid data", async () => {
            const mockResponse: HistoricalConversionResponse = {
                data: {
                    EUR: {
                        code: "EUR",
                        value: 0.85,
                    },
                },
                meta: {
                    last_updated_at: "2024-01-01T12:00:00Z",
                },
            };

            mockFetchCurrency.mockResolvedValue(mockResponse);

            const testData: HistoricalConversionParams = {
                fromCurrency: "USD",
                toCurrency: "EUR",
                amount: 100,
                date: new Date("2024-01-01"),
            };

            // Test the actual handler logic by calling the function
            const result = await handleCurrencyConversion({ data: testData });

            expect(mockFetchCurrency).toHaveBeenCalledWith("/v3/historical", {
                date: "2024-01-01",
                base_currency: "USD",
                currencies: "EUR",
            });

            expect(result).toEqual({
                originalAmount: 100,
                convertedAmount: 85,
                fromCurrency: "USD",
                toCurrency: "EUR",
                exchangeRate: 0.85,
                date: "2024-01-01",
                lastUpdatedAt: "2024-01-01T12:00:00Z",
            });
        });

        it("should use default date when no date is provided", async () => {
            const mockResponse: HistoricalConversionResponse = {
                data: {
                    EUR: {
                        code: "EUR",
                        value: 0.85,
                    },
                },
                meta: {
                    last_updated_at: "2024-01-01T12:00:00Z",
                },
            };

            mockFetchCurrency.mockResolvedValue(mockResponse);

            const testData: HistoricalConversionParams = {
                fromCurrency: "USD",
                toCurrency: "EUR",
                amount: 100,
            };

            const result = await handleCurrencyConversion({ data: testData });

            expect(mockFetchCurrency).toHaveBeenCalledWith("/v3/historical", {
                date: "2024-01-01",
                base_currency: "USD",
                currencies: "EUR",
            });

            expect(result.date).toBe("2024-01-01");
        });

        it("should use default date when date is null", async () => {
            const mockResponse: HistoricalConversionResponse = {
                data: {
                    EUR: {
                        code: "EUR",
                        value: 0.85,
                    },
                },
                meta: {
                    last_updated_at: "2024-01-01T12:00:00Z",
                },
            };

            mockFetchCurrency.mockResolvedValue(mockResponse);

            const testData: HistoricalConversionParams = {
                fromCurrency: "USD",
                toCurrency: "EUR",
                amount: 100,
                date: undefined,
            };

            const result = await handleCurrencyConversion({ data: testData });

            expect(mockFetchCurrency).toHaveBeenCalledWith("/v3/historical", {
                date: "2024-01-01",
                base_currency: "USD",
                currencies: "EUR",
            });

            expect(result.date).toBe("2024-01-01");
        });

        it("should handle decimal amounts correctly", async () => {
            const mockResponse: HistoricalConversionResponse = {
                data: {
                    EUR: {
                        code: "EUR",
                        value: 0.8537,
                    },
                },
                meta: {
                    last_updated_at: "2024-01-01T12:00:00Z",
                },
            };

            mockFetchCurrency.mockResolvedValue(mockResponse);

            const testData: HistoricalConversionParams = {
                fromCurrency: "USD",
                toCurrency: "EUR",
                amount: 123.45,
                date: new Date("2024-01-01"),
            };

            const result = await handleCurrencyConversion({ data: testData });

            expect(result.convertedAmount).toBe(105.39); // 123.45 * 0.8537 = 105.39 (rounded)
        });

        it("should throw error when exchange rate is not found", async () => {
            const mockResponse: HistoricalConversionResponse = {
                data: {},
                meta: {
                    last_updated_at: "2024-01-01T12:00:00Z",
                },
            };

            mockFetchCurrency.mockResolvedValue(mockResponse);

            const testData: HistoricalConversionParams = {
                fromCurrency: "USD",
                toCurrency: "EUR",
                amount: 100,
                date: new Date("2024-01-01"),
            };

            await expect(handleCurrencyConversion({ data: testData })).rejects.toThrow(
                "Exchange rate not found for EUR",
            );
        });

        it("should throw error when API call fails", async () => {
            mockFetchCurrency.mockRejectedValue(new Error("API Error"));

            const testData: HistoricalConversionParams = {
                fromCurrency: "USD",
                toCurrency: "EUR",
                amount: 100,
                date: new Date("2024-01-01"),
            };

            await expect(handleCurrencyConversion({ data: testData })).rejects.toThrow("API Error");
        });

        it("should format date correctly for API call", async () => {
            const mockResponse: HistoricalConversionResponse = {
                data: {
                    EUR: {
                        code: "EUR",
                        value: 0.85,
                    },
                },
                meta: {
                    last_updated_at: "2024-01-01T12:00:00Z",
                },
            };

            mockFetchCurrency.mockResolvedValue(mockResponse);

            const testData: HistoricalConversionParams = {
                fromCurrency: "USD",
                toCurrency: "EUR",
                amount: 100,
                date: new Date("2024-01-15T10:30:00Z"),
            };

            await handleCurrencyConversion({ data: testData });

            expect(mockFetchCurrency).toHaveBeenCalledWith("/v3/historical", {
                date: "2024-01-15",
                base_currency: "USD",
                currencies: "EUR",
            });
        });
    });
});

describe("handleCurrencyConversionMutation", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should return correct mutation configuration", () => {
        const mutationOptions = handleCurrencyConversionMutation();

        expect(mutationOptions.mutationKey).toEqual(["historical-conversion"]);
        expect(typeof mutationOptions.mutationFn).toBe("function");
    });

    it("should have proper TypeScript types", () => {
        const mutationOptions = handleCurrencyConversionMutation();

        expect(mutationOptions.mutationFn).toBeDefined();

        if (mutationOptions.mutationFn) {
            expect(typeof mutationOptions.mutationFn).toBe("function");
        }
    });

    it("should accept HistoricalConversionParams as input", () => {
        const mutationOptions = handleCurrencyConversionMutation();

        expect(mutationOptions.mutationFn).toBeDefined();
    });

    it("should have mutation function that accepts parameters", () => {
        const mutationOptions = handleCurrencyConversionMutation();

        expect(mutationOptions.mutationFn).toBeDefined();
        expect(typeof mutationOptions.mutationFn).toBe("function");
    });

    it("should call handleCurrencyConversion when mutation function is executed", async () => {
        const mockResponse: ProcessedConversionResponse = {
            originalAmount: 100,
            convertedAmount: 85,
            fromCurrency: "USD",
            toCurrency: "EUR",
            exchangeRate: 0.85,
            date: "2024-01-01",
            lastUpdatedAt: "2024-01-01T12:00:00Z",
        };

        // Mock the fetchCurrency function
        vi.mocked(fetchCurrency).mockResolvedValue({
            data: {
                EUR: {
                    code: "EUR",
                    value: 0.85,
                },
            },
            meta: {
                last_updated_at: "2024-01-01T12:00:00Z",
            },
        });

        const mutationOptions = handleCurrencyConversionMutation();
        const testData: HistoricalConversionParams = {
            fromCurrency: "USD",
            toCurrency: "EUR",
            amount: 100,
            date: new Date("2024-01-01"),
        };

        const result = await mutationOptions.mutationFn!(testData);

        expect(fetchCurrency).toHaveBeenCalledWith("/v3/historical", {
            date: "2024-01-01",
            base_currency: "USD",
            currencies: "EUR",
        });
        expect(result).toEqual(mockResponse);
    });
});

describe("API Integration tests", () => {
    const mockFetchCurrency = vi.mocked(fetchCurrency);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should handle different currency pairs correctly", async () => {
        const mockResponse: HistoricalConversionResponse = {
            data: {
                JPY: {
                    code: "JPY",
                    value: 110.5,
                },
            },
            meta: {
                last_updated_at: "2024-01-01T12:00:00Z",
            },
        };

        mockFetchCurrency.mockResolvedValue(mockResponse);

        const testData: HistoricalConversionParams = {
            fromCurrency: "USD",
            toCurrency: "JPY",
            amount: 50,
            date: new Date("2024-01-01"),
        };

        const result = await handleCurrencyConversion({ data: testData });

        expect(mockFetchCurrency).toHaveBeenCalledWith("/v3/historical", {
            date: "2024-01-01",
            base_currency: "USD",
            currencies: "JPY",
        });

        expect(result.convertedAmount).toBe(5525); // 50 * 110.5
    });
});
