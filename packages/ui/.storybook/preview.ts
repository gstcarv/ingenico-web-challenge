import type { Preview } from "@storybook/react-vite";
import "../storybook.css";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            default: "gray",
            values: [
                {
                    name: "gray",
                    value: "#6b7280",
                },
                {
                    name: "white",
                    value: "#ffffff",
                },
                {
                    name: "black",
                    value: "#000000",
                },
            ],
        },
    },
};

export default preview;
