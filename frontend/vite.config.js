import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/API": {
        target: "https://presentationcreator.vitolsrinalds4.workers.dev/",
        changeOrigin: true,
      },
      "/styles": {
        target: "https://presentationcreator.vitolsrinalds4.workers.dev/",
        changeOrigin: true,
      },
      "/generateFile" : {
        target: "https://presentationcreator.vitolsrinalds4.workers.dev/",
        changeOrigin: true,
      }
    },
  },
});
