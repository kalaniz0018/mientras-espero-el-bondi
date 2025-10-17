// frontend/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/mientras-espero-el-bondi/" : "/", // subpath solo en build
  server: {
    proxy: { "/api": "http://localhost:4000" }, // backend local
  },
}));
