import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { ConversionResult } from "../conversion-result";
import type { ProcessedConversionResponse } from "../../../types/currency";

// Mock the conversion store
vi.mock("../../../stores/conversion-store", () => ({
    useConversionStore: vi.fn(),
}));

const mockUseConversionStore = vi.mocked(await import("../../../stores/conversion-store")).useConversionStore;

describe("ConversionResult", () => {
    const mockConversionResult: ProcessedConversionResponse = {
        originalAmount: 100,
        convertedAmount: 85.5,
        fromCurrency: "USD",
        toCurrency: "EUR",
        exchangeRate: 0.855,
        date: "2024-01-15",
        lastUpdatedAt: "2024-01-15T10:30:00Z",
    };

    beforeEach(() => {
        vi.clearAllMocks();
        // Mock Date.prototype.toLocaleString to return a consistent date string
        vi.spyOn(Date.prototype, "toLocaleString").mockReturnValue("1/15/2024, 7:30:00 AM");
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should render nothing when conversionResult is null", () => {
        mockUseConversionStore.mockReturnValue({
            conversionResult: null,
        });

        const { container } = render(<ConversionResult />);
        expect(container.firstChild).toBeNull();
    });

    it("should render conversion result with correct structure", () => {
        mockUseConversionStore.mockReturnValue({
            conversionResult: mockConversionResult,
        });

        render(<ConversionResult />);

        expect(screen.getByText("Conversion Result")).toBeInTheDocument();
        expect(screen.getByText("Original Amount")).toBeInTheDocument();
        expect(screen.getByText("Converted Amount")).toBeInTheDocument();
        expect(screen.getByText("Exchange Rate")).toBeInTheDocument();
    });

    it("should format currency values correctly", () => {
        mockUseConversionStore.mockReturnValue({
            conversionResult: mockConversionResult,
        });

        render(<ConversionResult />);

        // Check original amount formatting
        expect(screen.getByText("$100.00")).toBeInTheDocument();

        // Check converted amount formatting
        expect(screen.getByText("€85.50")).toBeInTheDocument();
    });

    it("should format exchange rate correctly", () => {
        mockUseConversionStore.mockReturnValue({
            conversionResult: mockConversionResult,
        });

        render(<ConversionResult />);

        expect(screen.getByText("1 USD = 0.8550 EUR")).toBeInTheDocument();
    });

    it("should display date and last updated information", () => {
        mockUseConversionStore.mockReturnValue({
            conversionResult: mockConversionResult,
        });

        render(<ConversionResult />);

        expect(screen.getByText(/Date: 2024-01-15/)).toBeInTheDocument();
        expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
    });

    it("should handle different currency codes correctly", () => {
        const cryptoConversionResult: ProcessedConversionResponse = {
            originalAmount: 1,
            convertedAmount: 45000,
            fromCurrency: "BTC",
            toCurrency: "USD",
            exchangeRate: 45000,
            date: "2024-01-15",
            lastUpdatedAt: "2024-01-15T10:30:00Z",
        };

        mockUseConversionStore.mockReturnValue({
            conversionResult: cryptoConversionResult,
        });

        render(<ConversionResult />);

        expect(screen.getByText("BTC 1.00")).toBeInTheDocument();
        expect(screen.getByText("$45,000.00")).toBeInTheDocument();
        expect(screen.getByText("1 BTC = 45,000.0000 USD")).toBeInTheDocument();
    });

    it("should handle decimal precision correctly", () => {
        const preciseConversionResult: ProcessedConversionResponse = {
            originalAmount: 1.123456,
            convertedAmount: 0.987654,
            fromCurrency: "USD",
            toCurrency: "JPY",
            exchangeRate: 0.987654,
            date: "2024-01-15",
            lastUpdatedAt: "2024-01-15T10:30:00Z",
        };

        mockUseConversionStore.mockReturnValue({
            conversionResult: preciseConversionResult,
        });

        render(<ConversionResult />);

        expect(screen.getByText("$1.123456")).toBeInTheDocument();
        expect(screen.getByText("¥0.987654")).toBeInTheDocument();
        expect(screen.getByText("1 USD = 0.987654 JPY")).toBeInTheDocument();
    });

    it("should have correct CSS classes and styling", () => {
        mockUseConversionStore.mockReturnValue({
            conversionResult: mockConversionResult,
        });

        const { container } = render(<ConversionResult />);

        const mainContainer = container.firstChild as HTMLElement;
        expect(mainContainer).toHaveClass("mt-6", "p-4", "bg-success-50", "border", "border-success-200", "rounded-lg");
    });

    it("should handle zero amounts correctly", () => {
        const zeroConversionResult: ProcessedConversionResponse = {
            originalAmount: 0,
            convertedAmount: 0,
            fromCurrency: "USD",
            toCurrency: "EUR",
            exchangeRate: 0,
            date: "2024-01-15",
            lastUpdatedAt: "2024-01-15T10:30:00Z",
        };

        mockUseConversionStore.mockReturnValue({
            conversionResult: zeroConversionResult,
        });

        render(<ConversionResult />);

        expect(screen.getByText("$0.00")).toBeInTheDocument();
        expect(screen.getByText("€0.00")).toBeInTheDocument();
        expect(screen.getByText("1 USD = 0.0000 EUR")).toBeInTheDocument();
    });
});
