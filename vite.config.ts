import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  build: {
    lib: {
      entry: "src/lib.ts",
      fileName: "lib",
      name: "ReactCropOptimizer",
    },
    outDir: "lib",
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
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    dts({
      insertTypesEntry: true,
    }),
    cssInjectedByJsPlugin(),
  ],
});
