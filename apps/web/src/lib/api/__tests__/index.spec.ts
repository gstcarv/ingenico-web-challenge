import { describe, it, expect, vi, beforeEach } from "vitest";
import { getApiUrl, fetchCurrency } from "../index";

// Mock the env module
vi.mock("../../env", () => ({
    env: {
        CURRENCY_API_URL: "https://api.example.com",
        CURRENCY_API_KEY: "test-api-key",
    },
}));

describe("api", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("getApiUrl", () => {
        it("should create URL with base path and API key", () => {
            const result = getApiUrl("/convert");

            expect(result).toBe("https://api.example.com/convert?apikey=test-api-key");
        });

        it("should add query parameters", () => {
            const params = {
                from: "USD",
                to: "EUR",
                amount: "100",
            };

            const result = getApiUrl("/convert", params);

            expect(result).toBe("https://api.example.com/convert?apikey=test-api-key&from=USD&to=EUR&amount=100");
        });

        it("should skip undefined parameters", () => {
            const params = {
                from: "USD",
                to: undefined,
                amount: "100",
            };

            const result = getApiUrl("/convert", params);

            expect(result).toBe("https://api.example.com/convert?apikey=test-api-key&from=USD&amount=100");
        });

        it("should handle empty parameters object", () => {
            const result = getApiUrl("/convert", {});

            expect(result).toBe("https://api.example.com/convert?apikey=test-api-key");
        });
    });

    describe("fetchCurrency", () => {
        it("should fetch data successfully", async () => {
            const mockResponse = { success: true, data: { rate: 1.2 } };
            const mockFetch = vi.fn().mockResolvedValue({
                ok: true,
                json: vi.fn().mockResolvedValue(mockResponse),
            });

            global.fetch = mockFetch;

            const result = await fetchCurrency("/convert", { from: "USD", to: "EUR" });

            expect(mockFetch).toHaveBeenCalledWith(
                "https://api.example.com/convert?apikey=test-api-key&from=USD&to=EUR",
                {
                    headers: {
                        apikey: "test-api-key",
                    },
                },
            );
            expect(result).toEqual(mockResponse);
        });

        it("should throw error on non-ok response", async () => {
            const mockFetch = vi.fn().mockResolvedValue({
                ok: false,
                status: 400,
                statusText: "Bad Request",
            });

            global.fetch = mockFetch;

            await expect(fetchCurrency("/convert")).rejects.toThrow("API request failed: 400 Bad Request");
        });

        it("should call getApiUrl with correct parameters", async () => {
            const mockResponse = { success: true };
            const mockFetch = vi.fn().mockResolvedValue({
                ok: true,
                json: vi.fn().mockResolvedValue(mockResponse),
            });

            global.fetch = mockFetch;

            const params = { from: "USD", to: "EUR" };
            await fetchCurrency("/convert", params);

            expect(mockFetch).toHaveBeenCalledWith(
                "https://api.example.com/convert?apikey=test-api-key&from=USD&to=EUR",
                expect.any(Object),
            );
        });

        it("should handle fetch errors", async () => {
            const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"));

            global.fetch = mockFetch;

            await expect(fetchCurrency("/convert")).rejects.toThrow("Network error");
        });
    });
});
