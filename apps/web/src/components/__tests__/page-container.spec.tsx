import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageContainer } from "../page-container";

// Mock child component
vi.mock("../app-logo", () => ({
    AppLogo: () => <div data-testid="app-logo">App Logo</div>,
}));

describe("PageContainer", () => {
    it("should render the component with correct structure", () => {
        render(<PageContainer>Test Content</PageContainer>);

        const container = screen.getByTestId("app-logo").parentElement;
        expect(container).toBeInTheDocument();
        expect(container).toHaveClass(
            "bg-brand-50",
            "min-w-screen",
            "min-h-screen",
            "flex",
            "items-center",
            "justify-center",
            "flex-col",
            "gap-16",
            "p-4",
        );
    });

    it("should render AppLogo component", () => {
        render(<PageContainer>Test Content</PageContainer>);

        expect(screen.getByTestId("app-logo")).toBeInTheDocument();
        expect(screen.getByText("App Logo")).toBeInTheDocument();
    });

    it("should render children content", () => {
        render(<PageContainer>Test Content</PageContainer>);

        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should render complex children", () => {
        const ComplexChild = () => (
            <div>
                <h1>Title</h1>
                <p>Description</p>
            </div>
        );

        render(
            <PageContainer>
                <ComplexChild />
            </PageContainer>,
        );

        expect(screen.getByText("Title")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
    });

    it("should have correct layout structure", () => {
        const { container } = render(<PageContainer>Test Content</PageContainer>);

        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv.tagName).toBe("DIV");
        expect(mainDiv.children).toHaveLength(2);

        // First child should be AppLogo
        expect(mainDiv.children[0]).toHaveAttribute("data-testid", "app-logo");

        // Second child should contain the children content
        expect(mainDiv.children[1]).toHaveTextContent("Test Content");
    });

    it("should handle empty children", () => {
        render(<PageContainer></PageContainer>);

        const container = screen.getByTestId("app-logo").parentElement;
        expect(container).toBeInTheDocument();
        expect(screen.getByTestId("app-logo")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        const { container } = render(<PageContainer>Test Content</PageContainer>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with empty children", () => {
        const { container } = render(<PageContainer></PageContainer>);
        expect(container.firstChild).toMatchSnapshot();
    });
});
