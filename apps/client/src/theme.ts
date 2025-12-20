import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        natureDark: {
          50: { value: "#F4F6EE" },
          100: { value: "#E2E9D4" },
          200: { value: "#C5D3AB" },
          300: { value: "#A9BC82" },
          400: { value: "#8CA658" },
          500: { value: "#5C7D39" }, // Your original color
          600: { value: "#4B662E" },
          700: { value: "#3A4F24" },
          800: { value: "#29381A" },
          950: { value: "#141C0D" },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          value: { base: "{colors.blue.fg}", _dark: "{colors.blue.subtle}" },
        },
        brandBg: {
          value:
            "linear-gradient(90deg,rgba(59, 124, 184, 1) 0%, rgba(56, 74, 209, 1) 67%)",
        },
        nature: {
          // dark: { value: "#5C7D39" }, // The top Dark Green
          light: { value: "#C5E0B4" }, // The middle Light Green
          gold: { value: "#D4A017" }, // The bottom Gold
        },
        natureDark: {
          solid: { value: "{colors.natureDark.500}" },
          contrast: { value: "{colors.natureDark.100}" },
          fg: { value: "{colors.natureDark.700}" },
          muted: { value: "{colors.natureDark.100}" },
          subtle: { value: "{colors.natureDark.200}" },
          emphasized: { value: "{colors.natureDark.300}" },
          focusRing: { value: "{colors.natureDark.500}" },
        },
      },
    },
  },
});

export default system;
