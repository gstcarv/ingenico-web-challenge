import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputBase } from "./input-base";

const meta: Meta<typeof InputBase> = {
    title: "Components/InputBase",
    component: InputBase,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        prefix: {
            control: "text",
        },
        suffix: {
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <input className="w-full h-full px-4 bg-transparent outline-none" placeholder="Enter text..." />,
    },
};

export const WithPrefix: Story = {
    args: {
        prefix: "$",
        children: (
            <input className="w-full h-full pl-12 pr-4 bg-transparent outline-none" placeholder="Enter amount..." />
        ),
    },
};

export const WithSuffix: Story = {
    args: {
        suffix: "kg",
        children: (
            <input className="w-full h-full px-4 pr-12 bg-transparent outline-none" placeholder="Enter weight..." />
        ),
    },
};

export const WithPrefixAndSuffix: Story = {
    args: {
        prefix: "@",
        suffix: ".com",
        children: <input className="w-full h-full pl-12 pr-16 bg-transparent outline-none" placeholder="username" />,
    },
};
