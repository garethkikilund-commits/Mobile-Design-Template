import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    // Keep CSS Module class names readable so tests can assert on them.
    css: { modules: { classNameStrategy: "non-scoped" } },
  },
});
