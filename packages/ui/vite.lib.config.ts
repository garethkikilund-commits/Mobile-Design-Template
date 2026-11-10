// Library build only. Kept out of vite.config.ts on purpose so Storybook does not pick up library mode.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        // Always emit a single stylesheet called styles.css, whatever the bundler's default name is.
        assetFileNames: (asset) => {
          const name = (asset as { names?: string[]; name?: string }).names?.[0] ?? (asset as { name?: string }).name ?? "";
          return name.endsWith(".css") ? "styles.css" : "assets/[name][extname]";
        },
      },
    },
  },
});
