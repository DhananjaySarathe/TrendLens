import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, "popup/index.html"),
      output: {
        entryFileNames: "popup/popup.js",
        assetFileNames: "popup/[name][extname]",
        chunkFileNames: "popup/popup.js",
      },
    },
  },
});
