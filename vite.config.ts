import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const defaultProductionUrl = "https://sidheshwarsarangal.github.io/portfoionew";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const productionUrl = new URL(env.VITE_SITE_URL || defaultProductionUrl);
  const productionPath = productionUrl.pathname.replace(/\/$/, "");
  const base = command === "build" ? `${productionPath || ""}/` : "/";

  return {
    base,
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("/node_modules/react/") || id.includes("/node_modules/react-dom/")) return "react-vendor";
            if (id.includes("/node_modules/motion/") || id.includes("/node_modules/motion-dom/") || id.includes("/node_modules/motion-utils/")) return "motion-vendor";
            if (id.includes("/node_modules/lucide-react/")) return "icons-vendor";
          },
        },
      },
    },
  };
});
