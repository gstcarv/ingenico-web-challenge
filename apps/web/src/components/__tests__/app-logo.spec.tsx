import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppLogo } from "../app-logo";

// Mock the logo import
vi.mock("../assets/logo.svg", () => ({
    default: "/mocked-logo.svg",
}));

describe("AppLogo", () => {
    it("should render the logo image", () => {
        render(<AppLogo />);

        const logoImage = screen.getByAltText("Ingenico's Logo");
        expect(logoImage).toBeInTheDocument();
    });

    it("should have src attribute", () => {
        render(<AppLogo />);

        const logoImage = screen.getByAltText("Ingenico's Logo");
        expect(logoImage).toHaveAttribute("src");
    });

    it("should have correct CSS classes", () => {
        render(<AppLogo />);

        const logoImage = screen.getByAltText("Ingenico's Logo");
        expect(logoImage).toHaveClass("h-[50px]");
    });

    it("should have correct alt text", () => {
        render(<AppLogo />);

        const logoImage = screen.getByAltText("Ingenico's Logo");
        expect(logoImage).toHaveAttribute("alt", "Ingenico's Logo");
    });
});
