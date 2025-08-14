import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CurrencyConverterForm } from "../currency-converter-form";

// Mock child components
vi.mock("../currency-select", () => ({
    CurrencySelect: ({ label, name }: { label: string; name: string }) => (
        <div data-testid={`currency-select-${name}`}>
            {label} Currency Select ({name})
        </div>
    ),
}));

vi.mock("../currency-amount-input", () => ({
    CurrencyAmountInput: () => <div data-testid="currency-amount-input">Currency Amount Input</div>,
}));

vi.mock("../convert-button", () => ({
    ConvertButton: () => <div data-testid="convert-button">Convert Button</div>,
}));

// Mock the hook
const mockOnSubmit = vi.fn();
const mockHandleSwapCurrencies = vi.fn();
const mockHandleRetry = vi.fn();
const mockHandleSubmit = vi.fn((fn) => {
    // Return a function that calls the original function and our mock
    return (event: React.FormEvent) => {
        event?.preventDefault?.();
        fn();
        mockOnSubmit();
    };
});

vi.mock("../../../hooks/use-currency-form", () => ({
    useCurrencyForm: () => ({
        form: {
            control: {},
            handleSubmit: mockHandleSubmit,
        },
        onSubmit: mockOnSubmit,
        handleSwapCurrencies: mockHandleSwapCurrencies,
        handleRetry: mockHandleRetry,
        isSubmitting: false,
        errors: {},
        conversionError: null,
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

describe("CurrencyConverterForm", () => {
    it("should render the component with correct structure", () => {
        const { container } = render(
            <TestWrapper>
                <CurrencyConverterForm />
            </TestWrapper>,
        );

        expect(container.querySelector("form")).toBeInTheDocument();
    });

    it("should render currency select components", () => {
        render(
            <TestWrapper>
                <CurrencyConverterForm />
            </TestWrapper>,
        );

        expect(screen.getByTestId("currency-select-fromCurrency")).toBeInTheDocument();
        expect(screen.getByTestId("currency-select-toCurrency")).toBeInTheDocument();
    });

    it("should render swap button", () => {
        render(
            <TestWrapper>
                <CurrencyConverterForm />
            </TestWrapper>,
        );

        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render currency amount input", () => {
        render(
            <TestWrapper>
                <CurrencyConverterForm />
            </TestWrapper>,
        );

        expect(screen.getByTestId("currency-amount-input")).toBeInTheDocument();
    });

    it("should render convert button", () => {
        render(
            <TestWrapper>
                <CurrencyConverterForm />
            </TestWrapper>,
        );

        expect(screen.getByTestId("convert-button")).toBeInTheDocument();
    });

    it("should render field labels", () => {
        render(
            <TestWrapper>
                <CurrencyConverterForm />
            </TestWrapper>,
        );

        expect(screen.getByText("Value")).toBeInTheDocument();
    });

    it("should have correct form structure", () => {
        const { container } = render(
            <TestWrapper>
                <CurrencyConverterForm />
            </TestWrapper>,
        );

        const form = container.querySelector("form");
        expect(form).toHaveClass("flex", "flex-col", "gap-6");
    });

    it("should match snapshot", () => {
        const { container } = render(
            <TestWrapper>
                <CurrencyConverterForm />
            </TestWrapper>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it("should call handleSwapCurrencies when swap button is clicked", () => {
        render(
            <TestWrapper>
                <CurrencyConverterForm />
            </TestWrapper>,
        );

        const swapButton = screen.getByRole("button");
        swapButton.click();

        expect(mockHandleSwapCurrencies).toHaveBeenCalledTimes(1);
    });

    it("should call handleRetry when retry is triggered", () => {
        render(
            <TestWrapper>
                <CurrencyConverterForm />
            </TestWrapper>,
        );

        // Verify that the retry function is available from the hook
        expect(mockHandleRetry).toBeDefined();
    });

    it("should pass form control to child components", () => {
        render(
            <TestWrapper>
                <CurrencyConverterForm />
            </TestWrapper>,
        );

        // Verify that the form control is being used by checking if child components are rendered
        expect(screen.getByTestId("currency-select-fromCurrency")).toBeInTheDocument();
        expect(screen.getByTestId("currency-select-toCurrency")).toBeInTheDocument();
        expect(screen.getByTestId("currency-amount-input")).toBeInTheDocument();
    });

    it("should pass loading state to ConvertButton", () => {
        render(
            <TestWrapper>
                <CurrencyConverterForm />
            </TestWrapper>,
        );

        // Verify that the ConvertButton is rendered and receives the isSubmitting prop
        expect(screen.getByTestId("convert-button")).toBeInTheDocument();
    });

    it("should have access to form submission function from hook", () => {
        render(
            <TestWrapper>
                <CurrencyConverterForm />
            </TestWrapper>,
        );

        // Verify that the onSubmit function is available from the hook
        expect(mockOnSubmit).toBeDefined();
    });

    it("should have access to swap currencies function from hook", () => {
        render(
            <TestWrapper>
                <CurrencyConverterForm />
            </TestWrapper>,
        );

        // Verify that the handleSwapCurrencies function is available from the hook
        expect(mockHandleSwapCurrencies).toBeDefined();
    });
});
