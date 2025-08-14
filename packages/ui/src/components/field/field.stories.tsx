import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./field";
import { Select } from "../select";

const meta: Meta<typeof Field> = {
    title: "Components/Field",
    component: Field,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: (
            <>
                <Field.Label>From</Field.Label>
                <Select>
                    <Select.Option value="">Select currency</Select.Option>
                    <Select.Option value="USD">USD</Select.Option>
                    <Select.Option value="EUR">EUR</Select.Option>
                    <Select.Option value="GBP">GBP</Select.Option>
                </Select>
            </>
        ),
    },
};

export const WithCustomLabel: Story = {
    args: {
        children: (
            <>
                <Field.Label className="text-sm text-blue-600">Custom Label</Field.Label>
                <Select>
                    <Select.Option value="">Select currency</Select.Option>
                    <Select.Option value="USD">USD</Select.Option>
                    <Select.Option value="EUR">EUR</Select.Option>
                </Select>
            </>
        ),
    },
};

export const MultipleFields: Story = {
    args: {
        children: (
            <>
                <Field.Label>From</Field.Label>
                <Select>
                    <Select.Option value="">Select currency</Select.Option>
                    <Select.Option value="USD">USD</Select.Option>
                    <Select.Option value="EUR">EUR</Select.Option>
                </Select>
            </>
        ),
    },
    render: () => (
        <div className="space-y-4">
            <Field>
                <Field.Label>From</Field.Label>
                <Select>
                    <Select.Option value="">Select currency</Select.Option>
                    <Select.Option value="USD">USD</Select.Option>
                    <Select.Option value="EUR">EUR</Select.Option>
                </Select>
            </Field>

            <Field>
                <Field.Label>To</Field.Label>
                <Select>
                    <Select.Option value="">Select currency</Select.Option>
                    <Select.Option value="EUR">EUR</Select.Option>
                    <Select.Option value="GBP">GBP</Select.Option>
                </Select>
            </Field>
        </div>
    ),
};
