import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps, useCallback, useMemo, useState, useEffect } from "react";
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

// Currency symbol mapping
const CURRENCY_SYMBOLS: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CAD: "C$",
    AUD: "A$",
    CHF: "CHF",
    CNY: "¥",
    INR: "₹",
    BRL: "R$",
};

export type CurrencyInputProps = Omit<ComponentProps<"input">, "value" | "onChange" | "prefix"> &
    VariantProps<typeof currencyInputVariants> &
    InputBaseProps & {
        value?: number;
        onChange?: (value: number | undefined) => void;
        currency?: string;
        placeholder?: string;
        precision?: number;
        allowNegative?: boolean;
        ref?: React.RefObject<HTMLInputElement>;
    };

export const CurrencyInput = ({
    ref,
    className,
    size,
    value,
    onChange,
    placeholder = "0.00",
    precision = 2,
    allowNegative = false,
    prefix,
    suffix,
    currency,
    ...props
}: CurrencyInputProps) => {
    // Determine the prefix to use
    const inputPrefix = useMemo(() => {
        if (prefix !== undefined) {
            return prefix;
        }
        if (currency) {
            return CURRENCY_SYMBOLS[currency] || currency;
        }
        return CURRENCY_SYMBOLS.USD; // Default to USD symbol
    }, [prefix, currency]);

    // Internal state for the input value
    const [inputValue, setInputValue] = useState<string>("");

    // Update internal state when value prop changes
    useEffect(() => {
        if (value === undefined || value === null) {
            setInputValue("");
        } else {
            // Format the value for display
            const formatted = formatValue(value, precision);
            setInputValue(formatted);
        }
    }, [value, precision]);

    // Format value with commas and decimal places
    const formatValue = (num: number, decimalPlaces: number): string => {
        const rounded = Math.round(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
        const parts = rounded.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        if (decimalPlaces === 0) {
            return parts[0];
        }

        if (parts.length === 1) {
            return parts[0] + "." + "0".repeat(decimalPlaces);
        }

        return parts[0] + "." + parts[1].padEnd(decimalPlaces, "0");
    };

    // Parse input value to number
    const parseValue = (input: string): number | undefined => {
        if (!input || input.trim() === "") {
            return undefined;
        }

        // Remove commas and spaces
        const cleanInput = input.replace(/[, ]/g, "");

        // Check if it's a valid number
        const parsed = parseFloat(cleanInput);
        if (isNaN(parsed)) {
            return undefined;
        }

        return parsed;
    };

    // Validate input string
    const isValidInput = (input: string): boolean => {
        if (!input || input.trim() === "") {
            return true;
        }

        // Allow only numbers, commas, spaces, dots, and optionally minus
        const validChars = allowNegative ? /^[0-9.,\-\s]*$/ : /^[0-9.,\s]*$/;
        if (!validChars.test(input)) {
            return false;
        }

        // Check for multiple decimal points
        const decimalCount = (input.match(/\./g) || []).length;
        if (decimalCount > 1) {
            return false;
        }

        // Check for negative values when not allowed
        if (!allowNegative && input.includes("-")) {
            return false;
        }

        return true;
    };

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;

            // Handle empty input
            if (!newValue || newValue.trim() === "") {
                setInputValue("");
                onChange?.(undefined);
                return;
            }

            // Only call onChange if the input is valid
            if (isValidInput(newValue)) {
                const parsed = parseValue(newValue);
                if (parsed !== undefined) {
                    // Format the value immediately for display
                    const formatted = formatValue(parsed, precision);
                    setInputValue(formatted);
                    onChange?.(parsed);
                } else {
                    setInputValue(newValue);
                }
            } else {
                setInputValue(newValue);
            }
        },
        [onChange, allowNegative, precision],
    );

    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            const currentValue = e.target.value;

            if (!isValidInput(currentValue)) {
                // Clear invalid input
                setInputValue("");
                onChange?.(undefined);
                return;
            }

            const parsed = parseValue(currentValue);
            if (parsed !== undefined) {
                // Format the value on blur
                const formatted = formatValue(parsed, precision);
                setInputValue(formatted);
                onChange?.(parsed);
            }
        },
        [onChange, precision],
    );

    return (
        <InputBase
            className={cn(
                "focus-within:ring-2 focus-within:ring-brand-primary focus-within:border-brand-primary",
                className,
            )}
            prefix={inputPrefix}
            suffix={suffix}
        >
            <input
                ref={ref}
                type="text"
                inputMode="decimal"
                value={inputValue}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                className={cn(currencyInputVariants({ size }), inputPrefix && "pl-12", suffix && "pr-12")}
                {...props}
            />
        </InputBase>
    );
};
