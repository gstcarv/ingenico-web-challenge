import { render, screen, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useForm, Control } from "react-hook-form";
import { CurrencySelect } from "../currency-select";
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

const TestComponent = ({
    label,
    name,
    control,
    className,
    error,
}: {
    label: string;
    name: keyof CurrencyFormData;
    control: Control<CurrencyFormData>;
    className?: string;
    error?: string;
}) => {
    return (
        <TestWrapper>
            <CurrencySelect label={label} name={name} control={control} className={className} error={error} />
        </TestWrapper>
    );
};

describe("CurrencySelect", () => {
    it("should render the component with correct structure", () => {
        const { result } = renderHook(() => useForm<CurrencyFormData>());
        const { container } = render(
            <TestComponent label="From" name="fromCurrency" control={result.current.control} />,
        );

        expect(container.firstChild).toBeInTheDocument();
        expect(screen.getByText("From")).toBeInTheDocument();
    });

    it("should render with correct label", () => {
        const { result } = renderHook(() => useForm<CurrencyFormData>());
        render(<TestComponent label="From" name="fromCurrency" control={result.current.control} />);

        expect(screen.getByText("From")).toBeInTheDocument();
    });

    it("should render with correct name attribute", () => {
        const { result } = renderHook(() => useForm<CurrencyFormData>());
        render(<TestComponent label="From" name="fromCurrency" control={result.current.control} />);

        const label = screen.getByText("From");
        expect(label).toHaveAttribute("for", "fromCurrency");
    });

    it("should render error message when provided", () => {
        const { result } = renderHook(() => useForm<CurrencyFormData>());
        const errorMessage = "This field is required";

        render(
            <TestComponent label="From" name="fromCurrency" control={result.current.control} error={errorMessage} />,
        );

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it("should not render error message when not provided", () => {
        const { result } = renderHook(() => useForm<CurrencyFormData>());

        render(<TestComponent label="From" name="fromCurrency" control={result.current.control} />);

        expect(screen.queryByText("This field is required")).not.toBeInTheDocument();
    });

    it("should render currency options", () => {
        const { result } = renderHook(() => useForm<CurrencyFormData>());
        render(<TestComponent label="From" name="fromCurrency" control={result.current.control} />);

        // Check for the default "Select a currency" option
        expect(screen.getByText("Select a currency")).toBeInTheDocument();
    });

    it("should have correct CSS classes", () => {
        const { result } = renderHook(() => useForm<CurrencyFormData>());
        const customClass = "custom-class";

        render(
            <TestComponent label="From" name="fromCurrency" control={result.current.control} className={customClass} />,
        );

        // The component should have the base classes
        expect(screen.getByText("From").parentElement).toHaveClass("flex-1", "w-full");
    });

    it("should match snapshot", () => {
        const { result } = renderHook(() => useForm<CurrencyFormData>());
        const { container } = render(
            <TestComponent label="From" name="fromCurrency" control={result.current.control} />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
