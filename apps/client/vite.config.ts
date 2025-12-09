import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    include: ["@shared/schemas"],
  },
  resolve: {
    conditions: ["development", "browser", "module", "import", "default"],
  },
  server: {
    fs: {
      strict: false,
    },
  },
});
