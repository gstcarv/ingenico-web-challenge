import { ChevronDown } from "lucide-react";
import { ComponentProps } from "react";
import { cn } from "../../utils";
import { InputBase, InputBaseProps } from "../input-base";

export type SelectProps = Omit<ComponentProps<"select">, "prefix"> & InputBaseProps;

export type SelectOptionProps = ComponentProps<"option">;

export const Select = ({ className, suffix, prefix, ...props }: SelectProps) => (
    <InputBase className={className} prefix={prefix} suffix={suffix}>
        <select
            {...props}
            className={cn("select__input w-full h-full appearance-none bg-transparent", prefix ? "pl-12" : "px-4")}
        />

        <ChevronDown
            className="select__input-icon absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-neutral-500"
            size={20}
        />
    </InputBase>
);

Select.Option = (props: SelectOptionProps) => <option {...props} />;
