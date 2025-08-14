import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CurrencyConverter } from "../currency-converter";

// Mock child components
vi.mock("../currency-converter-form", () => ({
    CurrencyConverterForm: () => <div data-testid="currency-converter-form">Currency Converter Form</div>,
}));

vi.mock("../conversion-result", () => ({
    ConversionResult: () => <div data-testid="conversion-result">Conversion Result</div>,
}));

describe("CurrencyConverter", () => {
    it("should render the component with correct structure", () => {
        render(<CurrencyConverter />);

        const container = screen.getByTestId("currency-converter-form").parentElement;
        expect(container).toBeInTheDocument();
        expect(container).toHaveClass(
            "bg-white",
            "w-full",
            "lg:w-[850px]",
            "rounded-lg",
            "p-8",
            "shadow-md",
            "transition-[height]",
        );
    });

    it("should render CurrencyConverterForm component", () => {
        render(<CurrencyConverter />);

        expect(screen.getByTestId("currency-converter-form")).toBeInTheDocument();
        expect(screen.getByText("Currency Converter Form")).toBeInTheDocument();
    });

    it("should render ConversionResult component", () => {
        render(<CurrencyConverter />);

        expect(screen.getByTestId("conversion-result")).toBeInTheDocument();
        expect(screen.getByText("Conversion Result")).toBeInTheDocument();
    });

    it("should have correct layout structure", () => {
        const { container } = render(<CurrencyConverter />);

        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv.tagName).toBe("DIV");
        expect(mainDiv.children).toHaveLength(2);
    });

    it("should match snapshot", () => {
        const { container } = render(<CurrencyConverter />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
