import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { ConvertButton } from "../convert-button";

describe("ConvertButton", () => {
    const mockOnSubmit = vi.fn();
    const mockOnRetry = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render convert button with default state", () => {
        render(<ConvertButton isSubmitting={false} hasError={false} onRetry={mockOnRetry} onSubmit={mockOnSubmit} />);

        const button = screen.getByRole("button", { name: "Convert" });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("type", "submit");
        expect(button).not.toBeDisabled();
    });

    it("should render convert button with loading state", () => {
        render(<ConvertButton isSubmitting={true} hasError={false} onRetry={mockOnRetry} onSubmit={mockOnSubmit} />);

        const button = screen.getByRole("button", { name: "Converting..." });
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    });

    it("should render retry button when there is an error", () => {
        render(<ConvertButton isSubmitting={false} hasError={true} onRetry={mockOnRetry} onSubmit={mockOnSubmit} />);

        const button = screen.getByRole("button", { name: "An error occurred, try again" });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("type", "button");
        expect(button).not.toBeDisabled();
    });

    it("should call onSubmit when convert button is clicked", () => {
        render(<ConvertButton isSubmitting={false} hasError={false} onRetry={mockOnRetry} onSubmit={mockOnSubmit} />);

        const button = screen.getByRole("button", { name: "Convert" });
        fireEvent.click(button);

        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    it("should call onRetry when retry button is clicked", async () => {
        mockOnRetry.mockResolvedValue(undefined);

        render(<ConvertButton isSubmitting={false} hasError={true} onRetry={mockOnRetry} onSubmit={mockOnSubmit} />);

        const button = screen.getByRole("button", { name: "An error occurred, try again" });
        fireEvent.click(button);

        expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });

    it("should show convert button while retrying", async () => {
        let resolveRetry: () => void;
        const retryPromise = new Promise<void>((resolve) => {
            resolveRetry = resolve;
        });
        mockOnRetry.mockReturnValue(retryPromise);

        render(<ConvertButton isSubmitting={false} hasError={true} onRetry={mockOnRetry} onSubmit={mockOnSubmit} />);

        const retryButton = screen.getByRole("button", { name: "An error occurred, try again" });
        fireEvent.click(retryButton);

        // Should show convert button while retrying
        await waitFor(() => {
            expect(screen.getByRole("button", { name: "Convert" })).toBeInTheDocument();
        });

        // Resolve the retry promise
        resolveRetry!();
        await waitFor(() => {
            expect(screen.getByRole("button", { name: "An error occurred, try again" })).toBeInTheDocument();
        });
    });

    it("should have correct CSS classes for convert button", () => {
        render(<ConvertButton isSubmitting={false} hasError={false} onRetry={mockOnRetry} onSubmit={mockOnSubmit} />);

        const button = screen.getByRole("button", { name: "Convert" });
        // Check for base Button component classes
        expect(button).toHaveClass("inline-flex", "items-center", "justify-center");
        // Check for custom classes
        expect(button).toHaveClass("w-full", "bg-blue-600", "hover:bg-blue-700", "text-white");
    });

    it("should have correct CSS classes for retry button", () => {
        render(<ConvertButton isSubmitting={false} hasError={true} onRetry={mockOnRetry} onSubmit={mockOnSubmit} />);

        const button = screen.getByRole("button", { name: "An error occurred, try again" });
        // Check for base Button component classes
        expect(button).toHaveClass("inline-flex", "items-center", "justify-center");
        // Check for destructive variant classes
        expect(button).toHaveClass("bg-error-600", "text-white", "hover:bg-error-700");
        // Check for custom classes
        expect(button).toHaveClass("w-full");
    });

    it("should not show retry button when hasError is false", () => {
        render(<ConvertButton isSubmitting={false} hasError={false} onRetry={mockOnRetry} onSubmit={mockOnSubmit} />);

        expect(screen.queryByText("An error occurred, try again")).not.toBeInTheDocument();
        expect(screen.getByText("Convert")).toBeInTheDocument();
    });

    it("should not show convert button when hasError is true", () => {
        render(<ConvertButton isSubmitting={false} hasError={true} onRetry={mockOnRetry} onSubmit={mockOnSubmit} />);

        expect(screen.queryByText("Convert")).not.toBeInTheDocument();
        expect(screen.getByText("An error occurred, try again")).toBeInTheDocument();
    });
});
