import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../button";

describe("Button", () => {
    it("renders button element with correct attributes", () => {
        render(<Button data-testid="button">Click me</Button>);

        const buttonElement = screen.getByTestId("button");
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement.tagName).toBe("BUTTON");
        expect(buttonElement).toHaveTextContent("Click me");
    });

    it("applies custom className", () => {
        const { container } = render(
            <Button className="custom-class" data-testid="button">
                Button
            </Button>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it("handles click events", () => {
        const handleClick = vi.fn();

        render(
            <Button onClick={handleClick} data-testid="button">
                Click me
            </Button>,
        );

        const buttonElement = screen.getByTestId("button");
        fireEvent.click(buttonElement);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles disabled state", () => {
        const handleClick = vi.fn();

        render(
            <Button disabled onClick={handleClick} data-testid="button">
                Disabled Button
            </Button>,
        );

        const buttonElement = screen.getByTestId("button");
        expect(buttonElement).toBeDisabled();

        fireEvent.click(buttonElement);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it("forwards ref correctly", () => {
        const ref = vi.fn();

        render(
            <Button ref={ref} data-testid="button">
                Button
            </Button>,
        );

        expect(ref).toHaveBeenCalledWith(screen.getByTestId("button"));
    });

    it("forwards all HTML button attributes", () => {
        render(
            <Button data-testid="button" name="submit-button" id="submit-btn" type="submit" aria-label="Submit form">
                Submit
            </Button>,
        );

        const buttonElement = screen.getByTestId("button");
        expect(buttonElement).toHaveAttribute("name", "submit-button");
        expect(buttonElement).toHaveAttribute("id", "submit-btn");
        expect(buttonElement).toHaveAttribute("type", "submit");
        expect(buttonElement).toHaveAttribute("aria-label", "Submit form");
    });
});

describe("Button Variants", () => {
    it("applies primary variant classes", () => {
        const { container } = render(
            <Button variant="primary" data-testid="button">
                Primary Button
            </Button>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it("applies secondary variant classes", () => {
        const { container } = render(
            <Button variant="secondary" data-testid="button">
                Secondary Button
            </Button>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it("applies outline variant classes", () => {
        const { container } = render(
            <Button variant="outline" data-testid="button">
                Outline Button
            </Button>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it("applies ghost variant classes", () => {
        const { container } = render(
            <Button variant="ghost" data-testid="button">
                Ghost Button
            </Button>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it("applies destructive variant classes", () => {
        const { container } = render(
            <Button variant="destructive" data-testid="button">
                Destructive Button
            </Button>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it("uses default variant when not specified", () => {
        const { container } = render(<Button data-testid="button">Default Button</Button>);

        expect(container.firstChild).toMatchSnapshot();
    });
});

describe("Button Sizes", () => {
    it("applies small size classes", () => {
        const { container } = render(
            <Button size="sm" data-testid="button">
                Small Button
            </Button>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it("applies medium size classes", () => {
        const { container } = render(
            <Button size="md" data-testid="button">
                Medium Button
            </Button>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it("applies large size classes", () => {
        const { container } = render(
            <Button size="lg" data-testid="button">
                Large Button
            </Button>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it("uses default size when not specified", () => {
        const { container } = render(<Button data-testid="button">Default Size Button</Button>);

        expect(container.firstChild).toMatchSnapshot();
    });
});

describe("Button with Icons", () => {
    it("renders button with icon before text", () => {
        const TestIcon = () => <span data-testid="icon">🚀</span>;

        render(
            <Button data-testid="button">
                <TestIcon />
                Launch
            </Button>,
        );

        expect(screen.getByTestId("icon")).toBeInTheDocument();
        expect(screen.getByTestId("button")).toHaveTextContent("Launch");
    });

    it("renders button with icon after text", () => {
        const TestIcon = () => <span data-testid="icon">📤</span>;

        render(
            <Button data-testid="button">
                Send
                <TestIcon />
            </Button>,
        );

        expect(screen.getByTestId("icon")).toBeInTheDocument();
        expect(screen.getByTestId("button")).toHaveTextContent("Send");
    });

    it("renders icon-only button", () => {
        const TestIcon = () => <span data-testid="icon">❤️</span>;

        render(
            <Button data-testid="button" aria-label="Like">
                <TestIcon />
            </Button>,
        );

        expect(screen.getByTestId("icon")).toBeInTheDocument();
        expect(screen.getByTestId("button")).toHaveAttribute("aria-label", "Like");
    });
});

describe("Button Accessibility", () => {
    it("supports aria-label", () => {
        render(
            <Button aria-label="Submit form" data-testid="button">
                Submit
            </Button>,
        );

        const buttonElement = screen.getByTestId("button");
        expect(buttonElement).toHaveAttribute("aria-label", "Submit form");
    });

    it("supports aria-describedby", () => {
        render(
            <Button aria-describedby="description" data-testid="button">
                Button
            </Button>,
        );

        const buttonElement = screen.getByTestId("button");
        expect(buttonElement).toHaveAttribute("aria-describedby", "description");
    });

    it("supports role attribute", () => {
        render(
            <Button role="menuitem" data-testid="button">
                Menu Item
            </Button>,
        );

        const buttonElement = screen.getByTestId("button");
        expect(buttonElement).toHaveAttribute("role", "menuitem");
    });

    it("has proper focus styles", () => {
        render(<Button data-testid="button">Focusable Button</Button>);

        const buttonElement = screen.getByTestId("button");
        buttonElement.focus();
        expect(buttonElement).toHaveFocus();
    });
});

describe("Button Integration", () => {
    it("works with form elements", () => {
        const handleSubmit = vi.fn((e) => e.preventDefault());

        render(
            <form onSubmit={handleSubmit}>
                <Button type="submit" data-testid="button">
                    Submit Form
                </Button>
            </form>,
        );

        const buttonElement = screen.getByTestId("button");
        fireEvent.click(buttonElement);

        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it("can be focused and handles click events", () => {
        const handleClick = vi.fn();

        render(
            <Button onClick={handleClick} data-testid="button">
                Focusable Button
            </Button>,
        );

        const buttonElement = screen.getByTestId("button");

        // Focus the button
        buttonElement.focus();
        expect(buttonElement).toHaveFocus();

        // Click the button
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("prevents click when disabled", () => {
        const handleClick = vi.fn();

        render(
            <Button disabled onClick={handleClick} data-testid="button">
                Disabled Button
            </Button>,
        );

        const buttonElement = screen.getByTestId("button");

        // Try clicking
        fireEvent.click(buttonElement);
        expect(handleClick).not.toHaveBeenCalled();

        // Try keyboard interaction
        fireEvent.keyDown(buttonElement, { key: "Enter" });
        expect(handleClick).not.toHaveBeenCalled();
    });
});

describe("Button Edge Cases", () => {
    it("handles empty children", () => {
        render(<Button data-testid="button" />);

        const buttonElement = screen.getByTestId("button");
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent("");
    });

    it("handles null children", () => {
        render(<Button data-testid="button">{null}</Button>);

        const buttonElement = screen.getByTestId("button");
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent("");
    });

    it("handles undefined children", () => {
        render(<Button data-testid="button">{undefined}</Button>);

        const buttonElement = screen.getByTestId("button");
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent("");
    });

    it("handles complex children", () => {
        render(
            <Button data-testid="button">
                <span>Text</span>
                <strong>Bold</strong>
                <em>Italic</em>
            </Button>,
        );

        const buttonElement = screen.getByTestId("button");
        expect(buttonElement).toHaveTextContent("TextBoldItalic");
    });
});
