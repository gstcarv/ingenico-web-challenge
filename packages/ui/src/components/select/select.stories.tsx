import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./select";
import { DollarSign } from "lucide-react";

const meta: Meta<typeof Select> = {
    title: "Components/Select",
    component: Select,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        disabled: {
            control: "boolean",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: [
            <Select.Option key="1" value="option1">
                Option 1
            </Select.Option>,
            <Select.Option key="2" value="option2">
                Option 2
            </Select.Option>,
            <Select.Option key="3" value="option3">
                Option 3
            </Select.Option>,
        ],
    },
};

export const Empty: Story = {
    args: {
        children: [],
    },
};

export const WithPrefix: Story = {
    render: () => (
        <Select prefix={<DollarSign size={16} />}>
            <Select.Option value="usd">USD - US Dollar</Select.Option>
            <Select.Option value="eur">EUR - Euro</Select.Option>
            <Select.Option value="gbp">GBP - British Pound</Select.Option>
        </Select>
    ),
};

export const WithTextPrefix: Story = {
    args: {
        prefix: "R$",
        children: [
            <Select.Option key="1" value="option1">
                Option 1
            </Select.Option>,
            <Select.Option key="2" value="option2">
                Option 2
            </Select.Option>,
            <Select.Option key="3" value="option3">
                Option 3
            </Select.Option>,
        ],
    },
};

export const WithBrazilFlag: Story = {
    args: {
        prefix: "🇧🇷",
        children: [
            <Select.Option key="1" value="br">
                Brasil
            </Select.Option>,
            <Select.Option key="2" value="us">
                Estados Unidos
            </Select.Option>,
            <Select.Option key="3" value="pt">
                Portugal
            </Select.Option>,
        ],
    },
};
