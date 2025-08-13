import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Select } from "../select";

describe("Select", () => {
    it("renders select element with correct attributes", () => {
        render(
            <Select data-testid="select">
                <Select.Option value="option1">Option 1</Select.Option>
                <Select.Option value="option2">Option 2</Select.Option>
            </Select>
        );

        const selectElement = screen.getByTestId("select");
        expect(selectElement).toBeInTheDocument();
        expect(selectElement.tagName).toBe("SELECT");
    });

    it("renders options correctly", () => {
        render(
            <Select>
                <Select.Option value="option1">Option 1</Select.Option>
                <Select.Option value="option2">Option 2</Select.Option>
                <Select.Option value="option3">Option 3</Select.Option>
            </Select>
        );

        expect(screen.getByText("Option 1")).toBeInTheDocument();
        expect(screen.getByText("Option 2")).toBeInTheDocument();
        expect(screen.getByText("Option 3")).toBeInTheDocument();
    });

    it("applies custom className", () => {
        const { container } = render(
            <Select className="custom-class" data-testid="select">
                <Select.Option value="option1">Option 1</Select.Option>
            </Select>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it("renders prefix when provided", () => {
        render(
            <Select prefix="R$" data-testid="select">
                <Select.Option value="option1">Option 1</Select.Option>
            </Select>
        );

        expect(screen.getByText("R$")).toBeInTheDocument();
    });

    it("renders React node prefix", () => {
        const TestIcon = () => <span data-testid="icon">💰</span>;

        render(
            <Select prefix={<TestIcon />} data-testid="select">
                <Select.Option value="option1">Option 1</Select.Option>
            </Select>
        );

        expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("applies correct padding when prefix is present", () => {
        const { container } = render(
            <Select prefix="R$" data-testid="select">
                <Select.Option value="option1">Option 1</Select.Option>
            </Select>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it("applies default padding when no prefix is present", () => {
        const { container } = render(
            <Select data-testid="select">
                <Select.Option value="option1">Option 1</Select.Option>
            </Select>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it("handles change events", () => {
        const handleChange = vi.fn();

        render(
            <Select onChange={handleChange} data-testid="select">
                <Select.Option value="option1">Option 1</Select.Option>
                <Select.Option value="option2">Option 2</Select.Option>
            </Select>
        );

        const selectElement = screen.getByTestId("select");
        fireEvent.change(selectElement, { target: { value: "option2" } });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("handles disabled state", () => {
        render(
            <Select disabled data-testid="select">
                <Select.Option value="option1">Option 1</Select.Option>
            </Select>
        );

        const selectElement = screen.getByTestId("select");
        expect(selectElement).toBeDisabled();
    });

    it("handles value prop", () => {
        const handleChange = vi.fn();

        render(
            <Select value="option2" onChange={handleChange} data-testid="select">
                <Select.Option value="option1">Option 1</Select.Option>
                <Select.Option value="option2">Option 2</Select.Option>
            </Select>
        );

        const selectElement = screen.getByTestId("select");
        expect(selectElement).toHaveValue("option2");
    });

    it("handles multiple prop", () => {
        render(
            <Select multiple data-testid="select">
                <Select.Option value="option1">Option 1</Select.Option>
                <Select.Option value="option2">Option 2</Select.Option>
            </Select>
        );

        const selectElement = screen.getByTestId("select");
        expect(selectElement).toHaveAttribute("multiple");
    });

    it("renders chevron down icon", () => {
        render(
            <Select data-testid="select">
                <Select.Option value="option1">Option 1</Select.Option>
            </Select>
        );

        const chevronIcon = screen.getByTestId("select").parentElement?.querySelector("svg");
        expect(chevronIcon).toBeInTheDocument();
    });

    it("applies correct base classes to container", () => {
        const { container } = render(
            <Select data-testid="select">
                <Select.Option value="option1">Option 1</Select.Option>
            </Select>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it("applies correct classes to select element", () => {
        const { container } = render(
            <Select data-testid="select">
                <Select.Option value="option1">Option 1</Select.Option>
            </Select>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it("handles empty children", () => {
        render(<Select data-testid="select" />);

        const selectElement = screen.getByTestId("select");
        expect(selectElement).toBeInTheDocument();
        expect(selectElement.children).toHaveLength(0);
    });

    it("forwards all HTML select attributes", () => {
        render(
            <Select data-testid="select" name="currency" id="currency-select" required aria-label="Select currency">
                <Select.Option value="usd">USD</Select.Option>
            </Select>
        );

        const selectElement = screen.getByTestId("select");
        expect(selectElement).toHaveAttribute("name", "currency");
        expect(selectElement).toHaveAttribute("id", "currency-select");
        expect(selectElement).toHaveAttribute("required");
        expect(selectElement).toHaveAttribute("aria-label", "Select currency");
    });
});

describe("Select.Option", () => {
    it("renders option element with correct attributes", () => {
        render(
            <Select data-testid="select">
                <Select.Option value="option1" data-testid="option">
                    Option 1
                </Select.Option>
            </Select>
        );

        const optionElement = screen.getByTestId("option");
        expect(optionElement).toBeInTheDocument();
        expect(optionElement.tagName).toBe("OPTION");
        expect(optionElement).toHaveAttribute("value", "option1");
    });

    it("handles disabled option", () => {
        render(
            <Select data-testid="select">
                <Select.Option value="option1" disabled data-testid="option">
                    Option 1
                </Select.Option>
            </Select>
        );

        const optionElement = screen.getByTestId("option");
        expect(optionElement).toBeDisabled();
    });

    it("forwards all HTML option attributes", () => {
        render(
            <Select data-testid="select">
                <Select.Option value="option1" data-testid="option" aria-label="First option">
                    Option 1
                </Select.Option>
            </Select>
        );

        const optionElement = screen.getByTestId("option");
        expect(optionElement).toHaveAttribute("aria-label", "First option");
    });

    it("handles option with empty value", () => {
        render(
            <Select data-testid="select">
                <Select.Option value="" data-testid="option">
                    Empty Option
                </Select.Option>
            </Select>
        );

        const optionElement = screen.getByTestId("option");
        expect(optionElement).toHaveAttribute("value", "");
        expect(optionElement).toHaveTextContent("Empty Option");
    });
});

describe("Select Accessibility", () => {
    it("supports aria-label", () => {
        render(
            <Select aria-label="Select currency" data-testid="select">
                <Select.Option value="usd">USD</Select.Option>
            </Select>
        );

        const selectElement = screen.getByTestId("select");
        expect(selectElement).toHaveAttribute("aria-label", "Select currency");
    });

    it("supports aria-describedby", () => {
        render(
            <Select aria-describedby="description" data-testid="select">
                <Select.Option value="usd">USD</Select.Option>
            </Select>
        );

        const selectElement = screen.getByTestId("select");
        expect(selectElement).toHaveAttribute("aria-describedby", "description");
    });

    it("supports role attribute", () => {
        render(
            <Select role="combobox" data-testid="select">
                <Select.Option value="usd">USD</Select.Option>
            </Select>
        );

        const selectElement = screen.getByTestId("select");
        expect(selectElement).toHaveAttribute("role", "combobox");
    });
});

describe("Select Integration", () => {
    it("works with form elements", () => {
        const handleSubmit = vi.fn((e) => e.preventDefault());

        render(
            <form onSubmit={handleSubmit}>
                <Select name="currency" data-testid="select">
                    <Select.Option value="usd">USD</Select.Option>
                    <Select.Option value="eur">EUR</Select.Option>
                </Select>
                <button type="submit">Submit</button>
            </form>
        );

        const selectElement = screen.getByTestId("select");
        const submitButton = screen.getByText("Submit");

        fireEvent.change(selectElement, { target: { value: "eur" } });
        fireEvent.click(submitButton);

        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it("handles keyboard navigation", () => {
        const handleChange = vi.fn();

        render(
            <Select onChange={handleChange} data-testid="select">
                <Select.Option value="option1">Option 1</Select.Option>
                <Select.Option value="option2">Option 2</Select.Option>
            </Select>
        );

        const selectElement = screen.getByTestId("select");

        // Focus the select
        selectElement.focus();
        expect(selectElement).toHaveFocus();

        // Simulate keyboard interaction
        fireEvent.keyDown(selectElement, { key: "ArrowDown" });
        fireEvent.change(selectElement, { target: { value: "option2" } });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
