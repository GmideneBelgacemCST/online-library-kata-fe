import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true, // ✅ Enables `describe`, `it`, `expect`
        coverage: {
            provider: "c8", // ✅ Ensures test coverage works
            reporter: ["text", "json", "html"], // ✅ Generates reports
        },
        environment: "jsdom", // ✅ Simulates browser-like environment for React
    },
});