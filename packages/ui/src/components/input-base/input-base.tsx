import { ComponentProps, ReactNode } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils";

export type InputBaseProps = Omit<ComponentProps<"div">, "prefix" | "suffix"> & {
    prefix?: ReactNode;
    suffix?: ReactNode;
};

const inputContainerVariants = cva(
    "input-base h-16 w-70 bg-white border border-neutral-200 rounded-lg shadow-lg relative text-neutral-500 font-medium",
    {
        variants: {
            variant: {
                default: "",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export const InputBase = ({ className, prefix, suffix, children, ...props }: InputBaseProps) => {
    return (
        <div className={cn(inputContainerVariants(), className)} {...props}>
            {prefix && (
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-neutral-500">
                    {prefix}
                </div>
            )}

            {children}

            {suffix && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-neutral-500">
                    {suffix}
                </div>
            )}
        </div>
    );
};
