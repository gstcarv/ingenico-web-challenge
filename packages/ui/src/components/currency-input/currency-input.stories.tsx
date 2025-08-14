import type { Meta, StoryObj } from "@storybook/react-vite";
import { CurrencyInput } from "./currency-input";
import { DollarSign } from "lucide-react";

const meta: Meta<typeof CurrencyInput> = {
    title: "Components/CurrencyInput",
    component: CurrencyInput,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        disabled: {
            control: "boolean",
        },
        currency: {
            control: "select",
            options: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "BRL"],
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
        },
        precision: {
            control: "number",
            min: 0,
            max: 4,
        },
        allowNegative: {
            control: "boolean",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: "Insert amount",
        decimalScale: 2,
        allowDecimals: true,
        fixedDecimalLength: 2,
        decimalSeparator: ".",
        groupSeparator: ",",
        suffix: "USD",
        prefix: "$",
    },
};

export const EuroCurrency: Story = {
    args: {
        currency: "EUR",
        placeholder: "0.00",
    },
};

export const BrazilianReal: Story = {
    args: {
        currency: "BRL",
        placeholder: "0.00",
    },
};

export const WithIconPrefix: Story = {
    render: () => <CurrencyInput prefix={<DollarSign size={16} />} value={1234.56} placeholder="0.00" />,
};

export const Disabled: Story = {
    args: {
        disabled: true,
        value: 1234.56,
        placeholder: "0.00",
    },
};

export const WithLabel: Story = {
    render: () => (
        <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium text-neutral-700">
                Amount
            </label>
            <CurrencyInput id="amount" name="amount" value={1234.56} placeholder="0.00" />
        </div>
    ),
};
