import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps, Ref, ReactNode } from "react";
import { NumericFormat } from "react-number-format";
import { cn } from "../../utils";
import { InputBase, InputBaseProps } from "../input-base";

const currencyInputVariants = cva(
    "w-full h-full bg-transparent border-none outline-none text-neutral-900 font-medium placeholder:text-neutral-400 focus-visible:ring-0",
    {
        variants: {
            size: {
                sm: "text-sm px-3",
                md: "text-lg px-4",
                lg: "text-2xl px-6",
            },
        },
        defaultVariants: {
            size: "md",
        },
    },
);

export type CurrencyInputProps = Omit<
    ComponentProps<typeof NumericFormat>,
    "value" | "onValueChange" | "thousandSeparator" | "decimalSeparator" | "decimalScale" | "allowNegative" | "prefix"
> &
    VariantProps<typeof currencyInputVariants> &
    Omit<InputBaseProps, "prefix" | "suffix"> & {
        value?: number;
        onChange?: (value: number | undefined) => void;
        currency?: string;
        placeholder?: string;
        ref?: Ref<HTMLInputElement>;
        prefix?: ReactNode;
        suffix?: ReactNode;
    };

export const CurrencyInput = ({ 
    className, 
    size, 
    value, 
    onChange, 
    placeholder = "0.00", 
    prefix, 
    suffix, 
    ref,
    ...props 
}: CurrencyInputProps) => {
    const handleValueChange = (values: { floatValue: number | undefined; value: string }) => {
        onChange?.(values.floatValue);
    };

    return (
        <InputBase className={className} prefix={prefix} suffix={suffix}>
            <NumericFormat
                getInputRef={ref}
                className={cn(currencyInputVariants({ size }), prefix ? "pl-12" : "px-4")}
                value={value}
                onValueChange={handleValueChange}
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                allowNegative={false}
                placeholder={placeholder}
                prefix=""
                data-testid="currency-input"
                {...props}
            />
        </InputBase>
    );
};

CurrencyInput.displayName = "CurrencyInput";
