import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://indian-cuisine-backend-s11a.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
