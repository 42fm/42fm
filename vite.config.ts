import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, normalizePath } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

const resolvePath = (...s: string[]) => normalizePath(path.resolve(__dirname, ...s));

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/**/*",
          dest: "assets",
        },
        {
          src: "public/manifest.v3.json",
          rename: "manifest.json",
          dest: ".",
        },
      ],
    }),
  ],
  root: ".",
  resolve: {
    alias: {
      "@": resolvePath("src"),
    },
  },
  build: {
    outDir: "build",
    rollupOptions: {
      treeshake: false,
      input: {
        content: resolvePath("src", "pages", "content", "content.tsx"),
        background: resolvePath("src", "pages", "background", "background.ts"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
