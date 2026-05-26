import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          900: { value: "#131922" }, // your primary dark
          800: { value: "#1e2a38" }, // slightly lighter
          700: { value: "#2a3a4d" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
