import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: "jsdom",
        setupFiles: ["./src/test/setup.ts"],
        globals: true,
        coverage: {
            exclude: [
                "storybook-static/**",
                "**/*.stories.*",
                "**/*.story.*",
                ".vercel/**",
                ".tanstack/**",
                ".nitro/**",
            ],
        },
    },
});
