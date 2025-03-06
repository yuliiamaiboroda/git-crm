import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: "buffer",
    },
  },
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  server: {
    host: true,
  },
  base: "./",
});
