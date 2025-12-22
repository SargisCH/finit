import {
  createSystem,
  defaultConfig,
  defineSlotRecipe,
} from "@chakra-ui/react";

const numberInputRecipe = defineSlotRecipe({
  slots: ["input", "control"],
  base: {
    input: {
      borderColor: "gray.300",
      _dark: {
        borderColor: "gray.600",
        _focus: {
          borderColor: "blue.400",
          focusRing: "2px",
          focusRingColor: "blue.400",
        },
      },
    },
    control: {
      _dark: {
        borderColor: "gray.600",
      },
    },
  },
});

const comboboxRecipe = defineSlotRecipe({
  className: "chakra-combobox",
  slots: ["root", "input", "control", "trigger", "content", "item"],
  base: {
    input: {
      borderColor: "gray.300",
      _dark: {
        borderColor: "gray.600",
        _focus: {
          borderColor: "blue.400",
          focusRing: "2px",
          focusRingColor: "blue.400",
        },
      },
    },
    content: {
      bg: "gray.100",
      _dark: {
        bg: "gray.700",
      },
    },
  },
});
const menuRecipe = defineSlotRecipe({
  className: "chakra-menu",
  slots: ["root", "trigger", "content", "item"],
  base: {
    content: {
      bg: "gray.100",
      _dark: {
        bg: "gray.700",
      },
    },
  },
});
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
    recipes: {
      input: {
        base: {
          borderColor: "gray.300",
          _dark: {
            borderColor: "gray.700",
            _focus: {
              borderColor: "blue.400",
              focusRing: "2px",
              focusRingColor: "blue.400",
            },
          },
        },
      },
    },
    slotRecipes: {
      numberInput: numberInputRecipe,
      combobox: comboboxRecipe,
      menu: menuRecipe,
    },
  },
});

export default system;
