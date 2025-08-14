import { render, screen } from "@testing-library/react";
import { InputBase } from "../input-base";

describe("InputBase", () => {
    it("renders with children", () => {
        render(
            <InputBase>
                <input placeholder="Test input" />
            </InputBase>,
        );

        expect(screen.getByPlaceholderText("Test input")).toBeInTheDocument();
    });

    it("renders with prefix", () => {
        render(
            <InputBase prefix="$">
                <input placeholder="Amount" />
            </InputBase>,
        );

        expect(screen.getByText("$")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Amount")).toBeInTheDocument();
    });

    it("renders with suffix", () => {
        render(
            <InputBase suffix="kg">
                <input placeholder="Weight" />
            </InputBase>,
        );

        expect(screen.getByText("kg")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Weight")).toBeInTheDocument();
    });

    it("renders with both prefix and suffix", () => {
        render(
            <InputBase prefix="@" suffix=".com">
                <input placeholder="username" />
            </InputBase>,
        );

        expect(screen.getByText("@")).toBeInTheDocument();
        expect(screen.getByText(".com")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("username")).toBeInTheDocument();
    });

    it("applies custom className", () => {
        const { container } = render(
            <InputBase className="custom-class">
                <input />
            </InputBase>,
        );

        expect(container.firstChild).toHaveClass("custom-class");
    });

    it("passes through additional props", () => {
        render(
            <InputBase data-testid="input-base" aria-label="Test input">
                <input />
            </InputBase>,
        );

        expect(screen.getByTestId("input-base")).toBeInTheDocument();
        expect(screen.getByLabelText("Test input")).toBeInTheDocument();
    });

    it("renders without prefix or suffix", () => {
        render(
            <InputBase>
                <input placeholder="Simple input" />
            </InputBase>,
        );

        expect(screen.getByPlaceholderText("Simple input")).toBeInTheDocument();
    });
});
