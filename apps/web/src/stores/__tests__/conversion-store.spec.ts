import { describe, it, expect, beforeEach } from "vitest";
import { useConversionStore } from "../conversion-store";
import type { ProcessedConversionResponse } from "../../types/currency";

// Mock data for testing
const mockConversionResult: ProcessedConversionResponse = {
    fromCurrency: "USD",
    toCurrency: "EUR",
    originalAmount: 100,
    convertedAmount: 85.5,
    exchangeRate: 0.855,
    date: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString(),
};

describe("useConversionStore", () => {
    beforeEach(() => {
        // Reset store state before each test
        useConversionStore.getState().clearConversionResult();
    });

    describe("initial state", () => {
        it("should have null conversionResult initially", () => {
            const { conversionResult } = useConversionStore.getState();
            expect(conversionResult).toBeNull();
        });
    });

    describe("setConversionResult", () => {
        it("should set the conversion result", () => {
            const { setConversionResult } = useConversionStore.getState();

            setConversionResult(mockConversionResult);

            const { conversionResult } = useConversionStore.getState();
            expect(conversionResult).toEqual(mockConversionResult);
        });

        it("should update existing conversion result", () => {
            const { setConversionResult } = useConversionStore.getState();

            // Set initial result
            setConversionResult(mockConversionResult);

            // Update with new result
            const newResult: ProcessedConversionResponse = {
                ...mockConversionResult,
                originalAmount: 200,
                convertedAmount: 171.0,
            };

            setConversionResult(newResult);

            const { conversionResult } = useConversionStore.getState();
            expect(conversionResult).toEqual(newResult);
            expect(conversionResult).not.toEqual(mockConversionResult);
        });
    });

    describe("clearConversionResult", () => {
        it("should clear the conversion result", () => {
            const { setConversionResult, clearConversionResult } = useConversionStore.getState();

            // Set a result first
            setConversionResult(mockConversionResult);

            // Verify it was set
            expect(useConversionStore.getState().conversionResult).toEqual(mockConversionResult);

            // Clear it
            clearConversionResult();

            // Verify it was cleared
            expect(useConversionStore.getState().conversionResult).toBeNull();
        });

        it("should not throw when clearing already null result", () => {
            const { clearConversionResult } = useConversionStore.getState();

            // Should not throw
            expect(() => clearConversionResult()).not.toThrow();

            // Result should still be null
            expect(useConversionStore.getState().conversionResult).toBeNull();
        });
    });

    describe("store state management", () => {
        it("should maintain state between multiple operations", () => {
            const { setConversionResult, clearConversionResult } = useConversionStore.getState();

            // Initial state
            expect(useConversionStore.getState().conversionResult).toBeNull();

            // Set result
            setConversionResult(mockConversionResult);
            expect(useConversionStore.getState().conversionResult).toEqual(mockConversionResult);

            // Clear result
            clearConversionResult();
            expect(useConversionStore.getState().conversionResult).toBeNull();

            // Set result again
            setConversionResult(mockConversionResult);
            expect(useConversionStore.getState().conversionResult).toEqual(mockConversionResult);
        });

        it("should handle multiple rapid state changes", () => {
            const { setConversionResult, clearConversionResult } = useConversionStore.getState();

            // Rapid state changes
            setConversionResult(mockConversionResult);
            clearConversionResult();
            setConversionResult(mockConversionResult);
            clearConversionResult();
            setConversionResult(mockConversionResult);

            // Final state should be the last set result
            expect(useConversionStore.getState().conversionResult).toEqual(mockConversionResult);
        });
    });

    describe("type safety", () => {
        it("should accept valid ProcessedConversionResponse objects", () => {
            const { setConversionResult } = useConversionStore.getState();

            const validResults: ProcessedConversionResponse[] = [
                {
                    fromCurrency: "USD",
                    toCurrency: "EUR",
                    originalAmount: 100,
                    convertedAmount: 85.5,
                    exchangeRate: 0.855,
                    date: new Date().toISOString(),
                    lastUpdatedAt: new Date().toISOString(),
                },
                {
                    fromCurrency: "BRL",
                    toCurrency: "USD",
                    originalAmount: 500,
                    convertedAmount: 100.0,
                    exchangeRate: 0.2,
                    date: new Date().toISOString(),
                    lastUpdatedAt: new Date().toISOString(),
                },
            ];

            validResults.forEach((result) => {
                expect(() => setConversionResult(result)).not.toThrow();
                expect(useConversionStore.getState().conversionResult).toEqual(result);
            });
        });
    });
});
