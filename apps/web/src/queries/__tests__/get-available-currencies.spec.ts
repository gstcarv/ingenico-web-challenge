import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAvailableCurrenciesQuery } from "../get-available-currencies";
import { fetchCurrency } from "../../lib/api";
import type { GetCurrenciesResponse } from "../../types/currency";

// Mock the API module
vi.mock("../../lib/api", () => ({
    fetchCurrency: vi.fn(),
}));

const mockFetchCurrency = vi.mocked(fetchCurrency);

describe("getAvailableCurrenciesQuery", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should return correct query configuration", () => {
        const queryOptions = getAvailableCurrenciesQuery();

        expect(queryOptions.queryKey).toEqual(["available-currencies"]);
        expect(queryOptions.staleTime).toBe(1000 * 60 * 60 * 24); // 24 hours
        expect(typeof queryOptions.queryFn).toBe("function");
    });

    it("should call fetchCurrency with correct parameters", async () => {
        const mockResponse: GetCurrenciesResponse = {
            data: {
                USD: {
                    symbol: "$",
                    name: "US Dollar",
                    symbol_native: "$",
                    decimal_digits: 2,
                    rounding: 0,
                    code: "USD",
                    name_plural: "US dollars",
                    type: "fiat",
                    countries: ["US"],
                },
            },
        };

        mockFetchCurrency.mockResolvedValue(mockResponse);

        const queryOptions = getAvailableCurrenciesQuery();
        const queryFn = queryOptions.queryFn as () => Promise<GetCurrenciesResponse>;
        const result = await queryFn();

        expect(mockFetchCurrency).toHaveBeenCalledWith("/v3/currencies");
        expect(result).toEqual(mockResponse);
    });

    it("should handle API errors properly", async () => {
        const errorMessage = "API request failed: 500 Internal Server Error";
        mockFetchCurrency.mockRejectedValue(new Error(errorMessage));

        const queryOptions = getAvailableCurrenciesQuery();
        const queryFn = queryOptions.queryFn as () => Promise<GetCurrenciesResponse>;

        await expect(queryFn()).rejects.toThrow(errorMessage);
        expect(mockFetchCurrency).toHaveBeenCalledWith("/v3/currencies");
    });

    it("should return correct stale time configuration", () => {
        const queryOptions = getAvailableCurrenciesQuery();

        // 24 hours in milliseconds
        const expectedStaleTime = 1000 * 60 * 60 * 24;
        expect(queryOptions.staleTime).toBe(expectedStaleTime);
    });

    it("should have proper TypeScript types", () => {
        const queryOptions = getAvailableCurrenciesQuery();

        // This test ensures the query function returns the correct type
        expect(queryOptions.queryFn).toBeDefined();

        // The queryFn should be async and return Promise<GetCurrenciesResponse>
        if (queryOptions.queryFn) {
            expect(typeof queryOptions.queryFn).toBe("function");
        }
    });
});
