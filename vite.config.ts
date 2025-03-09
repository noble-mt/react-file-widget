import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
    base: "./",
    plugins: [
        react(),
        dts({ rollupTypes: true }),
        cssInjectedByJsPlugin(), // Add the plugin here
    ],
    build: {
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, "src/index.tsx"),
            name: "react_file_widget",
            formats: ["es", "cjs", "umd", "iife"],
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
} satisfies UserConfig);