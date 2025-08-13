import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import { Download, Heart, Plus } from "lucide-react";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["primary", "secondary", "outline", "ghost", "destructive"],
        },
        size: {
            control: "select",
            options: ["sm", "md", "lg"],
        },
        disabled: {
            control: "boolean",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Button",
    },
};

export const Primary: Story = {
    args: {
        variant: "primary",
        children: "Primary Button",
    },
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
        children: "Secondary Button",
    },
};

export const Outline: Story = {
    args: {
        variant: "outline",
        children: "Outline Button",
    },
};

export const Ghost: Story = {
    args: {
        variant: "ghost",
        children: "Ghost Button",
    },
};

export const Destructive: Story = {
    args: {
        variant: "destructive",
        children: "Destructive Button",
    },
};

export const Small: Story = {
    args: {
        size: "sm",
        children: "Small Button",
    },
};

export const Large: Story = {
    args: {
        size: "lg",
        children: "Large Button",
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: "Disabled Button",
    },
};

export const WithIcon: Story = {
    args: {
        children: (
            <>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
            </>
        ),
    },
};

export const IconOnly: Story = {
    args: {
        children: <Heart className="h-4 w-4" />,
        "aria-label": "Like",
    },
};

export const WithIconAfter: Story = {
    args: {
        children: (
            <>
                Download
                <Download className="ml-2 h-4 w-4" />
            </>
        ),
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
        </div>
    ),
};

export const AllSizes: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
        </div>
    ),
};
