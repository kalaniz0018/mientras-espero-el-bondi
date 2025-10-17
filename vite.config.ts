import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/mientras-espero-el-bondi/",
  server: {
    proxy: {
      "/api": "http://localhost:4000", // 🔁 redirige al backend local
    },
  },
});
