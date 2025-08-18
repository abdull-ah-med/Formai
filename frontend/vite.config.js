// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
        plugins: [react()],
        resolve: {
                alias: {
                        "@": path.resolve(__dirname, "./src"),
                },
        },
        build: {
                outDir: "dist",
                assetsDir: "assets",
                sourcemap: false,
                minify: "esbuild",
                esbuild: {
                        drop: ["console", "debugger"],
                },
                rollupOptions: {
                        output: {
                                manualChunks: {
                                        vendor: [
                                                "react",
                                                "react-dom",
                                                "react-router-dom",
                                        ],
                                },
                        },
                },
        },
        server: {
                proxy: {
                        "/api": {
                                target: "http://localhost:4000",
                                changeOrigin: true,
                                secure: false,
                        },
                },
        },
});
