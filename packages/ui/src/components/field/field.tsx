import { ComponentProps, ReactNode } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils";

export type FieldProps = ComponentProps<"div"> & {
    children: ReactNode;
};

const fieldVariants = cva("field flex flex-col gap-2");

export const Field = ({ className, children, ...props }: FieldProps) => {
    return (
        <div className={cn(fieldVariants(), className)} {...props}>
            {children}
        </div>
    );
};

// Field.Label component
export type FieldLabelProps = ComponentProps<"label"> & {
    children: ReactNode;
};

const fieldLabelVariants = cva("text-xs text-neutral-500 uppercase tracking-wide font-medium");

Field.Label = ({ className, children, ...props }: FieldLabelProps) => {
    return (
        <label className={cn(fieldLabelVariants(), className)} {...props}>
            {children}
        </label>
    );
};
