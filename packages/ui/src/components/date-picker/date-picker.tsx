import { cva } from "class-variance-authority";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import { ComponentProps, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useClickOutside } from "../../hooks/useClickOutside";
import { cn } from "../../utils";
import { InputBase, InputBaseProps } from "../input-base";

export type DatePickerRenderInputProps = {
    value: string;
    placeholder: string;
    onClick: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    disabled?: boolean;
    "data-testid"?: string;
};

export type DatePickerProps = Omit<ComponentProps<typeof DayPicker>, "mode" | "selected" | "onSelect"> &
    Omit<InputBaseProps, "onClick" | "onKeyDown"> & {
        value?: Date;
        onChange?: (date: Date | undefined) => void;
        placeholder?: string;
        format?: string;
        disabled?: boolean;
        "data-testid"?: string;
        renderInput?: (props: DatePickerRenderInputProps) => React.ReactNode;
    };

const datePickerVariants = cva(
    "absolute top-full left-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 transition-all duration-200 ease-out",
    {
        variants: {
            variant: {
                default: "",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export const DatePicker = ({
    className,
    prefix,
    suffix,
    value,
    onChange,
    placeholder = "Select date...",
    format = "DD/MM/YYYY",
    disabled,
    "data-testid": dataTestId,
    renderInput,
    ...props
}: DatePickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date);
        onChange?.(date);
        setIsOpen(false);
    };

    // Handle click outside to close popover
    useClickOutside(containerRef, () => setIsOpen(false), isOpen);

    const handleInputClick = () => {
        setIsOpen(!isOpen);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
        if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    const displayValue = selectedDate ? dayjs(selectedDate).format(format) : "";

    const inputProps = {
        value: displayValue,
        placeholder,
        onClick: handleInputClick,
        onKeyDown: handleInputKeyDown,
        disabled,
        "data-testid": dataTestId,
    };

    return (
        <div className="relative" data-testid={dataTestId} ref={containerRef}>
            {renderInput ? (
                renderInput(inputProps)
            ) : (
                <InputBase
                    className={className}
                    prefix={prefix}
                    suffix={suffix || <Calendar size={20} className="text-neutral-500" />}
                    onClick={handleInputClick}
                    onKeyDown={handleInputKeyDown}
                    tabIndex={0}
                    role="button"
                    aria-haspopup="dialog"
                    aria-expanded={isOpen}
                    aria-label={props["aria-label"] || "Date picker"}
                    aria-describedby={props["aria-describedby"]}
                    aria-disabled={disabled}
                >
                    <input
                        type="text"
                        value={displayValue}
                        placeholder={placeholder}
                        readOnly
                        className={cn(
                            "w-full h-full bg-transparent focus-visible:ring-2 focus-visible:ring-offset focus-visible:ring-brand-primary rounded-lg outline-none cursor-pointer",
                            prefix ? "pl-12" : "px-4",
                        )}
                    />
                </InputBase>
            )}

            <div
                className={cn(
                    datePickerVariants(),
                    {
                        "opacity-100 scale-100 translate-y-0": isOpen,
                        "opacity-0 scale-95 -translate-y-2 pointer-events-none": !isOpen,
                    },
                    className,
                )}
            >
                <DayPicker
                    mode="single"
                    selected={selectedDate}
                    showOutsideDays
                    className="p-6"
                    {...props}
                    onSelect={(d) => handleDateSelect(d)}
                />
            </div>
        </div>
    );
};
