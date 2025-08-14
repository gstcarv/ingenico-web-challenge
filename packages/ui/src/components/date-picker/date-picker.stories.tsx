import type { Meta, StoryObj } from "@storybook/react-vite";
import { cn } from "../../utils";
import { Button } from "../button";
import { DatePicker } from "./date-picker";

const meta: Meta<typeof DatePicker> = {
    title: "Components/DatePicker",
    component: DatePicker,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        value: {
            control: "date",
        },
        onChange: {
            action: "date changed",
        },
        placeholder: {
            control: "text",
        },
        format: {
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: "Select date...",
    },
};

export const WithValue: Story = {
    args: {
        value: new Date("2024-01-15"),
        placeholder: "Select date...",
    },
};

export const WithPrefix: Story = {
    args: {
        prefix: "📅",
        placeholder: "Select date...",
    },
};

export const CustomFormat: Story = {
    args: {
        format: "DD/MM/YYYY",
        placeholder: "Select date...",
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        placeholder: "Select date...",
    },
};

export const WithCustomRender: Story = {
    args: {
        placeholder: "Select date...",
        renderInput: ({ value, placeholder, onClick, onKeyDown, disabled }) => (
            <Button
                variant="outline"
                onClick={onClick}
                onKeyDown={onKeyDown}
                disabled={disabled}
                className="w-[300px] justify-between"
                role="button"
                aria-haspopup="dialog"
                aria-expanded={false}
                aria-label="Date picker"
            >
                <span className={cn(value ? "text-neutral-900" : "text-neutral-500", "block w-full text-center")}>
                    {value || placeholder}
                </span>
            </Button>
        ),
    },
};
