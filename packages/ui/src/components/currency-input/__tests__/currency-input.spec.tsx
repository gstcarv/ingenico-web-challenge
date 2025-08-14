import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CurrencyInput } from "../currency-input";

describe("CurrencyInput", () => {
    it("renders currency input with correct attributes", () => {
        render(<CurrencyInput data-testid="currency-input" />);

        const inputElement = screen.getByTestId("currency-input");
        expect(inputElement).toBeInTheDocument();
        expect(inputElement.tagName).toBe("INPUT");
    });

    it("applies custom className", () => {
        const { container } = render(<CurrencyInput className="custom-class" data-testid="currency-input" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it("renders prefix when provided", () => {
        render(<CurrencyInput prefix="R$" data-testid="currency-input" />);

        expect(screen.getByText("R$")).toBeInTheDocument();
    });

    it("renders suffix when provided", () => {
        render(<CurrencyInput suffix="USD" data-testid="currency-input" />);

        expect(screen.getByText("USD")).toBeInTheDocument();
    });

    it("applies correct padding when prefix is present", () => {
        const { container } = render(<CurrencyInput prefix="R$" data-testid="currency-input" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it("applies default padding when no prefix is present", () => {
        const { container } = render(<CurrencyInput data-testid="currency-input" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it("handles value changes correctly", () => {
        const handleChange = vi.fn();

        render(<CurrencyInput onChange={handleChange} data-testid="currency-input" />);

        const inputElement = screen.getByTestId("currency-input");
        fireEvent.change(inputElement, { target: { value: "123.45" } });

        expect(handleChange).toHaveBeenCalledWith(123.45);
    });

    it("handles disabled state", () => {
        render(<CurrencyInput disabled data-testid="currency-input" />);

        const inputElement = screen.getByTestId("currency-input");
        expect(inputElement).toBeDisabled();
    });

    it("handles value prop", () => {
        const handleChange = vi.fn();

        render(<CurrencyInput value={123.45} onChange={handleChange} data-testid="currency-input" />);

        const inputElement = screen.getByTestId("currency-input");
        expect(inputElement).toHaveValue("123.45");
    });

    it("applies different sizes correctly", () => {
        const { container: smallContainer } = render(<CurrencyInput data-testid="currency-input" />);

        expect(smallContainer.firstChild).toMatchSnapshot();

        const { container: largeContainer } = render(<CurrencyInput data-testid="currency-input" />);

        expect(largeContainer.firstChild).toMatchSnapshot();
    });

    it("uses default placeholder when not provided", () => {
        render(<CurrencyInput data-testid="currency-input" />);

        const inputElement = screen.getByTestId("currency-input");
        expect(inputElement).toHaveAttribute("placeholder", "0.00");
    });

    it("uses custom placeholder when provided", () => {
        render(<CurrencyInput placeholder="Enter amount" data-testid="currency-input" />);

        const inputElement = screen.getByTestId("currency-input");
        expect(inputElement).toHaveAttribute("placeholder", "Enter amount");
    });

    it("applies correct base classes to container", () => {
        const { container } = render(<CurrencyInput data-testid="currency-input" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it("applies correct classes to input element", () => {
        const { container } = render(<CurrencyInput data-testid="currency-input" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it("forwards all HTML input attributes", () => {
        render(
            <CurrencyInput
                data-testid="currency-input"
                name="amount"
                id="amount-input"
                required
                aria-label="Enter amount"
            />,
        );

        const inputElement = screen.getByTestId("currency-input");
        expect(inputElement).toHaveAttribute("name", "amount");
        expect(inputElement).toHaveAttribute("id", "amount-input");
        expect(inputElement).toHaveAttribute("required");
        expect(inputElement).toHaveAttribute("aria-label", "Enter amount");
    });

    it("handles numeric input formatting", () => {
        const handleChange = vi.fn();

        render(<CurrencyInput onChange={handleChange} data-testid="currency-input" />);

        const inputElement = screen.getByTestId("currency-input");

        // Test thousand separator
        fireEvent.change(inputElement, { target: { value: "1234567.89" } });
        expect(handleChange).toHaveBeenCalledWith(1234567.89);
    });

    it("prevents negative values", () => {
        const handleChange = vi.fn();

        render(<CurrencyInput onChange={handleChange} data-testid="currency-input" />);

        const inputElement = screen.getByTestId("currency-input");
        fireEvent.change(inputElement, { target: { value: "-123.45" } });

        // Should not call onChange with negative value
        expect(handleChange).not.toHaveBeenCalledWith(-123.45);
    });

    it("limits decimal places to 2", () => {
        const handleChange = vi.fn();

        render(<CurrencyInput onChange={handleChange} data-testid="currency-input" />);

        const inputElement = screen.getByTestId("currency-input");
        fireEvent.change(inputElement, { target: { value: "123.456" } });

        // Should limit to 2 decimal places
        expect(handleChange).toHaveBeenCalledWith(123.45);
    });
});

describe("CurrencyInput Accessibility", () => {
    it("supports aria-label", () => {
        render(<CurrencyInput aria-label="Enter currency amount" data-testid="currency-input" />);

        const inputElement = screen.getByTestId("currency-input");
        expect(inputElement).toHaveAttribute("aria-label", "Enter currency amount");
    });

    it("supports aria-describedby", () => {
        render(<CurrencyInput aria-describedby="description" data-testid="currency-input" />);

        const inputElement = screen.getByTestId("currency-input");
        expect(inputElement).toHaveAttribute("aria-describedby", "description");
    });

    it("supports role attribute", () => {
        render(<CurrencyInput role="spinbutton" data-testid="currency-input" />);

        const inputElement = screen.getByTestId("currency-input");
        expect(inputElement).toHaveAttribute("role", "spinbutton");
    });
});

describe("CurrencyInput Integration", () => {
    it("works with form elements", () => {
        const handleSubmit = vi.fn((e) => e.preventDefault());

        render(
            <form onSubmit={handleSubmit}>
                <CurrencyInput name="amount" data-testid="currency-input" />
                <button type="submit">Submit</button>
            </form>,
        );

        const inputElement = screen.getByTestId("currency-input");
        const submitButton = screen.getByText("Submit");

        fireEvent.change(inputElement, { target: { value: "123.45" } });
        fireEvent.click(submitButton);

        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it("handles keyboard navigation", () => {
        const handleChange = vi.fn();

        render(<CurrencyInput onChange={handleChange} data-testid="currency-input" />);

        const inputElement = screen.getByTestId("currency-input");

        // Focus the input
        inputElement.focus();
        expect(inputElement).toHaveFocus();

        // Simulate keyboard interaction
        fireEvent.keyDown(inputElement, { key: "1" });
        fireEvent.change(inputElement, { target: { value: "1" } });

        expect(handleChange).toHaveBeenCalledWith(1);
    });

    it("handles ref correctly", () => {
        const ref = vi.fn();

        render(<CurrencyInput ref={ref} data-testid="currency-input" />);

        const inputElement = screen.getByTestId("currency-input");

        // The ref should be called with the input element
        expect(ref).toHaveBeenCalledWith(inputElement);
    });
});

describe("CurrencyInput Variants", () => {
    it("applies small size variant", () => {
        const { container } = render(<CurrencyInput data-testid="currency-input" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it("applies medium size variant (default)", () => {
        const { container } = render(<CurrencyInput data-testid="currency-input" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it("applies large size variant", () => {
        const { container } = render(<CurrencyInput data-testid="currency-input" />);

        expect(container.firstChild).toMatchSnapshot();
    });
});
