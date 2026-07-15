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
  };
});
