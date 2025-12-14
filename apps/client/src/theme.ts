import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    semanticTokens: {
      colors: {
        brand: {
          value: { base: "{colors.blue.fg}", _dark: "{colors.blue.subtle}" },
        },
        brandBg: {
          value:
            "linear-gradient(90deg,rgba(59, 124, 184, 1) 0%, rgba(56, 74, 209, 1) 67%)",
        },
      },
    },
  },
});

export default system;
