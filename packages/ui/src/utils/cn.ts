import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";

const twMerge = extendTailwindMerge({
    override: {
        theme: {
            color: [
                // Brand colors
                "brand-50",
                "brand-100",
                "brand-200",
                "brand-300",
                "brand-400",
                "brand-500",
                "brand-600",
                "brand-700",
                "brand-800",
                "brand-900",
                // Neutral colors
                "neutral-0",
                "neutral-50",
                "neutral-100",
                "neutral-200",
                "neutral-300",
                "neutral-400",
                "neutral-500",
                "neutral-600",
                "neutral-700",
                "neutral-800",
                "neutral-900",
                "neutral-950",
                // Error colors
                "error-50",
                "error-100",
                "error-200",
                "error-300",
                "error-400",
                "error-500",
                "error-600",
                "error-700",
                "error-800",
                "error-900",
                // Warning colors
                "warning-50",
                "warning-100",
                "warning-200",
                "warning-300",
                "warning-400",
                "warning-500",
                "warning-600",
                "warning-700",
                "warning-800",
                "warning-900",
                // Success colors
                "success-50",
                "success-100",
                "success-200",
                "success-300",
                "success-400",
                "success-500",
                "success-600",
                "success-700",
                "success-800",
                "success-900",
                // Semantic colors
                "brand-primary",
                "default-font",
                "subtext-color",
                "neutral-border",
                "white",
                "default-background",
            ],
            text: [
                "caption",
                "caption-bold",
                "body",
                "body-bold",
                "heading-3",
                "heading-2",
                "heading-1",
                "monospace-body",
            ],
            shadow: ["sm", "default", "md", "lg", "overlay"],
        },
    },
    extend: {
        theme: {},
    },
});

export function cn(...inputs: Array<ClassValue>) {
    return twMerge(clsx(inputs));
}
