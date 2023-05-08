import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const customInput = definePartsStyle({
  field: {
    border: "none",
    background: "#eee",
    borderRadius: "md",
    height: "50px",

    _focus: {
      border: "1px solid",
      borderColor: "black",
    },
  },
  addon: {
    color: "gray.500",
    border: "none",
    background: "#eee",
    borderRadius: "md",

    _focus: {
      border: "1px solid",
      borderColor: "black",
    },
  },
});

export const inputTheme = defineMultiStyleConfig({
  variants: { customInput },
});
