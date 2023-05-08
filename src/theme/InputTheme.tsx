import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const customInput = definePartsStyle({
  field: {
    border: "1px solid",
    borderColor: "gray.200",
    background: "gray.50",
    borderRadius: "md",

    _dark: {
      borderColor: "gray.600",
      background: "gray.800",
    },

    _focus: {
      borderColor: "black",
    },
  },
  addon: {
    border: "1px solid",
    borderColor: "gray.200",
    background: "gray.200",
    borderRadius: "md",
    color: "gray.500",

    _focus: {
      borderColor: "black",
    },
  },
});

export const inputTheme = defineMultiStyleConfig({
  variants: { customInput },
});
