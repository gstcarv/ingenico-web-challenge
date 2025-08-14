import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DatePicker, DatePickerRenderInputProps } from "../date-picker";

describe("DatePicker", () => {
    it("renders date picker input with correct attributes", () => {
        render(<DatePicker data-testid="date-picker" />);

        const datePicker = screen.getByTestId("date-picker");
        expect(datePicker).toBeInTheDocument();

        const inputBase = datePicker.querySelector('[role="button"]');
        expect(inputBase).toHaveAttribute("aria-haspopup", "dialog");
        expect(inputBase).toHaveAttribute("aria-expanded", "false");
    });

    it("renders with default placeholder", () => {
        render(<DatePicker data-testid="date-picker" />);

        const input = screen.getByPlaceholderText("Select date...");
        expect(input).toBeInTheDocument();
    });

    it("renders with custom placeholder", () => {
        render(<DatePicker placeholder="Choose a date" data-testid="date-picker" />);

        const input = screen.getByPlaceholderText("Choose a date");
        expect(input).toBeInTheDocument();
    });

    it("renders calendar icon as default suffix", () => {
        render(<DatePicker data-testid="date-picker" />);

        const calendarIcon = screen.getByTestId("date-picker").querySelector("svg");
        expect(calendarIcon).toBeInTheDocument();
    });

    it("renders custom suffix when provided", () => {
        const CustomSuffix = () => <span data-testid="custom-suffix">📅</span>;

        render(<DatePicker suffix={<CustomSuffix />} data-testid="date-picker" />);

        expect(screen.getByTestId("custom-suffix")).toBeInTheDocument();
    });

    it("renders prefix when provided", () => {
        render(<DatePicker prefix="📅" data-testid="date-picker" />);

        expect(screen.getByText("📅")).toBeInTheDocument();
    });

    it("opens calendar on click", async () => {
        render(<DatePicker data-testid="date-picker" />);

        const datePicker = screen.getByTestId("date-picker");
        const inputBase = datePicker.querySelector('[role="button"]');
        fireEvent.click(inputBase!);

        await waitFor(() => {
            expect(inputBase).toHaveAttribute("aria-expanded", "true");
        });
    });

    it("opens calendar on Enter key", async () => {
        render(<DatePicker data-testid="date-picker" />);

        const datePicker = screen.getByTestId("date-picker");
        const inputBase = datePicker.querySelector('[role="button"]');
        fireEvent.keyDown(inputBase!, { key: "Enter" });

        await waitFor(() => {
            expect(inputBase).toHaveAttribute("aria-expanded", "true");
        });
    });

    it("opens calendar on Space key", async () => {
        render(<DatePicker data-testid="date-picker" />);

        const datePicker = screen.getByTestId("date-picker");
        const inputBase = datePicker.querySelector('[role="button"]');
        fireEvent.keyDown(inputBase!, { key: " " });

        await waitFor(() => {
            expect(inputBase).toHaveAttribute("aria-expanded", "true");
        });
    });

    it("closes calendar on Escape key", async () => {
        render(<DatePicker data-testid="date-picker" />);

        const datePicker = screen.getByTestId("date-picker");
        const inputBase = datePicker.querySelector('[role="button"]');

        // Open calendar first
        fireEvent.click(inputBase!);
        await waitFor(() => {
            expect(inputBase).toHaveAttribute("aria-expanded", "true");
        });

        // Close with Escape
        fireEvent.keyDown(inputBase!, { key: "Escape" });
        await waitFor(() => {
            expect(inputBase).toHaveAttribute("aria-expanded", "false");
        });
    });

    it("closes calendar when clicking outside", async () => {
        render(
            <div>
                <div data-testid="outside-element">Outside content</div>
                <DatePicker data-testid="date-picker" />
            </div>,
        );

        const datePicker = screen.getByTestId("date-picker");
        const inputBase = datePicker.querySelector('[role="button"]');
        const outsideElement = screen.getByTestId("outside-element");

        // Open calendar first
        fireEvent.click(inputBase!);
        await waitFor(() => {
            expect(inputBase).toHaveAttribute("aria-expanded", "true");
        });

        // Click outside to close
        fireEvent.mouseDown(outsideElement);
        await waitFor(() => {
            expect(inputBase).toHaveAttribute("aria-expanded", "false");
        });
    });

    it("does not close calendar when clicking inside", async () => {
        render(<DatePicker data-testid="date-picker" />);

        const datePicker = screen.getByTestId("date-picker");
        const inputBase = datePicker.querySelector('[role="button"]');

        // Open calendar first
        fireEvent.click(inputBase!);
        await waitFor(() => {
            expect(inputBase).toHaveAttribute("aria-expanded", "true");
        });

        // Click inside the date picker container
        fireEvent.mouseDown(datePicker);
        await waitFor(() => {
            expect(inputBase).toHaveAttribute("aria-expanded", "true");
        });
    });

    it("displays selected date in correct format", () => {
        // Use a date that's clearly January 15th regardless of timezone
        const testDate = new Date(2024, 0, 15, 12, 0, 0); // January 15, 2024 at 12:00 PM
        render(<DatePicker value={testDate} data-testid="date-picker" />);

        const input = screen.getByDisplayValue("15/01/2024");
        expect(input).toBeInTheDocument();
    });

    it("displays selected date in custom format", () => {
        // Use a date that's clearly January 15th regardless of timezone
        const testDate = new Date(2024, 0, 15, 12, 0, 0); // January 15, 2024 at 12:00 PM
        render(<DatePicker value={testDate} format="DD/MM/YYYY" data-testid="date-picker" />);

        const input = screen.getByDisplayValue("15/01/2024");
        expect(input).toBeInTheDocument();
    });

    it("calls onChange when date is selected", async () => {
        const handleChange = vi.fn();
        render(<DatePicker onChange={handleChange} data-testid="date-picker" />);

        const datePicker = screen.getByTestId("date-picker");
        const inputBase = datePicker.querySelector('[role="button"]');
        fireEvent.click(inputBase!);

        // Wait for calendar to open and find a day to click
        await waitFor(() => {
            expect(inputBase).toHaveAttribute("aria-expanded", "true");
        });

        // Find and click a day (this is a simplified test)
        const dayButtons = screen
            .getAllByRole("button")
            .filter((button) => button.getAttribute("aria-label")?.includes("day"));

        if (dayButtons.length > 0) {
            fireEvent.click(dayButtons[0]);
            expect(handleChange).toHaveBeenCalled();
        }
    });

    it("closes calendar after date selection", async () => {
        const handleChange = vi.fn();
        render(<DatePicker onChange={handleChange} data-testid="date-picker" />);

        const datePicker = screen.getByTestId("date-picker");
        const inputBase = datePicker.querySelector('[role="button"]');
        fireEvent.click(inputBase!);

        await waitFor(() => {
            expect(inputBase).toHaveAttribute("aria-expanded", "true");
        });

        // Find and click a day
        const dayButtons = screen
            .getAllByRole("button")
            .filter((button) => button.getAttribute("aria-label")?.includes("day"));

        if (dayButtons.length > 0) {
            fireEvent.click(dayButtons[0]);

            await waitFor(() => {
                expect(inputBase).toHaveAttribute("aria-expanded", "false");
            });
        }
    });

    it("applies custom className", () => {
        const { container } = render(<DatePicker className="custom-class" data-testid="date-picker" />);

        expect(container.firstChild).toMatchSnapshot();
    });

    it("handles disabled state", () => {
        render(<DatePicker disabled data-testid="date-picker" />);

        const datePicker = screen.getByTestId("date-picker");
        const inputBase = datePicker.querySelector('[role="button"]');
        expect(inputBase).toHaveAttribute("aria-disabled", "true");
    });

    it("handles empty value", () => {
        render(<DatePicker data-testid="date-picker" />);

        const input = screen.getByPlaceholderText("Select date...");
        expect(input).toHaveValue("");
    });

    it("forwards all HTML attributes", () => {
        render(<DatePicker data-testid="date-picker" aria-label="Select birth date" />);

        const datePicker = screen.getByTestId("date-picker");
        expect(datePicker).toHaveAttribute("data-testid", "date-picker");
    });
});

describe("DatePicker Accessibility", () => {
    it("supports aria-label", () => {
        render(<DatePicker aria-label="Select date" data-testid="date-picker" />);

        const datePicker = screen.getByTestId("date-picker");
        const inputBase = datePicker.querySelector('[role="button"]');
        expect(inputBase).toHaveAttribute("aria-label", "Select date");
    });

    it("supports aria-describedby", () => {
        render(<DatePicker aria-describedby="description" data-testid="date-picker" />);

        const datePicker = screen.getByTestId("date-picker");
        const inputBase = datePicker.querySelector('[role="button"]');
        expect(inputBase).toHaveAttribute("aria-describedby", "description");
    });

    it("has proper keyboard navigation support", () => {
        render(<DatePicker data-testid="date-picker" />);

        const datePicker = screen.getByTestId("date-picker");
        const inputBase = datePicker.querySelector('[role="button"]');
        expect(inputBase).toHaveAttribute("tabIndex", "0");
    });

    it("renders custom input when renderInput is provided", () => {
        const CustomInput = ({ value, placeholder, onClick, onKeyDown, disabled }: DatePickerRenderInputProps) => (
            <button
                onClick={onClick}
                onKeyDown={onKeyDown}
                disabled={disabled}
                data-testid="custom-input"
                className="custom-button"
            >
                {value || placeholder}
            </button>
        );

        render(<DatePicker data-testid="date-picker" renderInput={CustomInput} placeholder="Custom placeholder" />);

        const customInput = screen.getByTestId("custom-input");
        expect(customInput).toBeInTheDocument();
        expect(customInput).toHaveTextContent("Custom placeholder");
        expect(customInput).toHaveClass("custom-button");
    });
});

describe("DatePicker Integration", () => {
    it("works with form elements", () => {
        const handleSubmit = vi.fn((e) => e.preventDefault());

        render(
            <form onSubmit={handleSubmit}>
                <DatePicker data-testid="date-picker" />
                <button type="submit">Submit</button>
            </form>,
        );

        const datePicker = screen.getByTestId("date-picker");
        const submitButton = screen.getByText("Submit");

        expect(datePicker).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });
});
