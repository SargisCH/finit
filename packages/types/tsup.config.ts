import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // Your main entry point(s)
  format: ["esm", "cjs"], // Output formats (ESM and CommonJS)
  dts: true, // Generate declaration files (.d.ts)
  splitting: false, // Disable code splitting for a single bundle
  sourcemap: true, // Generate sourcemaps
  clean: true, // Clean the output directory before building
  // Additional options can be added here
});
