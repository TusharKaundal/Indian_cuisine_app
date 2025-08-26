import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://indian-cuisine-backend-3367.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
