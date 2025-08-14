import { ComponentProps, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-lg font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    {
        variants: {
            variant: {
                primary:
                    "bg-brand-primary text-white hover:bg-brand-600 focus-visible:ring-brand-primary shadow-[0_4px_12px_rgba(25,182,221,0.3)]",
                secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus-visible:ring-neutral-500",
                outline:
                    "border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 focus-visible:ring-neutral-500",
                ghost: "text-neutral-900 hover:bg-neutral-100 focus-visible:ring-neutral-500",
                destructive: "bg-error-600 text-white hover:bg-error-700 focus-visible:ring-error-500",
            },
            size: {
                sm: "h-8 px-3 text-sm",
                md: "h-10 px-4 text-sm",
                lg: "h-16 px-6 text-base",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    },
);

export type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});

Button.displayName = "Button";
