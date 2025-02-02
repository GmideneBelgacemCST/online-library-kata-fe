import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        coverage: {
            provider: "c8",
            reporter: ["text", "json", "html"],
        },
        environment: "jsdom",
    },
});