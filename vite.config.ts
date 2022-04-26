import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    rollupOptions: {
      input: [
        path.resolve(__dirname, "src/lib/index.ts"),
        path.resolve(__dirname, "src/lib/constant/StyledCommonCss.ts"),
        path.resolve(__dirname, "src/lib/constant/CssVariables.ts"),
      ],
      preserveModules: true,
      preserveEntrySignatures: "allow-extension",
      external: ["react", "react-dom", "styled-components", "prop-types"],
      output: {
        dir: "dist",
        format: "es",
        preserveModules: true,
        entryFileNames: "[name].js",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled",
        },
      },
    },
  },
});
