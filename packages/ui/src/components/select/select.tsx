import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { SelectOptionProps, SelectProps } from "./select-props";
import { cn } from "../../utils";

const inputContainerVariants = cva(
    "h-16 w-70 bg-white border border-neutral-200 rounded-lg shadow-lg relative text-neutral-500 font-medium",
    {
        variants: {
            variant: {
                default: "",
            },
        },
    }
);

export const Select = ({ className, prefix, ...props }: SelectProps) => (
    <div className={cn(inputContainerVariants({ variant: "default" }), className)}>
        {prefix && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-neutral-500">
                {prefix}
            </div>
        )}

        <select
            {...props}
            className={cn("select__input w-full h-full appearance-none bg-transparent", prefix ? "pl-12" : "px-4")}
        />

        <ChevronDown
            className="select__input-icon absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-neutral-500"
            size={20}
        />
    </div>
);

Select.Option = (props: SelectOptionProps) => <option {...props} />;
