import { render, screen, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useForm, Control } from "react-hook-form";
import { CurrencyAmountInput } from "../currency-amount-input";
import { CurrencyFormData } from "../../../lib/helpers/currency-schema";
import currenciesMock from "../../../mocks/currencies.json";

// Mock the query
vi.mock("../../../queries/get-available-currencies", () => ({
    getAvailableCurrenciesQuery: () => ({
        queryKey: ["currencies"],
        queryFn: () => Promise.resolve(currenciesMock),
    }),
}));

// Mock react-query to return data immediately
vi.mock("@tanstack/react-query", async () => {
    const actual = await vi.importActual("@tanstack/react-query");
    return {
        ...actual,
        useQuery: () => ({
            data: currenciesMock,
            isLoading: false,
            error: null,
        }),
    };
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    });

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const TestComponent = ({ control, suffix }: { control: Control<CurrencyFormData>; suffix?: React.ReactNode }) => {
    return (
        <TestWrapper>
            <CurrencyAmountInput control={control} suffix={suffix} />
        </TestWrapper>
    );
};

describe("CurrencyAmountInput", () => {
    it("should render the component with correct structure", () => {
        const { result } = renderHook(() => useForm<CurrencyFormData>());
        const { container } = render(<TestComponent control={result.current.control} />);

        expect(container.firstChild).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render with USD currency symbol when fromCurrency is USD", () => {
        const { result } = renderHook(() => useForm<CurrencyFormData>());
        result.current.setValue("fromCurrency", "USD");

        render(<TestComponent control={result.current.control} />);

        expect(screen.getByText("$")).toBeInTheDocument();
    });

    it("should render with EUR currency symbol when fromCurrency is EUR", () => {
        const { result } = renderHook(() => useForm<CurrencyFormData>());
        result.current.setValue("fromCurrency", "EUR");

        render(<TestComponent control={result.current.control} />);

        expect(screen.getByText("€")).toBeInTheDocument();
    });

    it("should render without prefix when no currency is selected", () => {
        const { result } = renderHook(() => useForm<CurrencyFormData>());

        render(<TestComponent control={result.current.control} />);

        expect(screen.queryByText("$")).not.toBeInTheDocument();
        expect(screen.queryByText("€")).not.toBeInTheDocument();
    });

    it("should render with suffix when provided", () => {
        const { result } = renderHook(() => useForm<CurrencyFormData>());
        const suffix = <span>Test Suffix</span>;

        render(<TestComponent control={result.current.control} suffix={suffix} />);

        expect(screen.getByText("Test Suffix")).toBeInTheDocument();
    });

    it("should have correct CSS classes", () => {
        const { result } = renderHook(() => useForm<CurrencyFormData>());
        render(<TestComponent control={result.current.control} />);

        const input = screen.getByRole("textbox");
        expect(input).toHaveClass("w-full");
    });

    it("should match snapshot", () => {
        const { result } = renderHook(() => useForm<CurrencyFormData>());
        const { container } = render(<TestComponent control={result.current.control} />);

        expect(container.firstChild).toMatchSnapshot();
    });
});
