import { ComponentProps, ReactNode, createContext, useContext, Children, isValidElement } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils";

// Create context for field error state
const FieldErrorContext = createContext<boolean>(false);

// Hook to use field error context
export const useFieldError = () => useContext(FieldErrorContext);

export type FieldProps = ComponentProps<"div"> & {
    children: ReactNode;
};

const fieldVariants = cva("field flex flex-col gap-2");

export const Field = ({ className, children, ...props }: FieldProps) => {
    // Check if Field contains validation errors
    const hasError = Children.toArray(children).some(
        (child) => isValidElement(child) && child.type === Field.Validation,
    );

    return (
        <FieldErrorContext.Provider value={hasError}>
            <div className={cn(fieldVariants(), className)} {...props}>
                {children}
            </div>
        </FieldErrorContext.Provider>
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

// Field.Validation component
export type FieldValidationProps = ComponentProps<"span"> & {
    children: ReactNode;
};

const fieldValidationVariants = cva("text-error-400 text-xs");

Field.Validation = ({ className, children, ...props }: FieldValidationProps) => {
    return (
        <span className={cn(fieldValidationVariants(), className)} {...props}>
            {children}
        </span>
    );
};
