import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        tanstackStart({ customViteReactPlugin: true, target: "vercel" }),
        react(),
        tailwindcss(),
        tsConfigPaths(),
    ],
});
