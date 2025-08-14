import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field } from "../field";

describe("Field", () => {
    it("renders children correctly", () => {
        render(
            <Field>
                <div data-testid="child">Test content</div>
            </Field>,
        );

        expect(screen.getByTestId("child")).toBeInTheDocument();
        expect(screen.getByTestId("child")).toHaveTextContent("Test content");
    });

    it("applies custom className", () => {
        const { container } = render(
            <Field className="custom-class">
                <div>Test content</div>
            </Field>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it("has correct default classes", () => {
        const { container } = render(
            <Field>
                <div>Test content</div>
            </Field>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it("passes additional props to div element", () => {
        render(
            <Field data-testid="field-container" aria-label="test field">
                <div>Test content</div>
            </Field>,
        );

        expect(screen.getByTestId("field-container")).toBeInTheDocument();
        expect(screen.getByLabelText("test field")).toBeInTheDocument();
    });
});

describe("Field.Label", () => {
    it("renders label text correctly", () => {
        render(<Field.Label>Test Label</Field.Label>);

        expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("applies custom className", () => {
        const { container } = render(<Field.Label className="custom-label-class">Test Label</Field.Label>);

        expect(container.firstChild).toMatchSnapshot();
    });

    it("has correct default classes", () => {
        const { container } = render(<Field.Label>Test Label</Field.Label>);

        expect(container.firstChild).toMatchSnapshot();
    });

    it("passes additional props to label element", () => {
        render(
            <Field.Label htmlFor="test-input" data-testid="test-label">
                Test Label
            </Field.Label>,
        );

        const label = screen.getByTestId("test-label");
        expect(label).toBeInTheDocument();
        expect(label).toHaveAttribute("for", "test-input");
    });

    it("renders as a label element", () => {
        const { container } = render(<Field.Label>Test Label</Field.Label>);

        expect(container.firstChild?.nodeName).toBe("LABEL");
    });
});

describe("Field with Field.Label integration", () => {
    it("renders Field with Field.Label correctly", () => {
        render(
            <Field>
                <Field.Label>From</Field.Label>
                <div>Input content</div>
            </Field>,
        );

        expect(screen.getByText("From")).toBeInTheDocument();
        expect(screen.getByText("Input content")).toBeInTheDocument();
    });

    it("maintains proper structure with multiple children", () => {
        const { container } = render(
            <Field>
                <Field.Label>Test Label</Field.Label>
                <div>First child</div>
                <div>Second child</div>
            </Field>,
        );

        const fieldElement = container.firstChild as HTMLElement;
        expect(fieldElement.children).toHaveLength(3);
        expect(fieldElement.children[0]).toHaveTextContent("Test Label");
        expect(fieldElement.children[1]).toHaveTextContent("First child");
        expect(fieldElement.children[2]).toHaveTextContent("Second child");
    });
});
